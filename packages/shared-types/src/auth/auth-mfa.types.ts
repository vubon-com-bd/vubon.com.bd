import { BaseEntity } from '../common/base.types';
import { AUTH_MFA } from '@vubon/shared-constants/src/auth/auth-mfa.constants';

/**
 * MFA type value
 */
export type MfaTypeValue = (typeof AUTH_MFA)[keyof typeof AUTH_MFA];

/**
 * MFA setup response — returned once at setup time.
 * Contains plain values shown to user exactly once.
 */
export interface MfaSetupResponse {
  secret: string;
  qrCode: string;
  backupCodes: string[];
  recoveryUrl: string;
}

/**
 * Auth MFA interface (internal — secrets stored encrypted/hashed)
 * ⚠️ NEVER return this directly to clients.
 */
export interface AuthMfa extends BaseEntity {
  mfaId: string;
  userId: string;
  type: MfaTypeValue;
  /** @internal AES-256 encrypted TOTP secret */
  encryptedSecret: string;
  /** @internal bcrypt-hashed backup codes */
  backupCodeHashes: string[];
  isEnabled: boolean;
  isVerified: boolean;
  metadata: Record<string, unknown>;
}

/**
 * Public-safe MFA DTO
 */
export type AuthMfaPublic = Omit<AuthMfa, 'encryptedSecret' | 'backupCodeHashes' | 'metadata'> & {
  hasBackupCodes: boolean;
};
