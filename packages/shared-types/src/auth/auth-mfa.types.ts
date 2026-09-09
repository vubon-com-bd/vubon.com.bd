import { BaseEntity } from '../common/base.types';
import { AUTH_MFA } from '@vubon/shared-constants/src/auth/auth-mfa.constants';

/**
 * MFA setup response interface
 */
export interface MfaSetupResponse {
  secret: string;
  qrCode: string;
  backupCodes: string[];
  recoveryUrl: string;
}

/**
 * Auth MFA interface
 */
export interface AuthMfa extends BaseEntity {
  mfaId: string;
  userId: string;
  type: keyof typeof AUTH_MFA | string;
  secret: string;
  backupCodes: string[];
  isEnabled: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata: Record<string, unknown>;
}
