import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, type StrategyOptionsWithoutRequest } from 'passport-jwt';
import type { AuthContext, AuthTokenPayload } from '@vubon/shared-types/auth';
import { JWT_CONFIG } from '@vubon/shared-config/security/jwt';
import { getJwtSecret } from '../../server/jwt/jwt-secret';

/**
 * Server-side JWT strategy for NestJS.
 * ⚠️ SERVER-ONLY.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const options: StrategyOptionsWithoutRequest = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: JWT_CONFIG.ignoreExpiration,
      secretOrKey: getJwtSecret(),
      issuer: JWT_CONFIG.issuer,
      audience: JWT_CONFIG.audience,
      algorithms: [JWT_CONFIG.algorithm as never],
    };
    super(options);
  }

  validate(payload: AuthTokenPayload): AuthContext {
    return {
      userId: payload.sub,
      sessionId: payload.sid ?? ('' as AuthContext['sessionId']),
      roles: [],
      permissions: [],
      authenticatedAt: new Date((payload.iat ?? 0) * 1000).toISOString(),
      expiresAt: new Date((payload.exp ?? 0) * 1000).toISOString(),
    };
  }
}
