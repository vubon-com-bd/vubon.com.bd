/**
 * JwtStrategy — Passport JWT bearer strategy
 * @module vendor-service/infrastructure/security
 *
 * Verifies bearer token and populates request.user with:
 *   - userId
 *   - roles
 *   - permissions
 *   - sessionId
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface JwtPayload {
  readonly userId: string;
  readonly roles?: readonly string[];
  readonly permissions?: readonly string[];
  readonly sessionId?: string;
  readonly iat?: number;
  readonly exp?: number;
}

export interface AuthenticatedUser {
  readonly userId: string;
  readonly roles: readonly string[];
  readonly permissions: readonly string[];
  readonly sessionId?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getOptionalEnv(
        'JWT_SECRET',
        'vubon-vendor-service-dev-jwt-secret-key-32chars-minimum-ok',
      ),
    });
  }

  validate(payload: JwtPayload): AuthenticatedUser {
    if (!payload?.userId) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return {
      userId: payload.userId,
      roles: payload.roles ?? [],
      permissions: payload.permissions ?? [],
      sessionId: payload.sessionId,
    };
  }
}
