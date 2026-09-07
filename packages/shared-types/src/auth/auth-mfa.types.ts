import { AUTH_MFA } from '@vubon/shared-constants';

export interface AuthMfa {
  mfaId: string;
  userId: string;
  type: keyof typeof AUTH_MFA;
  secret: string;
  backupCodes: string[];
  isEnabled: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata: Record<string, unknown>;
}

export interface MfaSetupResponse {
  secret: string;
  qrCode: string;
  backupCodes: string[];
  recoveryUrl: string;
}
