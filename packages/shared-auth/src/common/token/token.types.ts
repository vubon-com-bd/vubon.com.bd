import type { AuthTokenPair, AuthTokenVerifyResult } from '@vubon/shared-types/auth';

export type TokenPair = AuthTokenPair;
export type TokenVerifyResult = AuthTokenVerifyResult;

export interface TokenMeta {
  readonly issuedAt: number;
  readonly expiresAt: number;
  readonly tokenType: 'Bearer';
  readonly jti?: string;
}

export interface TokenRotationResult {
  readonly newPair: AuthTokenPair;
  readonly rotatedAt: number;
  readonly familyId: string;
}
