/**
 * GuestTokenMiddleware — ensures X-Guest-Token header
 * @module cart-service/interfaces/middlewares
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class GuestTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const existing = req.header('x-guest-token');
    if (!existing) {
      const token = this.generateToken();
      req.headers['x-guest-token'] = token;
      res.setHeader('x-guest-token', token);
    }
    next();
  }

  private generateToken(): string {
    return Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 16).toString(16),
    ).join('');
  }
}
