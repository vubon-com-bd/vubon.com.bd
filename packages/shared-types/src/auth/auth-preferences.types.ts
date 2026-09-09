import { BaseEntity } from '../common/base.types';

/**
 * Notification preferences interface
 */
export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
}

/**
 * Security preferences interface
 */
export interface SecurityPreferences {
  require2FA: boolean;
  requireBiometric: boolean;
  requireDeviceVerification: boolean;
}

/**
 * Auth preferences interface
 */
export interface AuthPreferences extends BaseEntity {
  userId: string;
  twoFactorEnabled: boolean;
  rememberMe: boolean;
  sessionTimeout: number;
  notificationPreferences: NotificationPreferences;
  securityPreferences: SecurityPreferences;
  metadata: Record<string, unknown>;
}
