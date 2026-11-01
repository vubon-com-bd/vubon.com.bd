/**
 * JWT Strategy — Passport strategy
 * @module logistics-service/infrastructure/security
 */
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  readonly sub: string;
  readonly email?: string;
  readonly roles?: readonly string[];
  readonly permissions?: readonly string[];
  readonly type?: string;
  readonly iat?: number;
  readonly exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    const secret = process.env['JWT_SECRET'];
    if (!secret) throw new Error('JWT_SECRET is not set in environment');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    if (!payload?.sub) {
      this.logger.warn('JWT payload missing subject (sub)');
      throw new UnauthorizedException('Invalid token payload');
    }
    return payload;
  }
}
