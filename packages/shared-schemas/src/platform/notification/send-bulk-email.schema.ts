/**
 * Send Bulk Email Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { EmailSchema } from '../../common/primitives/email.schema.js';

export const SendBulkEmailRequestSchema = z
  .object({
    recipients: z
      .array(
        z.object({
          email: EmailSchema,
          templateData: z.record(z.string(), z.unknown()).optional(),
        }).strict(),
      )
      .min(1)
      .max(1000),
    templateId: z.string().min(1).max(100),
    commonData: z.record(z.string(), z.unknown()).optional(),
    idempotencyKey: z.string().min(1).max(128).optional(),
  })
  .strict();

export type SendBulkEmailRequestSchemaType = z.infer<typeof SendBulkEmailRequestSchema>;
