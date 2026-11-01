/**
 * Send Notification Schedule Now Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';

export const SendNotificationScheduleRequestSchema = z
  .object({
    scheduleId: UuidSchema,
    force: z.boolean().optional(),
  })
  .strict();

export type SendNotificationScheduleRequestSchemaType = z.infer<
  typeof SendNotificationScheduleRequestSchema
>;
