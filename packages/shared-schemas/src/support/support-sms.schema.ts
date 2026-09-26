/**
 * Support SMS Schema
 * @module shared-schemas/support
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { PhoneSchema } from '../common/primitives/phone.schema';

export const SupportSmsStatusSchema = z.enum(['pending', 'queued', 'sent', 'delivered', 'failed']);

export const SupportSmsSchema = BaseEntitySchema.extend({
  ticketId: z.string().optional(),
  to: PhoneSchema,
  from: z.string().max(20).optional(),
  message: z.string().min(1).max(1600),
  status: SupportSmsStatusSchema,
  segments: z.number().int().positive().max(10),
  sentAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  failureReason: z.string().max(500).optional(),
});

export const SupportSmsPublicSchema = SupportSmsSchema.pick({
  id: true,
  to: true,
  message: true,
  status: true,
  sentAt: true,
});

export type SupportSmsStatusSchemaType = z.infer<typeof SupportSmsStatusSchema>;
export type SupportSmsSchemaType = z.infer<typeof SupportSmsSchema>;
export type SupportSmsPublicSchemaType = z.infer<typeof SupportSmsPublicSchema>;
