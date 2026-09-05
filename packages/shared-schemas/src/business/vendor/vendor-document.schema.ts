/**
 * Vendor Document Schema
 * ভেন্ডর ডকুমেন্ট সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_DOCUMENT } from '@vubon/shared-constants';

export const VendorDocumentSchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  type: z.enum(Object.values(VENDOR_DOCUMENT.TYPES) as [string, ...string[]]),
  name: z.string().min(1, 'Document name is required'),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  fileUrl: z.string().url('Invalid file URL'),
  fileName: z.string().min(1, 'File name is required'),
  fileSize: z.number().int().min(0),
  mimeType: z.string().min(1, 'MIME type is required'),
  status: z.enum(Object.values(VENDOR_DOCUMENT.STATUS) as [string, ...string[]]),
  approvedAt: z.date().optional(),
  rejectedAt: z.date().optional(),
  expiryDate: z.date().optional(),
  rejectionReason: z.string().optional(),
  verifiedBy: z.string().uuid().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorDocumentCreateSchema = VendorDocumentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const VendorDocumentUpdateSchema = VendorDocumentCreateSchema.partial();

export type VendorDocument = z.infer<typeof VendorDocumentSchema>;
export type VendorDocumentCreate = z.infer<typeof VendorDocumentCreateSchema>;
export type VendorDocumentUpdate = z.infer<typeof VendorDocumentUpdateSchema>;
