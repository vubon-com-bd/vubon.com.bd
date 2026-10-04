import type { AuthTokenPayload } from '@vubon/shared-types/auth';

/**
 * Decoded JWT payload shape.
 * Reuses AuthTokenPayload from shared-types.
 */
export type JwtPayload = AuthTokenPayload;

export interface JwtDecodeResult {
  readonly header: Record<string, unknown>;
  readonly payload: JwtPayload | null;
  readonly signature: string;
  readonly raw: string;
}

export interface JwtExpiryInfo {
  readonly expiresAt: number;
  readonly issuedAt: number;
  readonly expiresInSeconds: number;
  readonly isExpired: boolean;
}
