import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ATTACHMENT } from '@vubon/shared-constants/src/support/attachment.constants';

const attachmentTypeKeys = Object.keys(ATTACHMENT.TYPES) as [string, ...string[]];

export const AttachmentSchema = BaseSchema.extend({
  attachmentId: z.string().uuid(),
  messageId: z.string().uuid(),
  type: z.enum(attachmentTypeKeys),
  name: z.string().min(1).max(255),
  filename: z.string().min(1).max(255),
  url: z.string().url(),
  size: z.number().min(0),
  mimeType: z.string(),
  extension: z.string(),
  width: z.number().int().min(0).optional(),
  height: z.number().int().min(0).optional(),
  duration: z.number().min(0).optional(),
  metadata: z.record(z.unknown()).optional(),
  uploadedAt: z.date(),
});
