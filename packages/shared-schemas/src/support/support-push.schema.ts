/**
 * Support Push Notification Schema
 * @module shared-schemas/support
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const SupportPushStatusSchema = z.enum(['pending', 'queued', 'sent', 'delivered', 'failed']);

export const SupportPushSchema = BaseEntitySchema.extend({
  ticketId: z.string().optional(),
  userId: UuidSchema,
  title: z.string().min(1).max(65),
  body: z.string().min(1).max(240),
  data: z.record(z.string(), z.unknown()).optional(),
  status: SupportPushStatusSchema,
  sentAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  failureReason: z.string().max(500).optional(),
});

export const SupportPushPublicSchema = SupportPushSchema.pick({
  id: true,
  userId: true,
  title: true,
  body: true,
  status: true,
  sentAt: true,
});

export type SupportPushStatusSchemaType = z.infer<typeof SupportPushStatusSchema>;
export type SupportPushSchemaType = z.infer<typeof SupportPushSchema>;
export type SupportPushPublicSchemaType = z.infer<typeof SupportPushPublicSchema>;
