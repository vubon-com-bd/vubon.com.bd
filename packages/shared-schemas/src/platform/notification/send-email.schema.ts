/**
 * Send Email Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { EmailSchema } from '../../common/primitives/email.schema.js';
import { EmailPrioritySchema, EmailAttachmentSchema } from './email.schema.js';

export const SendEmailRequestSchema = z
  .object({
    to: z.array(EmailSchema).min(1).max(100),
    cc: z.array(EmailSchema).max(50).optional(),
    bcc: z.array(EmailSchema).max(50).optional(),
    from: EmailSchema.optional(),
    replyTo: EmailSchema.optional(),
    subject: z.string().trim().min(1).max(200),
    text: z.string().max(500000).optional(),
    html: z.string().max(500000).optional(),
    templateId: z.string().max(100).optional(),
    templateData: z.record(z.string(), z.unknown()).optional(),
    attachments: z.array(EmailAttachmentSchema).max(10).optional(),
    headers: z.record(z.string(), z.string()).optional(),
    priority: EmailPrioritySchema.optional(),
    idempotencyKey: z.string().min(1).max(128).optional(),
  })
  .strict()
  .refine((data) => Boolean(data.text || data.html || data.templateId), {
    message: 'At least one of text, html, or templateId is required',
  });

export type SendEmailRequestSchemaType = z.infer<typeof SendEmailRequestSchema>;
