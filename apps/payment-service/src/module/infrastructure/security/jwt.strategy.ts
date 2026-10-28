/**
 * JwtStrategy — validate cross-service JWT tokens
 * @module payment-service/infrastructure/security
 *
 * Uses unified JWT_SECRET shared across all services.
 * Identity service issues tokens; all services validate them.
 */
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface JwtPayload {
  readonly sub: string;
  readonly sid: string;
  readonly type: string;
  readonly scope?: readonly string[];
  readonly iat: number;
  readonly exp: number;
  readonly aud?: string;
  readonly iss?: string;
}

export interface AuthenticatedUser {
  readonly userId: string;
  readonly sessionId: string;
  readonly type: string;
  readonly scope: readonly string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getOptionalEnv('JWT_SECRET', 'dev-jwt-secret-change-in-prod'),
      audience: getOptionalEnv('JWT_AUDIENCE', 'vubon-client'),
      issuer: getOptionalEnv('JWT_ISSUER', 'vubon-api'),
    });
    this.logger.log('✅ JWT Strategy registered');
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    return {
      userId: payload.sub,
      sessionId: payload.sid,
      type: payload.type,
      scope: payload.scope ?? [],
    };
  }
}
