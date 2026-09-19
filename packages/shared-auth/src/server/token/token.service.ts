import type { AuthTokenPair, AuthTokenPayload } from '@vubon/shared-types/auth';
import { verifyJwt } from '../jwt/jwt-verifier';
import { signAccessToken } from './access-token';
import { signRefreshToken } from './refresh-token';
import type { IssuePairInput, TokenServiceContract } from './token.service.interface';

/**
 * Server-side token service.
 * ⚠️ SERVER-ONLY.
 */
export class TokenService implements TokenServiceContract {
  issuePair(input: IssuePairInput): AuthTokenPair {
    const access = signAccessToken(input);
    const refresh = signRefreshToken(input);
    return {
      accessToken: access.token,
      refreshToken: refresh.token,
      accessExpiresAt: access.expiresAt,
      refreshExpiresAt: refresh.expiresAt,
      tokenType: 'Bearer',
    };
  }

  verifyAccess(token: string): AuthTokenPayload {
    const payload = verifyJwt(token);
    if (payload.type !== 'access') {
      throw new Error(`Expected access token, got "${payload.type}"`);
    }
    return payload;
  }

  verifyRefresh(token: string): AuthTokenPayload {
    const payload = verifyJwt(token);
    if (payload.type !== 'refresh') {
      throw new Error(`Expected refresh token, got "${payload.type}"`);
    }
    return payload;
  }
}

export const tokenService = new TokenService();
