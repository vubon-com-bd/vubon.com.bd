import { decodeJwt } from './jwt.parser';
import { isExpiringSoon } from './jwt.expiry';
import type { JwtServiceContract } from './jwt.service.interface';
import type { AuthTokenPayload } from '@vubon/shared-types/auth';

/**
 * Client-safe JWT service.
 * ⚠️ Decode-only. NEVER verifies signature.
 * Server MUST use `@vubon/shared-auth/server` for verification.
 */
export class CommonJwtService implements JwtServiceContract {
  decode(token: string): AuthTokenPayload | null {
    try {
      return decodeJwt(token).payload;
    } catch {
      return null;
    }
  }

  extractExpiry(token: string): number | null {
    const payload = this.decode(token);
    return payload?.exp ?? null;
  }

  isExpired(token: string, skewSeconds = 0): boolean {
    const exp = this.extractExpiry(token);
    if (exp === null) return true;
    return isExpiringSoon(exp, -skewSeconds);
  }
}

export const commonJwtService = new CommonJwtService();
