/**
 * Cancel Notification Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';

export const CancelNotificationRequestSchema = z
  .object({
    notificationId: UuidSchema,
    reason: z.string().trim().max(500).optional(),
    cancelledBy: z.string().uuid().optional(),
  })
  .strict();

export type CancelNotificationRequestSchemaType = z.infer<
  typeof CancelNotificationRequestSchema
>;
