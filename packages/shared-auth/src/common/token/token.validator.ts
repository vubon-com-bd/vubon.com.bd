import type { AuthTokenPayload } from '@vubon/shared-types/auth';
import { assertNotExpired, assertWellFormedJwt } from '../jwt/jwt.errors';
import { decodeJwt } from '../jwt/jwt.parser';
import type { TokenVerifyResult } from './token.types';

/**
 * CLIENT-SAFE verification.
 * Only checks structure + expiry. Does NOT verify signature.
 * Server MUST use jsonwebtoken.verify in `server/`.
 */
export function validateTokenShape(token: string): TokenVerifyResult {
  try {
    assertWellFormedJwt(token);
    const { payload } = decodeJwt(token);
    if (!payload) {
      return { valid: false, error: 'Missing payload' };
    }
    assertNotExpired(payload.exp);
    return { valid: true, payload: payload as AuthTokenPayload };
  } catch (err) {
    const expiredAt =
      err instanceof Error && 'expiredAt' in err
        ? ((err as { expiredAt?: number }).expiredAt ?? undefined)
        : undefined;
    return {
      valid: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      expiredAt,
    };
  }
}
