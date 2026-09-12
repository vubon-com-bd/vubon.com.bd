import { BaseEntity } from '../../common/base.types';
import { IN_APP } from '@vubon/shared-constants/src/platform/notification/in-app.constants';
import { Notification } from './notification.types';

export interface InApp extends BaseEntity {
  inAppId: string;
  notificationId: string;
  notification: Notification;
  status: keyof typeof IN_APP.STATUS | string;
  type: keyof typeof IN_APP.TYPES | string;
  title: string;
  message: string;
  icon?: string;
  image?: string;
  action?: string;
  actionUrl?: string;
  displayedAt?: Date;
  interactedAt?: Date;
  dismissedAt?: Date;
  expiredAt?: Date;
  metadata: Record<string, unknown>;
}
