import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { NOTIFICATION_DEVICE } from '@vubon/shared-constants/src/platform/notification/notification-device.constants';

export interface NotificationDevice extends BaseEntity {
  deviceId: string;
  userId: string;
  user: User;
  status: keyof typeof NOTIFICATION_DEVICE.STATUS | string;
  type: keyof typeof NOTIFICATION_DEVICE.TYPES | string;
  token: string;
  name: string;
  model?: string;
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
  isActive: boolean;
  isRegistered: boolean;
  registeredAt: Date;
  lastUsed: Date;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}
