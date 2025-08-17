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
 * Get all aid records
 * GET /api/aid_records
 */
router.get('/', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { page = 1, limit = 10, status, aid_type, beneficiary_id, search } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  let query = supabaseAdmin
    .from('aid_records')
    .select(`
      *,
      beneficiaries:beneficiary_id (
        id,
        full_name,
        identity_number,
        phone,
        email
      ),
      applications:application_id (
        id,
        application_number,
        status
      ),
      payments (
        id,
        amount,
        status,
        payment_date
      )
    `);

  // Apply filters
  if (status) {
    query = query.eq('status', status);
  }

  if (aid_type) {
    query = query.eq('aid_type', aid_type);
  }

  if (beneficiary_id) {
    query = query.eq('beneficiary_id', beneficiary_id);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }

  // Apply pagination
  query = query.range(offset, offset + Number(limit) - 1).order('created_at', { ascending: false });

  const { data: aidRecords, error, count } = await query;

  if (error) {
    console.error('Aid records fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch aid records' });
    return;
  }

  res.json({
    aid_records: aidRecords,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: count || 0,
      totalPages: Math.ceil((count || 0) / Number(limit))
    }
  });
}));

/**
 * Get single aid record by ID
 * GET /api/aid_records/:id
 */
router.get('/:id', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { data: aidRecord, error } = await supabaseAdmin
    .from('aid_records')
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
      applications:application_id (
        id,
        application_number,
        status,
        application_type
      ),
      payments (
        id,
        amount,
        currency,
        payment_method,
        status,
        payment_date,
        reference_number
      ),
      in_kind_aids (
        id,
        item_name,
        item_category,
        quantity,
        unit,
        estimated_value
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Aid record fetch error:', error);
    if (error.code === 'PGRST116') {
      res.status(404).json({ error: 'Aid record not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch aid record' });
    }
    return;
  }

  res.json({ aid_record: aidRecord });
}));

/**
 * Create new aid record
 * POST /api/aid_records
 */
router.post('/', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    application_id,
    beneficiary_id,
    aid_type,
    title,
    description,
    amount,
    currency = 'TRY',
    aid_date,
    status = 'planned',
    delivery_method,
    delivery_address,
    delivery_date,
    notes
  } = req.body;

  // Validate required fields
  if (!beneficiary_id || !aid_type || !title) {
    res.status(400).json({ error: 'Beneficiary ID, aid type, and title are required' });
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

  // If application_id is provided, check if it exists
  if (application_id) {
    const { data: application, error: applicationError } = await supabaseAdmin
      .from('applications')
      .select('id, status')
      .eq('id', application_id)
      .single();

    if (applicationError || !application) {
      res.status(404).json({ error: 'Application not found' });
      return;
    }
  }

  const aidRecordData = {
    application_id: application_id || null,
    beneficiary_id,
    aid_type,
    title,
    description: description || null,
    amount: amount || null,
    currency,
    aid_date: aid_date || new Date().toISOString().split('T')[0],
    status,
    delivery_method: delivery_method || null,
    delivery_address: delivery_address || null,
    delivery_date: delivery_date || null,
    notes: notes || null,
    created_by: req.user?.id || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const { data: aidRecord, error } = await supabaseAdmin
    .from('aid_records')
    .insert(aidRecordData)
    .select(`
      *,
      beneficiaries:beneficiary_id (
        id,
        full_name,
        identity_number,
        phone,
        email
      ),
      applications:application_id (
        id,
        application_number,
        status
      )
    `)
    .single();

  if (error) {
    console.error('Aid record creation error:', error);
    res.status(500).json({ error: 'Failed to create aid record' });
    return;
  }

  res.status(201).json({ aid_record: aidRecord });
}));

/**
 * Update aid record
 * PUT /api/aid_records/:id
 */
router.put('/:id', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const {
    aid_type,
    title,
    description,
    amount,
    currency,
    aid_date,
    status,
    delivery_method,
    delivery_address,
    delivery_date,
    delivered_by,
    notes
  } = req.body;

  // Check if aid record exists
  const { data: existingRecord, error: fetchError } = await supabaseAdmin
    .from('aid_records')
    .select('id, status, created_by')
    .eq('id', id)
    .single();

  if (fetchError || !existingRecord) {
    res.status(404).json({ error: 'Aid record not found' });
    return;
  }

  // Check permissions (only creator or admin can update)
  if (existingRecord.created_by !== req.user?.id && !['admin', 'super_admin'].includes(req.user?.role || '')) {
    res.status(403).json({ error: 'Permission denied' });
    return;
  }

  const updateData: any = {
    updated_at: new Date().toISOString()
  };

  if (aid_type !== undefined) updateData.aid_type = aid_type;
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (amount !== undefined) updateData.amount = amount;
  if (currency !== undefined) updateData.currency = currency;
  if (aid_date !== undefined) updateData.aid_date = aid_date;
  if (status !== undefined) updateData.status = status;
  if (delivery_method !== undefined) updateData.delivery_method = delivery_method;
  if (delivery_address !== undefined) updateData.delivery_address = delivery_address;
  if (delivery_date !== undefined) updateData.delivery_date = delivery_date;
  if (delivered_by !== undefined) updateData.delivered_by = delivered_by;
  if (notes !== undefined) updateData.notes = notes;

  const { data: aidRecord, error } = await supabaseAdmin
    .from('aid_records')
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
      ),
      applications:application_id (
        id,
        application_number,
        status
      )
    `)
    .single();

  if (error) {
    console.error('Aid record update error:', error);
    res.status(500).json({ error: 'Failed to update aid record' });
    return;
  }

  res.json({ aid_record: aidRecord });
}));

/**
 * Delete aid record
 * DELETE /api/aid_records/:id
 */
router.delete('/:id', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Check if aid record exists
  const { data: existingRecord, error: fetchError } = await supabaseAdmin
    .from('aid_records')
    .select('id, status, created_by')
    .eq('id', id)
    .single();

  if (fetchError || !existingRecord) {
    res.status(404).json({ error: 'Aid record not found' });
    return;
  }

  // Check permissions (only creator or admin can delete)
  if (existingRecord.created_by !== req.user?.id && !['admin', 'super_admin'].includes(req.user?.role || '')) {
    res.status(403).json({ error: 'Permission denied' });
    return;
  }

  // Don't allow deletion of completed aid records
  if (existingRecord.status === 'completed') {
    res.status(400).json({ error: 'Cannot delete completed aid records' });
    return;
  }

  const { error } = await supabaseAdmin
    .from('aid_records')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Aid record deletion error:', error);
    res.status(500).json({ error: 'Failed to delete aid record' });
    return;
  }

  res.json({ message: 'Aid record deleted successfully' });
}));

/**
 * Get aid record statistics
 * GET /api/aid_records/stats/overview
 */
router.get('/stats/overview', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { data: stats, error } = await supabaseAdmin
    .rpc('get_aid_record_stats');

  if (error) {
    console.error('Aid record stats error:', error);
    // Fallback to manual calculation if RPC function doesn't exist
    const { data: aidRecords, error: fallbackError } = await supabaseAdmin
      .from('aid_records')
      .select('status, aid_type, amount, created_at');

    if (fallbackError) {
      res.status(500).json({ error: 'Failed to fetch aid record statistics' });
      return;
    }

    const fallbackStats = {
      total: aidRecords.length,
      planned: aidRecords.filter(record => record.status === 'planned').length,
      in_progress: aidRecords.filter(record => record.status === 'in_progress').length,
      completed: aidRecords.filter(record => record.status === 'completed').length,
      cancelled: aidRecords.filter(record => record.status === 'cancelled').length,
      total_amount: aidRecords.reduce((sum, record) => sum + (record.amount || 0), 0),
      by_type: {
        financial: aidRecords.filter(record => record.aid_type === 'financial').length,
        in_kind: aidRecords.filter(record => record.aid_type === 'in_kind').length,
        medical: aidRecords.filter(record => record.aid_type === 'medical').length,
        educational: aidRecords.filter(record => record.aid_type === 'educational').length,
        emergency: aidRecords.filter(record => record.aid_type === 'emergency').length,
        other: aidRecords.filter(record => record.aid_type === 'other').length
      },
      this_month: aidRecords.filter(record => {
        const recordDate = new Date(record.created_at);
        const now = new Date();
        return recordDate.getMonth() === now.getMonth() && recordDate.getFullYear() === now.getFullYear();
      }).length
    };

    res.json({ stats: fallbackStats });
    return;
  }

  res.json({ stats });
}));

/**
 * Get aid records by beneficiary
 * GET /api/aid_records/beneficiary/:beneficiary_id
 */
router.get('/beneficiary/:beneficiary_id', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { beneficiary_id } = req.params;
  const { status, aid_type } = req.query;

  let query = supabaseAdmin
    .from('aid_records')
    .select(`
      *,
      applications:application_id (
        id,
        application_number,
        status
      ),
      payments (
        id,
        amount,
        status,
        payment_date
      )
    `)
    .eq('beneficiary_id', beneficiary_id);

  if (status) {
    query = query.eq('status', status);
  }

  if (aid_type) {
    query = query.eq('aid_type', aid_type);
  }

  query = query.order('created_at', { ascending: false });

  const { data: aidRecords, error } = await query;

  if (error) {
    console.error('Aid records fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch aid records' });
    return;
  }

  res.json({ aid_records: aidRecords });
}));

export default router;