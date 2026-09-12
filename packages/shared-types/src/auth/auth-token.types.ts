import { BaseEntity } from '../common/base.types';
import { AUTH_TOKEN } from '@vubon/shared-constants/src/auth/auth-token.constants';
import { ROLES } from '@vubon/shared-constants/src/common/roles.constants';
import { PERMISSIONS } from '@vubon/shared-constants/src/common/permissions.constants';

/**
 * Token type value
 */
export type AuthTokenType = (typeof AUTH_TOKEN)[keyof typeof AUTH_TOKEN];

/**
 * Auth token interface (internal — never return token field)
 */
export interface AuthToken extends BaseEntity {
  tokenId: string;
  userId: string;
  /** @internal */
  token: string;
  type: AuthTokenType;
  expiresAt: Date;
  isRevoked: boolean;
  revokedAt?: Date;
  metadata: Record<string, unknown>;
}

/**
 * Token payload interface (JWT claims)
 */
export interface TokenPayload {
  sub: string;
  email: string;
  role: (typeof ROLES)[keyof typeof ROLES];
  permissions: Array<(typeof PERMISSIONS)[keyof typeof PERMISSIONS]>;
  iat: number;
  exp: number;
}
