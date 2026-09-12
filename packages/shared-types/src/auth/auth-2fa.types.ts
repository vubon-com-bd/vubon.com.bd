import { AUTH_MFA } from '@vubon/shared-constants/src/auth/auth-mfa.constants';
import { AuthMfa, AuthMfaPublic } from './auth-mfa.types';

/**
 * 2FA specific methods — derived from AUTH_MFA (excluding BACKUP)
 */
export type TwoFactorMethod = typeof AUTH_MFA.TOTP | typeof AUTH_MFA.SMS | typeof AUTH_MFA.EMAIL;

/**
 * Auth 2FA interface (internal)
 * Note: reuses backupCodeHashes from AuthMfa — no duplicate field.
 */
export interface Auth2FA extends AuthMfa {
  method: TwoFactorMethod;
  phoneNumber?: string;
  emailAddress?: string;
  isPrimary: boolean;
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
