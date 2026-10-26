/**
 * Unsubscribe Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { NotificationChannelSchema } from './notification-channel.schema.js';

export const UnsubscribeRequestSchema = z
  .object({
    userId: UuidSchema.optional(),
    token: z.string().min(1).max(500).optional(),
    channel: NotificationChannelSchema,
    category: z.string().min(1).max(50).optional(),
    reason: z.string().trim().max(500).optional(),
  })
  .strict()
  .refine((d) => Boolean(d.userId || d.token), {
    message: 'Either userId or token is required',
  });

export type UnsubscribeRequestSchemaType = z.infer<typeof UnsubscribeRequestSchema>;
