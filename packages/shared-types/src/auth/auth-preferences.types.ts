import { BaseEntity } from '../common/base.types';
import { NotificationPreferences } from '../user/user-settings.types';

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

// Re-export for convenience (no duplicate declaration)
export type { NotificationPreferences };
