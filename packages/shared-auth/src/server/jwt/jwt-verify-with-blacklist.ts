import { InvalidTokenError } from '../../common/errors/invalid-token-error';
import type { AuthTokenPayload } from '@vubon/shared-types/auth';
import { jwtBlacklist, type JwtBlacklistStore } from './jwt-blacklist';
import { verifyJwt } from './jwt-verifier';

/**
 * Verify JWT + reject revoked (blacklisted) tokens.
 * Use this everywhere except in the refresh flow.
 */
export async function verifyJwtWithBlacklist(
  token: string,
  store: JwtBlacklistStore = jwtBlacklist
): Promise<AuthTokenPayload> {
  const payload = verifyJwt(token);
  if (payload.jti) {
    const revoked = await store.has(payload.jti);
    if (revoked) throw new InvalidTokenError('Token has been revoked');
  }
  return payload;
}
