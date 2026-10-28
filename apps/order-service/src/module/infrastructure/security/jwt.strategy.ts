/**
 * JwtStrategy — Passport JWT bearer strategy
 * @module order-service/infrastructure/security
 *
 * Verifies bearer token and populates request.user with:
 *   - userId (from payload.sub)
 *   - sessionId (from payload.sid)
 *   - roles
 *   - permissions
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface JwtPayload {
  readonly sub: string;
  readonly sid?: string;
  readonly roles?: readonly string[];
  readonly permissions?: readonly string[];
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
        'GV6ZE+3Ot8eSkzyWLJp5yaD0iV/7/Ip37l/Oh84KLXVxm1z1EqfguOYG0+TnPk35',
      ),
    });
  }

  validate(payload: JwtPayload): AuthenticatedUser {
    if (!payload?.sub) {
      throw new UnauthorizedException('Invalid token payload: missing sub');
    }
    return {
      userId: payload.sub,
      roles: payload.roles ?? [],
      permissions: payload.permissions ?? [],
      sessionId: payload.sid,
    };
  }
}
