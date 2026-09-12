import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { NOTIFICATION_DELIVERY_STATUS } from '@vubon/shared-constants/src/platform/notification/notification-delivery-status.constants';

const notificationDeliveryStatusKeys = Object.keys(NOTIFICATION_DELIVERY_STATUS) as [
  string,
  ...string[],
];

export const NotificationDeliveryStatusSchema = StatusSchema.extend({
  status: z.enum(notificationDeliveryStatusKeys),
  category: z.literal('notification_delivery'),
});

export const NotificationDeliveryStatusEnumSchema = z.enum(notificationDeliveryStatusKeys);
