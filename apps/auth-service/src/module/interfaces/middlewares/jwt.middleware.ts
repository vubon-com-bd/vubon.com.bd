import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '@vubon/shared-config/security';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  private readonly logger = new Logger(JwtMiddleware.name);

  use(req: any, _res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];
    if (!authHeader || typeof authHeader !== 'string') return next();

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) return next();

    try {
      const payload = jwt.verify(token, JWT_CONFIG.secret, {
        issuer: JWT_CONFIG.issuer,
        audience: JWT_CONFIG.audience,
      }) as any;

      req.user = { userId: payload.sub, sessionId: payload.jti };
      this.logger.log(`✅ User set: ${payload.sub}`);
    } catch (err) {
      this.logger.error(`❌ JWT fail: ${(err as Error).message}`);
    }
    next();
  }
}
