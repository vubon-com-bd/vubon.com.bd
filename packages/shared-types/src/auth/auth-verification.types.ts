import { BaseEntity } from '../common/base.types';
import { STATUS } from '@vubon/shared-constants';
import { AUTH_VERIFICATION } from '@vubon/shared-constants';

export interface AuthVerification extends BaseEntity {
  verificationId: string;
  userId: string;
  type: keyof typeof AUTH_VERIFICATION;
  code: string;
  status: keyof typeof STATUS;
  expiresAt: Date;
  verifiedAt?: Date;
  attempts: number;
  maxAttempts: number;
  metadata: Record<string, unknown>;
}
