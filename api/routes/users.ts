import { Router, type Request, type Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { validate, schemas } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate, authorize } from '../middleware/auth';

dotenv.config();

// Using AuthenticatedRequest from centralized auth middleware

const router = Router();

// Initialize Supabase client
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Using centralized authentication middleware from auth.ts

/**
 * GET /api/users
 * Get all users with pagination and filtering
 */
router.get('/', authenticate, asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  // Check if user has permission to view users
  if (!['super_admin', 'admin', 'manager'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;
  const role = req.query.role as string;
  const status = req.query.status as string;
  const offset = (page - 1) * limit;

  let query = supabaseAdmin
    .from('user_profiles')
    .select('*', { count: 'exact' });

  // Apply filters
  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,display_name.ilike.%${search}%`);
  }

  if (role) {
    query = query.eq('role', role);
  }

  if (status === 'active') {
    query = query.eq('is_active', true);
  } else if (status === 'inactive') {
    query = query.eq('is_active', false);
  }

  // Apply pagination
  query = query.range(offset, offset + limit - 1).order('created_at', { ascending: false });

  const { data: users, error, count } = await query;

  if (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }

  res.json({
    users,
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit)
    }
  });
}));

/**
 * GET /api/users/:id
 * Get a single user by ID
 */
router.get('/:id', authenticate, asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const { id } = req.params;

  // Users can view their own profile, admins can view any profile
  if (req.user.id !== id && !['super_admin', 'admin', 'manager'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  const { data: user, error } = await supabaseAdmin
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ user });
}));

/**
 * POST /api/users
 * Create a new user (admin only)
 */
router.post('/', authenticate, asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  // Only super_admin and admin can create users
  if (!['super_admin', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  const {
    email,
    password,
    full_name,
    display_name,
    phone,
    role = 'user',
    department,
    position
  } = req.body;

  if (!email || !password || !full_name) {
    return res.status(400).json({ error: 'Email, password, and full name are required' });
  }

  try {
    // Create user in Supabase Auth
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (authError || !authUser.user) {
      console.error('Error creating auth user:', authError);
      return res.status(400).json({ error: authError?.message || 'Failed to create user' });
    }

    // Create user profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .insert({
        id: authUser.user.id,
        email,
        full_name,
        display_name,
        phone,
        role,
        department,
        position,
        is_active: true
      })
      .select()
      .single();

    if (profileError) {
      console.error('Error creating user profile:', profileError);
      // Clean up auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
      return res.status(500).json({ error: 'Failed to create user profile' });
    }

    res.status(201).json({ user: profile });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}));

/**
 * PUT /api/users/:id
 * Update a user
 */
router.put('/:id', authenticate, asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const { id } = req.params;
  const {
    full_name,
    display_name,
    phone,
    role,
    department,
    position,
    is_active
  } = req.body;

  // Users can update their own profile (limited fields), admins can update any profile
  const isOwnProfile = req.user.id === id;
  const isAdmin = ['super_admin', 'admin'].includes(req.user.role);

  if (!isOwnProfile && !isAdmin) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  // Prepare update data
  const updateData: any = {};

  if (full_name !== undefined) updateData.full_name = full_name;
  if (display_name !== undefined) updateData.display_name = display_name;
  if (phone !== undefined) updateData.phone = phone;
  if (department !== undefined) updateData.department = department;
  if (position !== undefined) updateData.position = position;

  // Only admins can update role and status
  if (isAdmin) {
    if (role !== undefined) updateData.role = role;
    if (is_active !== undefined) updateData.is_active = is_active;
  }

  updateData.updated_at = new Date().toISOString();

  const { data: user, error } = await supabaseAdmin
    .from('user_profiles')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Failed to update user' });
  }

  res.json({ user });
}));

/**
 * DELETE /api/users/:id
 * Delete a user (admin only)
 */
router.delete('/:id', authenticate, asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  // Only super_admin can delete users
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  const { id } = req.params;

  // Prevent self-deletion
  if (req.user.id === id) {
    return res.status(400).json({ error: 'Cannot delete your own account' });
  }

  try {
    // Delete user from auth (this will cascade to user_profiles)
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (authError) {
      console.error('Error deleting auth user:', authError);
      return res.status(500).json({ error: 'Failed to delete user' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}));

/**
 * GET /api/users/stats
 * Get user statistics
 */
router.get('/stats/overview', authenticate, asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  // Check if user has permission to view stats
  if (!['super_admin', 'admin', 'manager'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  try {
    // Get total users count
    const { count: totalUsers } = await supabaseAdmin
      .from('user_profiles')
      .select('*', { count: 'exact', head: true });

    // Get active users count
    const { count: activeUsers } = await supabaseAdmin
      .from('user_profiles')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    // Get users by role
    const { data: roleStats } = await supabaseAdmin
      .from('user_profiles')
      .select('role')
      .eq('is_active', true);

    const roleDistribution = roleStats?.reduce((acc: any, user: any) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {}) || {};

    // Get recent users (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { count: recentUsers } = await supabaseAdmin
      .from('user_profiles')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString());

    res.json({
      totalUsers: totalUsers || 0,
      activeUsers: activeUsers || 0,
      inactiveUsers: (totalUsers || 0) - (activeUsers || 0),
      recentUsers: recentUsers || 0,
      roleDistribution
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch user statistics' });
  }
}));

/**
 * POST /api/users/:id/reset-password
 * Reset user password (admin only)
 */
router.post('/:id/reset-password', authenticate, asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  // Only super_admin and admin can reset passwords
  if (!['super_admin', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  const { id } = req.params;
  const { password } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(id, {
      password
    });

    if (error) {
      console.error('Error resetting password:', error);
      return res.status(500).json({ error: 'Failed to reset password' });
    }

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
}));

/**
 * POST /api/users/:id/toggle-status
 * Toggle user active status
 */
router.post('/:id/toggle-status', authenticate, asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  // Only super_admin and admin can toggle status
  if (!['super_admin', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  const { id } = req.params;

  // Prevent self-deactivation
  if (req.user.id === id) {
    return res.status(400).json({ error: 'Cannot change your own status' });
  }

  // Get current user status
  const { data: currentUser, error: fetchError } = await supabaseAdmin
    .from('user_profiles')
    .select('is_active')
    .eq('id', id)
    .single();

  if (fetchError || !currentUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Toggle status
  const newStatus = !currentUser.is_active;

  const { data: user, error } = await supabaseAdmin
    .from('user_profiles')
    .update({ 
      is_active: newStatus,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error toggling user status:', error);
    return res.status(500).json({ error: 'Failed to toggle user status' });
  }

  res.json({ 
    user,
    message: `User ${newStatus ? 'activated' : 'deactivated'} successfully`
  });
}));

export default router;