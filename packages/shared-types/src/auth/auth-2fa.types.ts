import { AuthMfa, AuthMfaPublic, MfaTypeValue } from './auth-mfa.types';

/**
 * 2FA specific methods
 */
export type TwoFactorMethod = 'totp' | 'sms' | 'email';

/**
 * Auth 2FA interface (internal)
 */
export interface Auth2FA extends AuthMfa {
  type: MfaTypeValue;
  method: TwoFactorMethod;
  phoneNumber?: string;
  emailAddress?: string;
  isPrimary: boolean;
  /** Alias for backupCodeHashes in parent — kept for clarity */
  recoveryCodeHashes: string[];
}

/**
 * Public-safe 2FA DTO
 */
export type Auth2FAPublic = AuthMfaPublic & {
  method: TwoFactorMethod;
  phoneNumber?: string;
  emailAddress?: string;
  isPrimary: boolean;
};
