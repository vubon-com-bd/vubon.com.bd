/**
 * Auth Settings Types
 * প্রমাণীকরণ সেটিংস সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';

export interface AuthSettings extends BaseEntity {
  userId: string;
  // Security settings
  requireMFA: boolean;
  require2FA: boolean;
  requireBiometric: boolean;
  sessionTimeout: number;
  rememberMeDuration: number;
  // Password settings
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireLowercase: boolean;
  passwordRequireNumber: boolean;
  passwordRequireSpecialChar: boolean;
  passwordExpiryDays: number;
  passwordHistoryCount: number;
  // Login settings
  maxLoginAttempts: number;
  lockoutDuration: number;
  suspiciousActivityAlert: boolean;
  // Notification settings
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  // Metadata
  metadata?: Record<string, unknown>;
}

export interface AuthSettingsUpdateInput {
  requireMFA?: boolean;
  require2FA?: boolean;
  requireBiometric?: boolean;
  sessionTimeout?: number;
  rememberMeDuration?: number;
  maxLoginAttempts?: number;
  lockoutDuration?: number;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
  metadata?: Record<string, unknown>;
}
