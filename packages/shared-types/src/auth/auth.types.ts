/**
 * Auth Core Types
 * @module shared-types/auth
 *
 * Base auth types — aggregator।
 */

import type {
  UserId,
  Email,
  Phone,
  PasswordHash,
  AccessToken,
  RefreshToken,
  SessionId,
} from '../common/primitives';
import type { BaseEntity } from '../common/base';
import type { AuthStatusValue } from './auth-status.types';
import type { AuthTypeValue } from './auth-type.types';
import type { AuthProviderValue } from './auth-provider.types';
import type { AuthMethodValue } from './auth-method.types';

export interface Auth extends BaseEntity<string> {
  readonly userId: UserId;
  readonly type: AuthTypeValue;
  readonly provider: AuthProviderValue;
  readonly method: AuthMethodValue;
  readonly status: AuthStatusValue;
  readonly identifier: Email | Phone | string;

  /** @internal */
  readonly passwordHash?: PasswordHash;

  readonly isEmailVerified: boolean;
  readonly isPhoneVerified: boolean;
  readonly isMfaEnabled: boolean;
  readonly lastLoginAt?: string;
  readonly lastLoginIp?: string;
  readonly failedAttempts: number;
  readonly lockedUntil?: string;
}

export interface AuthPublic {
  readonly id: string;
  readonly userId: UserId;
  readonly type: AuthTypeValue;
  readonly provider: AuthProviderValue;
  readonly status: AuthStatusValue;
  readonly isEmailVerified: boolean;
  readonly isPhoneVerified: boolean;
  readonly isMfaEnabled: boolean;
  readonly lastLoginAt?: string;
}

export interface AuthResult {
  readonly success: boolean;
  readonly userId?: UserId;
  readonly sessionId?: SessionId;
  readonly accessToken?: AccessToken;
  readonly refreshToken?: RefreshToken;
  readonly expiresAt?: number;
  readonly requiresMfa?: boolean;
  readonly requiresVerification?: boolean;
  readonly error?: string;
}

export interface AuthContext {
  readonly userId: UserId;
  readonly sessionId: SessionId;
  readonly roles: readonly string[];
  readonly permissions: readonly string[];
  readonly authenticatedAt: string;
  readonly expiresAt: string;
}

export interface AuthCredentialsInput {
  readonly identifier: string;
  readonly password?: string;
  readonly otp?: string;
  readonly provider?: AuthProviderValue;
  readonly method?: AuthMethodValue;
}
