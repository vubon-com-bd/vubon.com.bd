/**
 * Security Headers Middleware
 * @module shared-kernel/interfaces/middlewares
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

@Injectable()
export class SecurityHeadersMiddleware implements NestMiddleware {
  use(_req: Request, res: Response, next: NextFunction): void {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.status(HTTP_STATUS.OK);
    next();
  }
}
