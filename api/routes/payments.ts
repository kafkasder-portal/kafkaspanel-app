import { Router, type Request, type Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { validate, schemas } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';

// Using AuthenticatedRequest from centralized auth middleware

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
 * Get all payments
 * GET /api/payments
 */
router.get('/', authenticate, asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { page = 1, limit = 10, status, payment_method, aid_record_id, search } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  let query = supabaseAdmin
    .from('payments')
    .select(`
      *,
      aid_records:aid_record_id (
        id,
        title,
        aid_type,
        amount as aid_amount,
        beneficiaries:beneficiary_id (
          id,
          full_name,
          identity_number,
          phone,
          email
        )
      )
    `);

  // Apply filters
  if (status) {
    query = query.eq('status', status);
  }

  if (payment_method) {
    query = query.eq('payment_method', payment_method);
  }

  if (aid_record_id) {
    query = query.eq('aid_record_id', aid_record_id);
  }

  if (search) {
    query = query.or(`reference_number.ilike.%${search}%,bank_name.ilike.%${search}%,notes.ilike.%${search}%`);
  }

  // Apply pagination
  query = query.range(offset, offset + Number(limit) - 1).order('created_at', { ascending: false });

  const { data: payments, error, count } = await query;

  if (error) {
    console.error('Payments fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch payments' });
    return;
  }

  res.json({
    payments,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: count || 0,
      totalPages: Math.ceil((count || 0) / Number(limit))
    }
  });
}));

/**
 * Get single payment by ID
 * GET /api/payments/:id
 */
router.get('/:id', authenticate, asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const { data: payment, error } = await supabaseAdmin
    .from('payments')
    .select(`
      *,
      aid_records:aid_record_id (
        id,
        title,
        aid_type,
        amount as aid_amount,
        description,
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
          status
        )
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Payment fetch error:', error);
    if (error.code === 'PGRST116') {
      res.status(404).json({ error: 'Payment not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch payment' });
    }
    return;
  }

  res.json({ payment });
}));

/**
 * Create new payment
 * POST /api/payments
 */
router.post('/', authenticate, validate(schemas.createPayment), asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const {
    aid_record_id,
    amount,
    currency = 'TRY',
    payment_method,
    payment_date,
    reference_number,
    bank_name,
    account_number,
    status = 'pending',
    notes
  } = req.body;

  // Validate required fields
  if (!aid_record_id || !amount || !payment_method) {
    res.status(400).json({ error: 'Aid record ID, amount, and payment method are required' });
    return;
  }

  // Check if aid record exists
  const { data: aidRecord, error: aidRecordError } = await supabaseAdmin
    .from('aid_records')
    .select('id, title, amount, status')
    .eq('id', aid_record_id)
    .single();

  if (aidRecordError || !aidRecord) {
    res.status(404).json({ error: 'Aid record not found' });
    return;
  }

  // Validate payment amount doesn't exceed aid record amount
  if (aidRecord.amount && amount > aidRecord.amount) {
    res.status(400).json({ error: 'Payment amount cannot exceed aid record amount' });
    return;
  }

  const paymentData = {
    aid_record_id,
    amount,
    currency,
    payment_method,
    payment_date: payment_date || new Date().toISOString().split('T')[0],
    reference_number: reference_number || null,
    bank_name: bank_name || null,
    account_number: account_number || null,
    status,
    notes: notes || null,
    processed_by: req.user?.id || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const { data: payment, error } = await supabaseAdmin
    .from('payments')
    .insert(paymentData)
    .select(`
      *,
      aid_records:aid_record_id (
        id,
        title,
        aid_type,
        amount as aid_amount,
        beneficiaries:beneficiary_id (
          id,
          full_name,
          identity_number,
          phone,
          email
        )
      )
    `)
    .single();

  if (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ error: 'Failed to create payment' });
    return;
  }

  res.status(201).json({ payment });
}));

/**
 * Update payment
 * PUT /api/payments/:id
 */
router.put('/:id', authenticate, validate(schemas.updatePayment), asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const {
    amount,
    currency,
    payment_method,
    payment_date,
    reference_number,
    bank_name,
    account_number,
    status,
    notes
  } = req.body;

  // Check if payment exists
  const { data: existingPayment, error: fetchError } = await supabaseAdmin
    .from('payments')
    .select('id, status, processed_by, aid_record_id')
    .eq('id', id)
    .single();

  if (fetchError || !existingPayment) {
    res.status(404).json({ error: 'Payment not found' });
    return;
  }

  // Check permissions (only processor or admin can update)
  if (existingPayment.processed_by !== req.user?.id && !['admin', 'super_admin'].includes(req.user?.role || '')) {
    res.status(403).json({ error: 'Permission denied' });
    return;
  }

  // Don't allow updates to completed payments unless admin
  if (existingPayment.status === 'completed' && !['admin', 'super_admin'].includes(req.user?.role || '')) {
    res.status(400).json({ error: 'Cannot update completed payments' });
    return;
  }

  const updateData: any = {
    updated_at: new Date().toISOString()
  };

  if (amount !== undefined) {
    // Validate payment amount doesn't exceed aid record amount
    const { data: aidRecord } = await supabaseAdmin
      .from('aid_records')
      .select('amount')
      .eq('id', existingPayment.aid_record_id)
      .single();
    
    if (aidRecord?.amount && amount > aidRecord.amount) {
      res.status(400).json({ error: 'Payment amount cannot exceed aid record amount' });
      return;
    }
    updateData.amount = amount;
  }
  
  if (currency !== undefined) updateData.currency = currency;
  if (payment_method !== undefined) updateData.payment_method = payment_method;
  if (payment_date !== undefined) updateData.payment_date = payment_date;
  if (reference_number !== undefined) updateData.reference_number = reference_number;
  if (bank_name !== undefined) updateData.bank_name = bank_name;
  if (account_number !== undefined) updateData.account_number = account_number;
  if (status !== undefined) updateData.status = status;
  if (notes !== undefined) updateData.notes = notes;

  const { data: payment, error } = await supabaseAdmin
    .from('payments')
    .update(updateData)
    .eq('id', id)
    .select(`
      *,
      aid_records:aid_record_id (
        id,
        title,
        aid_type,
        amount as aid_amount,
        beneficiaries:beneficiary_id (
          id,
          full_name,
          identity_number,
          phone,
          email
        )
      )
    `)
    .single();

  if (error) {
    console.error('Payment update error:', error);
    res.status(500).json({ error: 'Failed to update payment' });
    return;
  }

  res.json({ payment });
}));

/**
 * Delete payment
 * DELETE /api/payments/:id
 */
router.delete('/:id', authenticate, asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  // Check if payment exists
  const { data: existingPayment, error: fetchError } = await supabaseAdmin
    .from('payments')
    .select('id, status, processed_by, reference_number')
    .eq('id', id)
    .single();

  if (fetchError || !existingPayment) {
    res.status(404).json({ error: 'Payment not found' });
    return;
  }

  // Check permissions (only processor or admin can delete)
  if (existingPayment.processed_by !== req.user?.id && !['admin', 'super_admin'].includes(req.user?.role || '')) {
    res.status(403).json({ error: 'Permission denied' });
    return;
  }

  // Don't allow deletion of completed payments
  if (existingPayment.status === 'completed') {
    res.status(400).json({ error: 'Cannot delete completed payments' });
    return;
  }

  const { error } = await supabaseAdmin
    .from('payments')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Payment deletion error:', error);
    res.status(500).json({ error: 'Failed to delete payment' });
    return;
  }

  res.json({ message: 'Payment deleted successfully' });
}));

/**
 * Get payment statistics
 * GET /api/payments/stats/overview
 */
router.get('/stats/overview', authenticate, asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { data: stats, error } = await supabaseAdmin
    .rpc('get_payment_stats');

  if (error) {
    console.error('Payment stats error:', error);
    // Fallback to manual calculation if RPC function doesn't exist
    const { data: payments, error: fallbackError } = await supabaseAdmin
      .from('payments')
      .select('status, payment_method, amount, created_at');

    if (fallbackError) {
      res.status(500).json({ error: 'Failed to fetch payment statistics' });
      return;
    }

    const fallbackStats = {
      total: payments.length,
      pending: payments.filter(payment => payment.status === 'pending').length,
      completed: payments.filter(payment => payment.status === 'completed').length,
      failed: payments.filter(payment => payment.status === 'failed').length,
      cancelled: payments.filter(payment => payment.status === 'cancelled').length,
      total_amount: payments.reduce((sum, payment) => sum + (payment.amount || 0), 0),
      by_method: {
        cash: payments.filter(payment => payment.payment_method === 'cash').length,
        bank_transfer: payments.filter(payment => payment.payment_method === 'bank_transfer').length,
        check: payments.filter(payment => payment.payment_method === 'check').length,
        credit_card: payments.filter(payment => payment.payment_method === 'credit_card').length,
        other: payments.filter(payment => payment.payment_method === 'other').length
      },
      this_month: payments.filter(payment => {
        const paymentDate = new Date(payment.created_at);
        const now = new Date();
        return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear();
      }).length
    };

    res.json({ stats: fallbackStats });
    return;
  }

  res.json({ stats });
}));

/**
 * Get payments by aid record
 * GET /api/payments/aid_record/:aid_record_id
 */
router.get('/aid_record/:aid_record_id', authenticate, asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { aid_record_id } = req.params;
  const { status } = req.query;

  let query = supabaseAdmin
    .from('payments')
    .select('*')
    .eq('aid_record_id', aid_record_id);

  if (status) {
    query = query.eq('status', status);
  }

  query = query.order('created_at', { ascending: false });

  const { data: payments, error } = await query;

  if (error) {
    console.error('Payments fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch payments' });
    return;
  }

  res.json({ payments });
}));

/**
 * Process payment (mark as completed)
 * POST /api/payments/:id/process
 */
router.post('/:id/process', authenticate, validate(schemas.processPayment), asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { reference_number, notes } = req.body;

  // Check if payment exists
  const { data: existingPayment, error: fetchError } = await supabaseAdmin
    .from('payments')
    .select('id, status, processed_by, reference_number')
    .eq('id', id)
    .single();

  if (fetchError || !existingPayment) {
    res.status(404).json({ error: 'Payment not found' });
    return;
  }

  // Check permissions (only processor or admin can process)
  if (existingPayment.processed_by !== req.user?.id && !['admin', 'super_admin'].includes(req.user?.role || '')) {
    res.status(403).json({ error: 'Permission denied' });
    return;
  }

  // Check if payment is already completed
  if (existingPayment.status === 'completed') {
    res.status(400).json({ error: 'Payment is already completed' });
    return;
  }

  const updateData = {
    status: 'completed',
    reference_number: reference_number || existingPayment.reference_number,
    notes: notes || null,
    updated_at: new Date().toISOString()
  };

  const { data: payment, error } = await supabaseAdmin
    .from('payments')
    .update(updateData)
    .eq('id', id)
    .select(`
      *,
      aid_records:aid_record_id (
        id,
        title,
        aid_type,
        amount as aid_amount,
        beneficiaries:beneficiary_id (
          id,
          full_name,
          identity_number,
          phone,
          email
        )
      )
    `)
    .single();

  if (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ error: 'Failed to process payment' });
    return;
  }

  res.json({ payment, message: 'Payment processed successfully' });
}));

export default router;