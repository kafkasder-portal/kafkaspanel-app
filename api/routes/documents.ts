import { Router, type Request, type Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { validate, schemas } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate, authorize } from '../middleware/auth';
import path from 'path';

// Using centralized auth middleware - extending Request for file upload only
declare global {
  namespace Express {
    interface Request {
      file?: {
        originalname: string;
        mimetype: string;
        size: number;
        buffer: Buffer;
      };
    }
  }
}

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

// Simple file upload middleware (without multer dependency)
const upload = {
  single: (fieldName: string) => {
    return (req: Request, res: Response, next: any) => {
      // For now, we'll skip file upload functionality
      // This can be implemented later with proper multer setup
      next();
    };
  }
};

// Using centralized authentication middleware from auth.ts

/**
 * Get all documents
 * GET /api/documents
 */
router.get('/', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { 
    page = 1, 
    limit = 10, 
    document_type, 
    related_beneficiary_id, 
    related_application_id, 
    is_public, 
    is_archived = false,
    search 
  } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  let query = supabaseAdmin
    .from('documents')
    .select(`
      *,
      beneficiaries:related_beneficiary_id (
        id,
        full_name,
        identity_number,
        phone,
        email
      ),
      applications:related_application_id (
        id,
        application_number,
        status
      ),
      user_profiles:uploaded_by (
        id,
        full_name,
        display_name
      )
    `);

  // Apply filters
  if (document_type) {
    query = query.eq('document_type', document_type);
  }

  if (related_beneficiary_id) {
    query = query.eq('related_beneficiary_id', related_beneficiary_id);
  }

  if (related_application_id) {
    query = query.eq('related_application_id', related_application_id);
  }

  if (is_public !== undefined) {
    query = query.eq('is_public', is_public === 'true');
  }

  if (is_archived !== undefined) {
    query = query.eq('is_archived', is_archived === 'true');
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,file_name.ilike.%${search}%`);
  }

  // Apply pagination
  query = query.range(offset, offset + Number(limit) - 1).order('created_at', { ascending: false });

  const { data: documents, error, count } = await query;

  if (error) {
    console.error('Documents fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
    return;
  }

  res.json({
    documents,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: count || 0,
      totalPages: Math.ceil((count || 0) / Number(limit))
    }
  });
}));

/**
 * Get single document by ID
 * GET /api/documents/:id
 */
router.get('/:id', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { data: document, error } = await supabaseAdmin
    .from('documents')
    .select(`
      *,
      beneficiaries:related_beneficiary_id (
        id,
        full_name,
        identity_number,
        phone,
        email,
        address,
        city,
        district
      ),
      applications:related_application_id (
        id,
        application_number,
        status,
        application_date
      ),
      user_profiles:uploaded_by (
        id,
        full_name,
        display_name,
        role
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Document fetch error:', error);
    if (error.code === 'PGRST116') {
      res.status(404).json({ error: 'Document not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch document' });
    }
    return;
  }

  // Check access permissions
  if (!document.is_public && document.uploaded_by !== req.user?.id && !['admin', 'super_admin'].includes(req.user?.role || '')) {
    res.status(403).json({ error: 'Access denied' });
    return;
  }

  res.json({ document });
}));

/**
 * Upload and create new document
 * POST /api/documents
 */
router.post('/', authenticate, upload.single('file'), asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    title,
    description,
    document_type,
    related_beneficiary_id,
    related_application_id,
    is_public = false
  } = req.body;

  // Validate required fields
  if (!title || !document_type) {
    res.status(400).json({ error: 'Title and document type are required' });
    return;
  }

  if (!req.file) {
    res.status(400).json({ error: 'File is required' });
    return;
  }

  // Validate document type
  const validDocumentTypes = ['identity', 'medical', 'financial', 'educational', 'legal', 'photo', 'other'];
  if (!validDocumentTypes.includes(document_type)) {
    res.status(400).json({ error: 'Invalid document type' });
    return;
  }

  // Check if related entities exist
  if (related_beneficiary_id) {
    const { data: beneficiary, error: beneficiaryError } = await supabaseAdmin
      .from('beneficiaries')
      .select('id')
      .eq('id', related_beneficiary_id)
      .single();

    if (beneficiaryError || !beneficiary) {
      res.status(404).json({ error: 'Related beneficiary not found' });
      return;
    }
  }

  if (related_application_id) {
    const { data: application, error: applicationError } = await supabaseAdmin
      .from('applications')
      .select('id')
      .eq('id', related_application_id)
      .single();

    if (applicationError || !application) {
      res.status(404).json({ error: 'Related application not found' });
      return;
    }
  }

  try {
    // Generate unique filename
    const fileExtension = path.extname(req.file.originalname);
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}${fileExtension}`;
    const filePath = `documents/${fileName}`;

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('uploads')
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    if (uploadError) {
      console.error('File upload error:', uploadError);
      res.status(500).json({ error: 'Failed to upload file' });
      return;
    }

    // Create document record
    const documentData = {
      title,
      description: description || null,
      file_name: req.file.originalname,
      file_path: uploadData.path,
      file_size: req.file.size,
      file_type: req.file.mimetype,
      document_type,
      related_beneficiary_id: related_beneficiary_id || null,
      related_application_id: related_application_id || null,
      is_public: is_public === 'true' || is_public === true,
      is_archived: false,
      uploaded_by: req.user?.id || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: document, error } = await supabaseAdmin
      .from('documents')
      .insert(documentData)
      .select(`
        *,
        beneficiaries:related_beneficiary_id (
          id,
          full_name,
          identity_number,
          phone,
          email
        ),
        applications:related_application_id (
          id,
          application_number,
          status
        ),
        user_profiles:uploaded_by (
          id,
          full_name,
          display_name
        )
      `)
      .single();

    if (error) {
      console.error('Document creation error:', error);
      // Clean up uploaded file if document creation fails
      await supabaseAdmin.storage.from('uploads').remove([uploadData.path]);
      res.status(500).json({ error: 'Failed to create document record' });
      return;
    }

    res.status(201).json({ document });
  } catch (err) {
    console.error('Document upload error:', err);
    res.status(500).json({ error: 'Failed to upload document' });
  }
}));

/**
 * Update document metadata
 * PUT /api/documents/:id
 */
router.put('/:id', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const {
    title,
    description,
    document_type,
    related_beneficiary_id,
    related_application_id,
    is_public,
    is_archived
  } = req.body;

  // Check if document exists
  const { data: existingDocument, error: fetchError } = await supabaseAdmin
    .from('documents')
    .select('id, uploaded_by, is_public')
    .eq('id', id)
    .single();

  if (fetchError || !existingDocument) {
    res.status(404).json({ error: 'Document not found' });
    return;
  }

  // Check permissions (only uploader or admin can update)
  if (existingDocument.uploaded_by !== req.user?.id && !['admin', 'super_admin'].includes(req.user?.role || '')) {
    res.status(403).json({ error: 'Permission denied' });
    return;
  }

  // Validate document type if provided
  if (document_type) {
    const validDocumentTypes = ['identity', 'medical', 'financial', 'educational', 'legal', 'photo', 'other'];
    if (!validDocumentTypes.includes(document_type)) {
      res.status(400).json({ error: 'Invalid document type' });
      return;
    }
  }

  // Check if related entities exist
  if (related_beneficiary_id) {
    const { data: beneficiary, error: beneficiaryError } = await supabaseAdmin
      .from('beneficiaries')
      .select('id')
      .eq('id', related_beneficiary_id)
      .single();

    if (beneficiaryError || !beneficiary) {
      res.status(404).json({ error: 'Related beneficiary not found' });
      return;
    }
  }

  if (related_application_id) {
    const { data: application, error: applicationError } = await supabaseAdmin
      .from('applications')
      .select('id')
      .eq('id', related_application_id)
      .single();

    if (applicationError || !application) {
      res.status(404).json({ error: 'Related application not found' });
      return;
    }
  }

  const updateData: any = {
    updated_at: new Date().toISOString()
  };

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (document_type !== undefined) updateData.document_type = document_type;
  if (related_beneficiary_id !== undefined) updateData.related_beneficiary_id = related_beneficiary_id;
  if (related_application_id !== undefined) updateData.related_application_id = related_application_id;
  if (is_public !== undefined) updateData.is_public = is_public === 'true' || is_public === true;
  if (is_archived !== undefined) updateData.is_archived = is_archived === 'true' || is_archived === true;

  const { data: document, error } = await supabaseAdmin
    .from('documents')
    .update(updateData)
    .eq('id', id)
    .select(`
      *,
      beneficiaries:related_beneficiary_id (
        id,
        full_name,
        identity_number,
        phone,
        email
      ),
      applications:related_application_id (
        id,
        application_number,
        status
      ),
      user_profiles:uploaded_by (
        id,
        full_name,
        display_name
      )
    `)
    .single();

  if (error) {
    console.error('Document update error:', error);
    res.status(500).json({ error: 'Failed to update document' });
    return;
  }

  res.json({ document });
}));

/**
 * Delete document
 * DELETE /api/documents/:id
 */
router.delete('/:id', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Check if document exists
  const { data: existingDocument, error: fetchError } = await supabaseAdmin
    .from('documents')
    .select('id, uploaded_by, file_path')
    .eq('id', id)
    .single();

  if (fetchError || !existingDocument) {
    res.status(404).json({ error: 'Document not found' });
    return;
  }

  // Check permissions (only uploader or admin can delete)
  if (existingDocument.uploaded_by !== req.user?.id && !['admin', 'super_admin'].includes(req.user?.role || '')) {
    res.status(403).json({ error: 'Permission denied' });
    return;
  }

  // Delete file from storage
  if (existingDocument.file_path) {
    const { error: storageError } = await supabaseAdmin.storage
      .from('uploads')
      .remove([existingDocument.file_path]);

    if (storageError) {
      console.error('Storage deletion error:', storageError);
      // Continue with database deletion even if storage deletion fails
    }
  }

  // Delete document record
  const { error } = await supabaseAdmin
    .from('documents')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Document deletion error:', error);
    res.status(500).json({ error: 'Failed to delete document' });
    return;
  }

  res.json({ message: 'Document deleted successfully' });
}));

/**
 * Get document statistics
 * GET /api/documents/stats/overview
 */
router.get('/stats/overview', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { data: documents, error } = await supabaseAdmin
    .from('documents')
    .select('document_type, file_size, is_public, is_archived, created_at');

  if (error) {
    console.error('Document stats error:', error);
    res.status(500).json({ error: 'Failed to fetch document statistics' });
    return;
  }

  const stats = {
    total: documents.length,
    public: documents.filter(doc => doc.is_public).length,
    private: documents.filter(doc => !doc.is_public).length,
    archived: documents.filter(doc => doc.is_archived).length,
    active: documents.filter(doc => !doc.is_archived).length,
    total_size: documents.reduce((sum, doc) => sum + (doc.file_size || 0), 0),
    by_type: {
      identity: documents.filter(doc => doc.document_type === 'identity').length,
      medical: documents.filter(doc => doc.document_type === 'medical').length,
      financial: documents.filter(doc => doc.document_type === 'financial').length,
      educational: documents.filter(doc => doc.document_type === 'educational').length,
      legal: documents.filter(doc => doc.document_type === 'legal').length,
      photo: documents.filter(doc => doc.document_type === 'photo').length,
      other: documents.filter(doc => doc.document_type === 'other').length
    },
    this_month: documents.filter(doc => {
      const docDate = new Date(doc.created_at);
      const now = new Date();
      return docDate.getMonth() === now.getMonth() && docDate.getFullYear() === now.getFullYear();
    }).length
  };

  res.json({ stats });
}));

/**
 * Get documents by beneficiary
 * GET /api/documents/beneficiary/:beneficiary_id
 */
router.get('/beneficiary/:beneficiary_id', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { beneficiary_id } = req.params;
  const { document_type, is_archived = false } = req.query;

  let query = supabaseAdmin
    .from('documents')
    .select(`
      *,
      user_profiles:uploaded_by (
        id,
        full_name,
        display_name
      )
    `)
    .eq('related_beneficiary_id', beneficiary_id);

  if (document_type) {
    query = query.eq('document_type', document_type);
  }

  if (is_archived !== undefined) {
    query = query.eq('is_archived', is_archived === 'true');
  }

  query = query.order('created_at', { ascending: false });

  const { data: documents, error } = await query;

  if (error) {
    console.error('Documents fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
    return;
  }

  res.json({ documents });
}));

/**
 * Get documents by application
 * GET /api/documents/application/:application_id
 */
router.get('/application/:application_id', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { application_id } = req.params;
  const { document_type, is_archived = false } = req.query;

  let query = supabaseAdmin
    .from('documents')
    .select(`
      *,
      user_profiles:uploaded_by (
        id,
        full_name,
        display_name
      )
    `)
    .eq('related_application_id', application_id);

  if (document_type) {
    query = query.eq('document_type', document_type);
  }

  if (is_archived !== undefined) {
    query = query.eq('is_archived', is_archived === 'true');
  }

  query = query.order('created_at', { ascending: false });

  const { data: documents, error } = await query;

  if (error) {
    console.error('Documents fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
    return;
  }

  res.json({ documents });
}));

/**
 * Download document file
 * GET /api/documents/:id/download
 */
router.get('/:id/download', authenticate, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Get document info
  const { data: document, error: docError } = await supabaseAdmin
    .from('documents')
    .select('id, file_name, file_path, file_type, is_public, uploaded_by')
    .eq('id', id)
    .single();

  if (docError || !document) {
    res.status(404).json({ error: 'Document not found' });
    return;
  }

  // Check access permissions
  if (!document.is_public && document.uploaded_by !== req.user?.id && !['admin', 'super_admin'].includes(req.user?.role || '')) {
    res.status(403).json({ error: 'Access denied' });
    return;
  }

  try {
    // Get file from storage
    const { data: fileData, error: downloadError } = await supabaseAdmin.storage
      .from('uploads')
      .download(document.file_path);

    if (downloadError || !fileData) {
      console.error('File download error:', downloadError);
      res.status(404).json({ error: 'File not found in storage' });
      return;
    }

    // Convert blob to buffer
    const buffer = Buffer.from(await fileData.arrayBuffer());

    // Set appropriate headers
    res.setHeader('Content-Type', document.file_type || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${document.file_name}"`);
    res.setHeader('Content-Length', buffer.length);

    // Send file
    res.send(buffer);
  } catch (err) {
    console.error('Download error:', err);
    res.status(500).json({ error: 'Failed to download file' });
  }
}));

export default router;