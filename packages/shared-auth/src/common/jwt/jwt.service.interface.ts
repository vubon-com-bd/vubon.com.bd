import type { AuthTokenPayload } from '@vubon/shared-types/auth';

/**
 * Common JWT service contract (client-safe).
 * ⚠️ Sign is server-only. Verify is server-only.
 * Client uses decode-only.
 */
export interface JwtServiceContract {
  decode(token: string): AuthTokenPayload | null;
  extractExpiry(token: string): number | null;
  isExpired(token: string, skewSeconds?: number): boolean;
}
