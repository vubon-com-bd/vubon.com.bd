import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_NOTIFICATION } from '@vubon/shared-constants/src/business/vendor/vendor-notification.constants';

const vendorNotificationTypeKeys = Object.keys(VENDOR_NOTIFICATION.NOTIFICATION_TYPES) as [
  string,
  ...string[],
];
const vendorNotificationStatusKeys = Object.keys(VENDOR_NOTIFICATION.STATUS) as [
  string,
  ...string[],
];
const vendorNotificationChannelKeys = Object.keys(VENDOR_NOTIFICATION.NOTIFICATION_CHANNELS) as [
  string,
  ...string[],
];

export const VendorNotificationSchema = BaseSchema.extend({
  notificationId: z.string().uuid(),
  vendorId: z.string().uuid(),
  type: z.enum(vendorNotificationTypeKeys),
  status: z.enum(vendorNotificationStatusKeys),
  channel: z.enum(vendorNotificationChannelKeys),
  subject: z.string(),
  body: z.string(),
  data: z.record(z.unknown()),
  sentAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  readAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
