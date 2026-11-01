import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '@vubon/shared-config/security/jwt';
import type { AuthTokenPayload } from '@vubon/shared-types/auth';
import { InvalidTokenError } from '../../common/errors/invalid-token-error';
import { TokenExpiredError } from '../../common/errors/token-expired-error';
import { getJwtSecret, getPreviousJwtSecret } from './jwt-secret';

/**
 * Verify a JWT. Tries current secret, then previous (rotation).
 * ⚠️ SERVER-ONLY.
 */
export function verifyJwt(token: string): AuthTokenPayload {
  const options: jwt.VerifyOptions = {
    algorithms: [JWT_CONFIG.algorithm as jwt.Algorithm],
    issuer: JWT_CONFIG.issuer,
    audience: JWT_CONFIG.audience,
    clockTolerance: JWT_CONFIG.clockToleranceSeconds,
    ignoreExpiration: JWT_CONFIG.ignoreExpiration,
    ignoreNotBefore: JWT_CONFIG.ignoreNotBefore,
  };

  const tryVerify = (secret: string): AuthTokenPayload => {
    const decoded = jwt.verify(token, secret, options);
    if (typeof decoded === 'string') {
      throw new InvalidTokenError('JWT decoded to string');
    }
    return decoded as unknown as AuthTokenPayload;
  };

  try {
    return tryVerify(getJwtSecret());
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      const decoded = jwt.decode(token) as { exp?: number } | null;
      throw new TokenExpiredError(decoded?.exp);
    }
    const prev = getPreviousJwtSecret();
    if (prev) {
      try {
        return tryVerify(prev);
      } catch {
        // fall through
      }
    }
    throw new InvalidTokenError(err instanceof Error ? err.message : 'JWT verify failed', err);
  }
}

/** Decode without verifying (server-side introspection only). */
export function decodeJwtServer(token: string): AuthTokenPayload | null {
  const decoded = jwt.decode(token);
  if (!decoded || typeof decoded === 'string') return null;
  return decoded as unknown as AuthTokenPayload;
}
