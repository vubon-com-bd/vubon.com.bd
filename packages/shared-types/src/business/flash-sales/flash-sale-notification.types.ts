import { BaseEntity } from '../../common/base.types';
import { FLASH_SALE_NOTIFICATION } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-notification.constants';
import { FlashSale } from './flash-sale.types';
import { User } from '../../user/user.types';

export interface FlashSaleNotification extends BaseEntity {
  notificationId: string;
  flashSaleId: string;
  flashSale: FlashSale;
  userId?: string;
  user?: User;
  type: keyof typeof FLASH_SALE_NOTIFICATION.NOTIFICATION_TYPES | string;
  status: keyof typeof FLASH_SALE_NOTIFICATION.STATUS | string;
  channel: keyof typeof FLASH_SALE_NOTIFICATION.NOTIFICATION_CHANNELS | string;
  subject: string;
  body: string;
  data: Record<string, unknown>;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  metadata: Record<string, unknown>;
}
