import type { JwtExpiryInfo } from './jwt.types';

/** Compute expiry info from a JWT payload. */
export function getJwtExpiry(issuedAt: number, expiresAt: number): JwtExpiryInfo {
  const now = Math.floor(Date.now() / 1000);
  return {
    issuedAt,
    expiresAt,
    expiresInSeconds: Math.max(expiresAt - now, 0),
    isExpired: expiresAt <= now,
  };
}

/** True if `expiresAt` (seconds) is within `thresholdSeconds` of now. */
export function isExpiringSoon(expiresAt: number, thresholdSeconds = 60): boolean {
  const now = Math.floor(Date.now() / 1000);
  return expiresAt - now <= thresholdSeconds;
}
