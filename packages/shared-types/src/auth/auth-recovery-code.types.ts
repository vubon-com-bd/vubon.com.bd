import { BaseEntity } from '../common/base.types';

/**
 * Auth recovery code interface
 */
export interface AuthRecoveryCode extends BaseEntity {
  codeId: string;
  userId: string;
  code: string;
  isUsed: boolean;
  usedAt?: Date;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}
