/**
 * Attachment Schema
 * @module shared-schemas/support
 */

import { z } from 'zod';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const AttachmentSchema = z.object({
  id: UuidSchema,
  messageId: UuidSchema.optional(),
  ticketId: UuidSchema.optional(),
  fileName: z.string().min(1).max(255),
  fileUrl: z.string().url(),
  fileSize: z.number().int().nonnegative(),
  mimeType: z.string().min(1).max(100),
  thumbnailUrl: z.string().url().optional(),
  uploadedBy: UuidSchema,
  uploadedAt: z.string().datetime(),
});

export const AttachmentPublicSchema = AttachmentSchema.pick({
  id: true,
  fileName: true,
  fileUrl: true,
  fileSize: true,
  mimeType: true,
  thumbnailUrl: true,
});

export type AttachmentSchemaType = z.infer<typeof AttachmentSchema>;
export type AttachmentPublicSchemaType = z.infer<typeof AttachmentPublicSchema>;
