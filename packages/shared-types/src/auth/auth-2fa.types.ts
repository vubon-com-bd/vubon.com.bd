import { AuthMfa } from './auth-mfa.types';

/**
 * Auth 2FA interface
 */
export interface Auth2FA extends AuthMfa {
  type: 'totp' | 'sms' | 'email' | string;
  phoneNumber?: string;
  emailAddress?: string;
  isPrimary: boolean;
  recoveryCodes: string[];
}
