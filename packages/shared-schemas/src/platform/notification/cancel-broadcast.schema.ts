/**
 * Cancel Broadcast Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';

export const CancelNotificationBroadcastRequestSchema = z
  .object({
    broadcastId: UuidSchema,
    reason: z.string().trim().max(500).optional(),
    cancelledBy: UuidSchema.optional(),
  })
  .strict();

export type CancelNotificationBroadcastRequestSchemaType = z.infer<
  typeof CancelNotificationBroadcastRequestSchema
>;
