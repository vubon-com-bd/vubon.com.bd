import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_DOCUMENT } from '@vubon/shared-constants/src/business/vendor/vendor-document.constants';

const vendorDocumentTypeKeys = Object.keys(VENDOR_DOCUMENT.TYPES) as [string, ...string[]];
const vendorDocumentStatusKeys = Object.keys(VENDOR_DOCUMENT.DOCUMENT_STATUS) as [
  string,
  ...string[],
];

export const VendorDocumentSchema = BaseSchema.extend({
  documentId: z.string().uuid(),
  vendorId: z.string().uuid(),
  type: z.enum(vendorDocumentTypeKeys),
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  fileUrl: z.string().url(),
  fileSize: z.number().int().min(0),
  mimeType: z.string(),
  status: z.enum(vendorDocumentStatusKeys),
  isVerified: z.boolean().default(false),
  verifiedAt: z.date().optional(),
  expiresAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
