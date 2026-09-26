import type { AuthTokenPair } from '@vubon/shared-types/auth';
import { getJwtExpiry } from '../jwt/jwt.expiry';
import type { TokenMeta } from './token.types';

/** Extract meta from a token pair. */
export function getTokenPairMeta(pair: AuthTokenPair): {
  readonly access: TokenMeta;
  readonly refresh: TokenMeta;
} {
  const now = Math.floor(Date.now() / 1000);
  return {
    access: {
      issuedAt: now,
      expiresAt: pair.accessExpiresAt,
      tokenType: 'Bearer',
    },
    refresh: {
      issuedAt: now,
      expiresAt: pair.refreshExpiresAt,
      tokenType: 'Bearer',
    },
  };
}

/** Mask token for safe logging (first 4 + last 4). */
export function maskToken(token: string): string {
  if (token.length <= 8) return '****';
  return `${token.slice(0, 4)}...${token.slice(-4)}`;
}

/** Human-readable expiry summary. */
export function describeExpiry(expiresAt: number): string {
  const { isExpired, expiresInSeconds } = getJwtExpiry(0, expiresAt);
  if (isExpired) return 'expired';
  return `in ${expiresInSeconds}s`;
}
