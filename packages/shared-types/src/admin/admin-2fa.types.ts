/**
 * Admin 2FA Types
 * অ্যাডমিন 2FA সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { Auth2FA } from '../auth/auth-2fa.types';

export interface Admin2FA extends BaseEntity, Auth2FA {
  adminId: string;
  enabled: boolean;
  method: 'totp' | 'sms' | 'email' | 'backup_codes';
  secret?: string;
  backupCodes?: string[];
  recoveryCodes?: string[];
}

export interface Admin2FASetupInput {
  method: 'totp' | 'sms' | 'email';
  phoneNumber?: string;
  email?: string;
}

export interface Admin2FAVerifyInput {
  code: string;
  method: 'totp' | 'sms' | 'email' | 'backup_code';
  backupCode?: string;
}

export interface Admin2FAResponse {
  enabled: boolean;
  method?: string;
  qrCode?: string;
  secret?: string;
  recoveryCodes?: string[];
  backupCodes?: string[];
}
