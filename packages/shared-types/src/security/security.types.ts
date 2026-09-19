/**
 * Security Policy Types
 * @module shared-types/security
 *
 * Values আসে shared-constants/security/security.constants থেকে।
 */

import type { SECURITY } from '@vubon/shared-constants/security';
import type { PasswordHash, AccessToken, RefreshToken, ApiKey } from '../common/primitives';

export type BcryptRounds = typeof SECURITY.BCRYPT_ROUNDS;
export type JwtAlgorithm = typeof SECURITY.JWT_ALGORITHM;
export type EncryptionAlgorithm = typeof SECURITY.ENCRYPTION_ALGORITHM;

export interface SecurityPolicy {
  readonly passwordMinLength: number;
  readonly passwordMaxLength: number;
  readonly requireUppercase: boolean;
  readonly requireLowercase: boolean;
  readonly requireNumber: boolean;
  readonly requireSymbol: boolean;
  readonly bcryptRounds: number;
  readonly jwtAlgorithm: string;
  readonly maxLoginAttempts: number;
  readonly lockoutDurationSeconds: number;
}

export interface PasswordPolicy extends SecurityPolicy {
  readonly passwordHistoryCount: number;
  readonly passwordExpiryDays: number;
}

export interface JwtPayload {
  readonly sub: string;
  readonly iat: number;
  readonly exp: number;
  readonly iss: string;
  readonly aud?: string;
  readonly jti?: string;
  readonly scope?: readonly string[];
}

export interface JwtConfig {
  readonly algorithm: JwtAlgorithm;
  readonly accessExpiry: string;
  readonly refreshExpiry: string;
  readonly issuer: string;
  readonly audience: string;
}

export interface AuthCredentials {
  readonly accessToken: AccessToken;
  readonly refreshToken?: RefreshToken;
  readonly expiresAt: number;
}

export interface ApiKeyPair {
  readonly apiKey: ApiKey;
  readonly secretHash: PasswordHash;
}

export interface EncryptionConfig {
  readonly algorithm: EncryptionAlgorithm;
  readonly ivLength: number;
  readonly saltLength: number;
  readonly keyLength: number;
}

export interface RateLimitConfig {
  readonly windowSeconds: number;
  readonly maxRequests: number;
  readonly burstLimit?: number;
}

export interface SecurityHeaders {
  readonly xFrameOptions: string;
  readonly xContentTypeOptions: string;
  readonly strictTransportSecurity: string;
  readonly contentSecurityPolicy?: string;
}
