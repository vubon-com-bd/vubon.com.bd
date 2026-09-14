/**
 * Support Email Schema
 * @module shared-schemas/support
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { EmailSchema } from '../common/primitives/email.schema';

export const SupportEmailStatusSchema = z.enum([
  'pending',
  'queued',
  'sent',
  'delivered',
  'failed',
  'bounced',
  'opened',
  'clicked',
]);

export const SupportEmailSchema = BaseEntitySchema.extend({
  ticketId: z.string().optional(),
  to: z.array(EmailSchema).min(1).max(100),
  cc: z.array(EmailSchema).max(50).optional(),
  bcc: z.array(EmailSchema).max(50).optional(),
  from: EmailSchema,
  replyTo: EmailSchema.optional(),
  subject: z.string().min(1).max(200),
  body: z.string().min(1).max(500000),
  bodyHtml: z.string().max(500000).optional(),
  templateId: z.string().max(100).optional(),
  status: SupportEmailStatusSchema,
  sentAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  openedAt: z.string().datetime().optional(),
  clickedAt: z.string().datetime().optional(),
  failureReason: z.string().max(500).optional(),
});

export const SupportEmailPublicSchema = SupportEmailSchema.pick({
  id: true,
  to: true,
  subject: true,
  status: true,
  sentAt: true,
});

export type SupportEmailStatusSchemaType = z.infer<typeof SupportEmailStatusSchema>;
export type SupportEmailSchemaType = z.infer<typeof SupportEmailSchema>;
export type SupportEmailPublicSchemaType = z.infer<typeof SupportEmailPublicSchema>;
