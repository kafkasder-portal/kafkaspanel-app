import { Router, type Request, type Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { validate, schemas } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate } from '../middleware/auth';

// Using centralized authentication middleware from auth.ts

dotenv.config();

const router = Router();

// Initialize Supabase client with service role key for admin operations
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || 'https://demo.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'demo_service_key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Regular Supabase client for user operations
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://demo.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'demo_key'
);

// Using centralized authentication middleware from auth.ts

/**
 * Get all applications
 * GET /api/applications
 */
router.get('/', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { page = 1, limit = 10, status, beneficiary_id, search } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  let query = supabaseAdmin
    .from('applications')
    .select(`
      *,
      beneficiaries:beneficiary_id (
        id,
        full_name,
        identity_number,
        phone,
        email
      )
    `);

  // Apply filters
  if (status) {
    query = query.eq('status', status);
  }

  if (beneficiary_id) {
    query = query.eq('beneficiary_id', beneficiary_id);
  }

  if (search) {
    query = query.or(`application_number.ilike.%${search}%,notes.ilike.%${search}%`);
  }

  // Apply pagination
  query = query.range(offset, offset + Number(limit) - 1).order('created_at', { ascending: false });

  const { data: applications, error, count } = await query;

  if (error) {
    console.error('Applications fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
    return;
  }

  res.json({
    applications,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: count || 0,
      totalPages: Math.ceil((count || 0) / Number(limit))
    }
  });
}));

/**
 * Get single application by ID
 * GET /api/applications/:id
 */
router.get('/:id', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { data: application, error } = await supabaseAdmin
    .from('applications')
    .select(`
      *,
      beneficiaries:beneficiary_id (
        id,
        full_name,
        identity_number,
        phone,
        email,
        address,
        city,
        district
      ),
      aid_records (
        id,
        aid_type,
        amount,
        status,
        distribution_date,
        created_at
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Application fetch error:', error);
    if (error.code === 'PGRST116') {
      res.status(404).json({ error: 'Application not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch application' });
    }
    return;
  }

  res.json({ application });
}));

/**
 * Create new application
 * POST /api/applications
 */
router.post('/', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    beneficiary_id,
    application_type,
    requested_amount,
    urgency_level,
    description,
    notes,
    documents_url
  } = req.body;

  // Validate required fields
  if (!beneficiary_id || !application_type) {
    res.status(400).json({ error: 'Beneficiary ID and application type are required' });
    return;
  }

  // Check if beneficiary exists
  const { data: beneficiary, error: beneficiaryError } = await supabaseAdmin
    .from('beneficiaries')
    .select('id, full_name')
    .eq('id', beneficiary_id)
    .single();

  if (beneficiaryError || !beneficiary) {
    res.status(404).json({ error: 'Beneficiary not found' });
    return;
  }

  // Generate application number
  const applicationNumber = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

  const applicationData = {
    application_number: applicationNumber,
    beneficiary_id,
    application_type,
    requested_amount: requested_amount || null,
    urgency_level: urgency_level || 'medium',
    status: 'pending',
    description: description || null,
    notes: notes || null,
    documents_url: documents_url || null,
    created_by: req.user?.id || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const { data: application, error } = await supabaseAdmin
    .from('applications')
    .insert(applicationData)
    .select(`
      *,
      beneficiaries:beneficiary_id (
        id,
        full_name,
        identity_number,
        phone,
        email
      )
    `)
    .single();

  if (error) {
    console.error('Application creation error:', error);
    res.status(500).json({ error: 'Failed to create application' });
    return;
  }

  res.status(201).json({ application });
}));

/**
 * Update application
 * PUT /api/applications/:id
 */
router.put('/:id', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const {
    application_type,
    requested_amount,
    urgency_level,
    status,
    description,
    notes,
    documents_url,
    rejection_reason
  } = req.body;

  // Check if application exists
  const { data: existingApplication, error: fetchError } = await supabaseAdmin
    .from('applications')
    .select('id, status, created_by')
    .eq('id', id)
    .single();

  if (fetchError || !existingApplication) {
    res.status(404).json({ error: 'Application not found' });
    return;
  }

  // Check permissions (only creator or admin can update)
  if (existingApplication.created_by !== req.user?.id && !['admin', 'super_admin'].includes(req.user?.role || '')) {
    res.status(403).json({ error: 'Permission denied' });
    return;
  }

  const updateData: any = {
    updated_at: new Date().toISOString()
  };

  if (application_type !== undefined) updateData.application_type = application_type;
  if (requested_amount !== undefined) updateData.requested_amount = requested_amount;
  if (urgency_level !== undefined) updateData.urgency_level = urgency_level;
  if (status !== undefined) updateData.status = status;
  if (description !== undefined) updateData.description = description;
  if (notes !== undefined) updateData.notes = notes;
  if (documents_url !== undefined) updateData.documents_url = documents_url;
  if (rejection_reason !== undefined) updateData.rejection_reason = rejection_reason;

  const { data: application, error } = await supabaseAdmin
    .from('applications')
    .update(updateData)
    .eq('id', id)
    .select(`
      *,
      beneficiaries:beneficiary_id (
        id,
        full_name,
        identity_number,
        phone,
        email
      )
    `)
    .single();

  if (error) {
    console.error('Application update error:', error);
    res.status(500).json({ error: 'Failed to update application' });
    return;
  }

  res.json({ application });
}));

/**
 * Delete application
 * DELETE /api/applications/:id
 */
router.delete('/:id', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Check if application exists
  const { data: existingApplication, error: fetchError } = await supabaseAdmin
    .from('applications')
    .select('id, status, created_by')
    .eq('id', id)
    .single();

  if (fetchError || !existingApplication) {
    res.status(404).json({ error: 'Application not found' });
    return;
  }

  // Check permissions (only creator or admin can delete)
  if (existingApplication.created_by !== req.user?.id && !['admin', 'super_admin'].includes(req.user?.role || '')) {
    res.status(403).json({ error: 'Permission denied' });
    return;
  }

  // Don't allow deletion of approved applications
  if (existingApplication.status === 'approved') {
    res.status(400).json({ error: 'Cannot delete approved applications' });
    return;
  }

  const { error } = await supabaseAdmin
    .from('applications')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Application deletion error:', error);
    res.status(500).json({ error: 'Failed to delete application' });
    return;
  }

  res.json({ message: 'Application deleted successfully' });
}));

/**
 * Get application statistics
 * GET /api/applications/stats
 */
router.get('/stats/overview', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { data: stats, error } = await supabaseAdmin
    .rpc('get_application_stats');

  if (error) {
    console.error('Application stats error:', error);
    // Fallback to manual calculation if RPC function doesn't exist
    const { data: applications, error: fallbackError } = await supabaseAdmin
      .from('applications')
      .select('status, requested_amount, created_at');

    if (fallbackError) {
      res.status(500).json({ error: 'Failed to fetch application statistics' });
      return;
    }

    const fallbackStats = {
      total: applications.length,
      pending: applications.filter(app => app.status === 'pending').length,
      approved: applications.filter(app => app.status === 'approved').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
      total_requested_amount: applications.reduce((sum, app) => sum + (app.requested_amount || 0), 0),
      this_month: applications.filter(app => {
        const appDate = new Date(app.created_at);
        const now = new Date();
        return appDate.getMonth() === now.getMonth() && appDate.getFullYear() === now.getFullYear();
      }).length
    };

    res.json({ stats: fallbackStats });
    return;
  }

  res.json({ stats });
}));

export default router;