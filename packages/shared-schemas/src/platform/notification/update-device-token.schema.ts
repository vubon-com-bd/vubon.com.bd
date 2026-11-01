/**
 * Update Notification Device Token Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';

export const UpdateNotificationDeviceTokenRequestSchema = z
  .object({
    deviceId: UuidSchema,
    newToken: z.string().min(1).max(500),
    appVersion: z.string().max(20).optional(),
    osVersion: z.string().max(50).optional(),
  })
  .strict();

export type UpdateNotificationDeviceTokenRequestSchemaType = z.infer<
  typeof UpdateNotificationDeviceTokenRequestSchema
>;
