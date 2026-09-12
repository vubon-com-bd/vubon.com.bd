import { BaseEntity } from '../../common/base.types';
import { VENDOR_NOTIFICATION } from '@vubon/shared-constants/src/business/vendor/vendor-notification.constants';
import { Vendor } from './vendor.types';

export interface VendorNotification extends BaseEntity {
  notificationId: string;
  vendorId: string;
  vendor: Vendor;
  type: keyof typeof VENDOR_NOTIFICATION.NOTIFICATION_TYPES | string;
  status: keyof typeof VENDOR_NOTIFICATION.STATUS | string;
  channel: keyof typeof VENDOR_NOTIFICATION.NOTIFICATION_CHANNELS | string;
  subject: string;
  body: string;
  data: Record<string, unknown>;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  metadata: Record<string, unknown>;
}
