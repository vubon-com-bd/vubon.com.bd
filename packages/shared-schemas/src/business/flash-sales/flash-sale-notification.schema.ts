import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { FLASH_SALE_NOTIFICATION } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-notification.constants';

const notificationTypeKeys = Object.keys(FLASH_SALE_NOTIFICATION.NOTIFICATION_TYPES) as [
  string,
  ...string[],
];
const notificationStatusKeys = Object.keys(FLASH_SALE_NOTIFICATION.STATUS) as [string, ...string[]];
const notificationChannelKeys = Object.keys(FLASH_SALE_NOTIFICATION.NOTIFICATION_CHANNELS) as [
  string,
  ...string[],
];

export const FlashSaleNotificationSchema = BaseSchema.extend({
  notificationId: z.string().uuid(),
  flashSaleId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  user: UserSchema.optional(),
  type: z.enum(notificationTypeKeys),
  status: z.enum(notificationStatusKeys),
  channel: z.enum(notificationChannelKeys),
  subject: z.string(),
  body: z.string(),
  data: z.record(z.unknown()),
  sentAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  readAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
