/**
 * Auth Token Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-token.constants থেকে।
 */

import type { AUTH_TOKEN, AUTH_TOKEN_TYPE } from '@vubon/shared-constants/auth';
import type {
  UserId,
  SessionId,
  AccessToken,
  RefreshToken,
  IdToken,
  ResetToken,
  VerifyToken,
  InviteToken,
  ApiKey,
} from '../common/primitives';

export type AuthTokenTypeValue = (typeof AUTH_TOKEN_TYPE)[keyof typeof AUTH_TOKEN_TYPE];

export type AccessTokenExpiry = typeof AUTH_TOKEN.ACCESS_TOKEN_EXPIRY;
export type RefreshTokenExpiry = typeof AUTH_TOKEN.REFRESH_TOKEN_EXPIRY;

export interface AuthTokenPayload {
  readonly sub: UserId;
  readonly sid?: SessionId;
  readonly type: AuthTokenTypeValue;
  readonly iat: number;
  readonly exp: number;
  readonly iss: string;
  readonly aud?: string;
  readonly jti?: string;
  readonly scope?: readonly string[];
}

export interface AuthTokenPair {
  readonly accessToken: AccessToken;
  readonly refreshToken: RefreshToken;
  readonly accessExpiresAt: number;
  readonly refreshExpiresAt: number;
  readonly tokenType: 'Bearer';
}

export interface AuthTokenSet {
  readonly accessToken: AccessToken;
  readonly refreshToken?: RefreshToken;
  readonly idToken?: IdToken;
  readonly expiresAt: number;
}

export interface AuthTokenVerifyResult {
  readonly valid: boolean;
  readonly payload?: AuthTokenPayload;
  readonly error?: string;
  readonly expiredAt?: number;
}

export interface AuthTokenRefreshInput {
  readonly refreshToken: RefreshToken;
  readonly ipAddress?: string;
  readonly userAgent?: string;
}

export interface PasswordResetToken {
  readonly token: ResetToken;
  readonly userId: UserId;
  readonly expiresAt: string;
  readonly usedAt?: string;
}

export interface EmailVerifyToken {
  readonly token: VerifyToken;
  readonly userId: UserId;
  readonly email: string;
  readonly expiresAt: string;
  readonly verifiedAt?: string;
}

export interface InviteTokenPayload {
  readonly token: InviteToken;
  readonly email: string;
  readonly invitedBy: UserId;
  readonly role: string;
  readonly expiresAt: string;
}

export interface ApiKeyData {
  readonly key: ApiKey;
  readonly userId: UserId;
  readonly name: string;
  readonly scopes: readonly string[];
  readonly createdAt: string;
  readonly expiresAt?: string;
  readonly lastUsedAt?: string;
  readonly isActive: boolean;
}
