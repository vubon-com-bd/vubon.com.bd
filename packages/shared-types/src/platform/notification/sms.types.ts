import { BaseEntity } from '../../common/base.types';
import { SMS } from '@vubon/shared-constants/src/platform/notification/sms.constants';
import { Notification } from './notification.types';

export interface Sms extends BaseEntity {
  smsId: string;
  notificationId: string;
  notification: Notification;
  status: keyof typeof SMS.STATUS | string;
  type: keyof typeof SMS.TYPES | string;
  provider: keyof typeof SMS.SMS_PROVIDERS | string;
  from: string;
  to: string[];
  body: string;
  length: number;
  parts: number;
  sentAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata: Record<string, unknown>;
}
