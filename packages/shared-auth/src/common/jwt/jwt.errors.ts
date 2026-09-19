import { InvalidTokenError } from '../errors/invalid-token-error';
import { TokenExpiredError } from '../errors/token-expired-error';

/** Throw if token is malformed. */
export function assertWellFormedJwt(token: string): void {
  if (typeof token !== 'string' || token.split('.').length !== 3) {
    throw new InvalidTokenError('JWT is not well-formed');
  }
}

/** Throw if payload.exp is in the past. */
export function assertNotExpired(exp: number | undefined, skewSeconds = 0): void {
  if (exp === undefined) throw new InvalidTokenError('Missing exp claim');
  const now = Math.floor(Date.now() / 1000);
  if (exp + skewSeconds < now) throw new TokenExpiredError(exp);
}
