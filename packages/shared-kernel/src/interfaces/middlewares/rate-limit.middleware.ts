import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private static requests: Map<string, { count: number; resetTime: number }> = new Map();

  use(req: Request, res: Response, next: NextFunction): void {
    const ip = req.ip || req.connection?.remoteAddress || 'unknown';
    const key = `${ip}-${req.route?.path || req.path}`;
    const now = Date.now();
    const windowMs = 60000; // 1 minute
    const maxRequests = 100;

    const record = RateLimitMiddleware.requests.get(key);

    if (!record || now > record.resetTime) {
      RateLimitMiddleware.requests.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });
      next();
      return;
    }

    if (record.count >= maxRequests) {
      throw new HttpException('Too many requests', HttpStatus.TOO_MANY_REQUESTS);
    }

    record.count++;
    RateLimitMiddleware.requests.set(key, record);
    next();
  }

  static clear(): void {
    RateLimitMiddleware.requests.clear();
  }
}
