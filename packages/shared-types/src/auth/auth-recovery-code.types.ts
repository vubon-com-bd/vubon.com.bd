import { BaseEntity } from '../common/base.types';

/**
 * Auth recovery code interface
 * ⚠️ codeHash is bcrypt-hashed. Plain code is never stored.
 */
export interface AuthRecoveryCode extends BaseEntity {
  codeId: string;
  userId: string;
  /** @internal bcrypt hash of the recovery code */
  codeHash: string;
  isUsed: boolean;
  usedAt?: Date;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}

/**
 * Public-safe recovery code DTO (returned only at generation time)
 */
export interface AuthRecoveryCodePublic {
  codeId: string;
  code: string;
  expiresAt: Date;
}
