/**
 * Email Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/email.constants থেকে।
 */

import { z } from 'zod';
import { EMAIL_PROVIDER, EMAIL_STATUS, EMAIL_PRIORITY } from '@vubon/shared-constants/platform';
import { EmailSchema as EmailAddressSchema } from '../../common/primitives/email.schema';

export const EmailProviderSchema = z.enum(Object.values(EMAIL_PROVIDER) as [string, ...string[]]);

export const EmailStatusSchema = z.enum(Object.values(EMAIL_STATUS) as [string, ...string[]]);

export const EmailPrioritySchema = z.enum(Object.values(EMAIL_PRIORITY) as [string, ...string[]]);

export const EmailAttachmentSchema = z.object({
  filename: z.string().min(1).max(255),
  contentType: z.string().min(1).max(100),
  size: z.number().int().nonnegative(),
  url: z.string().url().optional(),
  content: z.string().optional(),
});

export const EmailMessageSchema = z.object({
  id: z.string().min(1),
  to: z.array(EmailAddressSchema).min(1).max(100),
  cc: z.array(EmailAddressSchema).max(50).optional(),
  bcc: z.array(EmailAddressSchema).max(50).optional(),
  from: EmailAddressSchema.optional(),
  replyTo: EmailAddressSchema.optional(),
  subject: z.string().min(1).max(200),
  text: z.string().max(500000).optional(),
  html: z.string().max(500000).optional(),
  templateId: z.string().max(100).optional(),
  templateData: z.record(z.string(), z.unknown()).optional(),
  attachments: z.array(EmailAttachmentSchema).max(10).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  priority: EmailPrioritySchema.optional(),
  provider: EmailProviderSchema.optional(),
  status: EmailStatusSchema,
  sentAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  openedAt: z.string().datetime().optional(),
  clickedAt: z.string().datetime().optional(),
  bouncedAt: z.string().datetime().optional(),
  failureReason: z.string().max(500).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type EmailProviderSchemaType = z.infer<typeof EmailProviderSchema>;
export type EmailStatusSchemaType = z.infer<typeof EmailStatusSchema>;
export type EmailPrioritySchemaType = z.infer<typeof EmailPrioritySchema>;
export type EmailMessageSchemaType = z.infer<typeof EmailMessageSchema>;
