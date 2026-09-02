/**
 * Auth 2FA Types
 * প্রমাণীকরণ টু-ফ্যাক্টর অথেনটিকেশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';

export interface Auth2FA extends BaseEntity {
  userId: string;
  type: '2fa';
  method: 'totp' | 'sms' | 'email' | 'backup_codes';
  status: 'enabled' | 'disabled' | 'pending' | 'verified' | 'failed';
  secret?: string;
  backupCodes?: string[];
  recoveryCodes?: string[];
  phoneNumber?: string;
  email?: string;
  enabledAt?: Date;
  disabledAt?: Date;
  lastUsedAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface Auth2FASetupInput {
  method: 'totp' | 'sms' | 'email' | 'backup_codes';
  phoneNumber?: string;
  email?: string;
}

export interface Auth2FAVerifyInput {
  code: string;
  method: 'totp' | 'sms' | 'email' | 'backup_code';
  backupCode?: string;
}

export interface Auth2FAResponse {
  enabled: boolean;
  method?: string;
  qrCode?: string;
  secret?: string;
  recoveryCodes?: string[];
  backupCodes?: string[];
}
