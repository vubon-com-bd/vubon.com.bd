/**
 * Cancel Notification Schedule Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';

export const CancelNotificationScheduleRequestSchema = z
  .object({
    scheduleId: UuidSchema,
    reason: z.string().trim().max(500).optional(),
    cancelledBy: UuidSchema.optional(),
  })
  .strict();

export type CancelNotificationScheduleRequestSchemaType = z.infer<
  typeof CancelNotificationScheduleRequestSchema
>;
