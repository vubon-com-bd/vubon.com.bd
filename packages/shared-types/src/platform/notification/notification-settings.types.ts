import { BaseEntity } from '../../common/base.types';
import { NOTIFICATION_SETTINGS } from '@vubon/shared-constants/src/platform/notification/notification-settings.constants';

export interface NotificationSettingsValues {
  enableEmail: boolean;
  enableSms: boolean;
  enablePush: boolean;
  enableInApp: boolean;
  enableWebhook: boolean;
  maxDailyNotifications: number;
  maxHourlyNotifications: number;
  retryAttempts: number;
  retryInterval: number;
  defaultPriority: string;
  timezone: string;
  language: string;
}

export interface NotificationSettings extends BaseEntity {
  settingsId: string;
  type: keyof typeof NOTIFICATION_SETTINGS.TYPES | string;
  key: keyof typeof NOTIFICATION_SETTINGS.SETTINGS_CATEGORIES | string;
  value: unknown;
  description?: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
