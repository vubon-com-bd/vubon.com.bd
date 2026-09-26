/**
 * Vendor Document Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-document.constants থেকে।
 */

import { z } from 'zod';
import { VENDOR_DOCUMENT_TYPE, VENDOR_DOCUMENT_STATUS } from '@vubon/shared-constants/business';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const VendorDocumentTypeSchema = z.enum(
  Object.values(VENDOR_DOCUMENT_TYPE) as [string, ...string[]]
);

export const VendorDocumentStatusSchema = z.enum(
  Object.values(VENDOR_DOCUMENT_STATUS) as [string, ...string[]]
);

export const VendorDocumentSchema = BaseEntitySchema.extend({
  vendorId: UuidSchema,
  type: VendorDocumentTypeSchema,
  status: VendorDocumentStatusSchema,
  fileUrl: z.string().url(),
  fileName: z.string().min(1).max(255),
  fileSize: z.number().int().positive(),
  mimeType: z.string().min(1).max(100),
  documentNumber: z.string().max(100).optional(),
  issuedAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  verifiedAt: z.string().datetime().optional(),
  verifiedBy: UuidSchema.optional(),
  rejectionReason: z.string().max(500).optional(),
  notes: z.string().max(1000).optional(),
});

export const VendorDocumentPublicSchema = VendorDocumentSchema.pick({
  id: true,
  type: true,
  status: true,
  fileName: true,
  createdAt: true,
  expiresAt: true,
});

export type VendorDocumentTypeSchemaType = z.infer<typeof VendorDocumentTypeSchema>;
export type VendorDocumentStatusSchemaType = z.infer<typeof VendorDocumentStatusSchema>;
export type VendorDocumentSchemaType = z.infer<typeof VendorDocumentSchema>;
export type VendorDocumentPublicSchemaType = z.infer<typeof VendorDocumentPublicSchema>;
