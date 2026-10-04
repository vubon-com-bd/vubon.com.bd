/**
 * Notification Delivery Status Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/notification-delivery-status.constants থেকে।
 */

import { z } from 'zod';
import {
  NOTIFICATION_DELIVERY_STATUS,
  NOTIFICATION_DELIVERY_FAILURE_REASON,
} from '@vubon/shared-constants/platform';

export const NotificationDeliveryStatusSchema = z.enum(
  Object.values(NOTIFICATION_DELIVERY_STATUS) as [string, ...string[]]
);

export const NotificationDeliveryFailureReasonSchema = z.enum(
  Object.values(NOTIFICATION_DELIVERY_FAILURE_REASON) as [string, ...string[]]
);

export const NotificationDeliveryMetadataSchema = z.object({
  status: NotificationDeliveryStatusSchema,
  failureReason: NotificationDeliveryFailureReasonSchema.optional(),
  attemptCount: z.number().int().nonnegative(),
  deliveredAt: z.string().datetime().optional(),
});

export type NotificationDeliveryStatusSchemaType = z.infer<typeof NotificationDeliveryStatusSchema>;
export type NotificationDeliveryFailureReasonSchemaType = z.infer<
  typeof NotificationDeliveryFailureReasonSchema
>;
export type NotificationDeliveryMetadataSchemaType = z.infer<
  typeof NotificationDeliveryMetadataSchema
>;
