import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, type StrategyOptionsWithoutRequest } from 'passport-jwt';
import type { AuthTokenPayload } from '@vubon/shared-types/auth';
import { JWT_CONFIG } from '@vubon/shared-config/security/jwt';
import { getJwtSecret } from '../../server/jwt/jwt-secret';
import { InvalidTokenError } from '../../common/errors/invalid-token-error';

/** Refresh-token strategy — extracts token from cookie OR body. */
@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    const options: StrategyOptionsWithoutRequest = {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: unknown): string | null => {
          const r = req as { cookies?: Record<string, string> } | undefined;
          return r?.cookies?.['refresh_token'] ?? null;
        },
        ExtractJwt.fromBodyField('refreshToken'),
      ]),
      ignoreExpiration: false,
      secretOrKey: getJwtSecret(),
      issuer: JWT_CONFIG.issuer,
      audience: JWT_CONFIG.audience,
      algorithms: [JWT_CONFIG.algorithm as never],
    };
    super(options);
  }

  validate(payload: AuthTokenPayload): AuthTokenPayload {
    if (payload.type !== 'refresh') {
      throw new InvalidTokenError('Expected refresh token');
    }
    return payload;
  }
}
