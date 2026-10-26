/**
 * Unregister Notification Device Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';

export const UnregisterNotificationDeviceRequestSchema = z
  .object({
    deviceId: UuidSchema,
    reason: z.string().trim().max(500).optional(),
  })
  .strict();

export type UnregisterNotificationDeviceRequestSchemaType = z.infer<
  typeof UnregisterNotificationDeviceRequestSchema
>;
