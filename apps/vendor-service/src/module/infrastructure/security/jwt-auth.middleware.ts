/**
 * JwtAuthMiddleware — verifies JWT and populates req.user
 * @module vendor-service/infrastructure/security
 *
 * Runs BEFORE guards. Uses Passport JWT strategy under the hood.
 * Skips paths marked @Public() (detected via header hint) or leaves
 * unauthenticated requests for the guard to reject.
 */
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { NextFunction, Request, Response } from 'express';
import { getOptionalEnv } from '@vubon/shared-config/common';

interface JwtPayload {
  readonly userId?: string;
  readonly roles?: readonly string[];
  readonly permissions?: readonly string[];
  readonly sessionId?: string;
  readonly exp?: number;
}

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(
    req: Request & {
      user?: {
        userId: string;
        roles: readonly string[];
        permissions: readonly string[];
        sessionId?: string;
      };
    },
    _res: Response,
    next: NextFunction,
  ): void {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      // No token — let the guard decide (Public routes will pass, protected will 401)
      next();
      return;
    }

    const token = auth.slice(7);
    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: getOptionalEnv(
          'JWT_SECRET',
          'vubon-vendor-service-dev-jwt-secret-key-32chars-minimum-ok',
        ),
      });
      if (!payload?.userId) {
        throw new UnauthorizedException('Invalid token payload');
      }
      req.user = {
        userId: payload.userId,
        roles: payload.roles ?? [],
        permissions: payload.permissions ?? [],
        sessionId: payload.sessionId,
      };
    } catch {
      // Invalid/expired token — let the guard reject (still 401)
      // Don't throw here so @Public() routes with bad tokens still work
    }
    next();
  }
}
