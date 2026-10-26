/**
 * Send Template Email Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { EmailSchema } from '../../common/primitives/email.schema.js';

export const SendTemplateEmailRequestSchema = z
  .object({
    to: z.array(EmailSchema).min(1).max(100),
    cc: z.array(EmailSchema).max(50).optional(),
    bcc: z.array(EmailSchema).max(50).optional(),
    templateId: z.string().min(1).max(100),
    templateData: z.record(z.string(), z.unknown()),
    locale: z.string().min(2).max(10).optional(),
    idempotencyKey: z.string().min(1).max(128).optional(),
  })
  .strict();

export type SendTemplateEmailRequestSchemaType = z.infer<
  typeof SendTemplateEmailRequestSchema
>;
