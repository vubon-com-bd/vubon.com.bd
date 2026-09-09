import { BaseEntity } from '../../common/base.types';
import { PUSH } from '@vubon/shared-constants/src/platform/notification/push.constants';
import { Notification } from './notification.types';

export interface Push extends BaseEntity {
  pushId: string;
  notificationId: string;
  notification: Notification;
  status: keyof typeof PUSH.STATUS | string;
  type: keyof typeof PUSH.TYPES | string;
  provider: keyof typeof PUSH.PUSH_PROVIDERS | string;
  title: string;
  body: string;
  icon?: string;
  image?: string;
  badge?: number;
  sound?: string;
  data: Record<string, unknown>;
  sentAt?: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata: Record<string, unknown>;
}
