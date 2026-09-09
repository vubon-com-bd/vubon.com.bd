import { BaseEntity } from '../common/base.types';
import { TYPES } from '@vubon/shared-constants/src/common/types.constants';
import { AUTH_TOKEN } from '@vubon/shared-constants/src/auth/auth-token.constants';

/**
 * Auth token interface
 */
export interface AuthToken extends BaseEntity {
  tokenId: string;
  userId: string;
  token: string;
  type: keyof typeof AUTH_TOKEN;
  category: keyof typeof TYPES;
  expiresAt: Date;
  isRevoked: boolean;
  revokedAt?: Date;
  metadata: Record<string, unknown>;
}

/**
 * Token payload interface
 */
export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  permissions: string[];
  iat: number;
  exp: number;
}
