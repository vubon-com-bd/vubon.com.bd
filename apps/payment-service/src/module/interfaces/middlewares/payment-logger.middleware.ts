import { Injectable, Logger, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class PaymentLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('PaymentLogger');

  use(req: Request, _res: Response, next: NextFunction): void {
    this.logger.log(`Payment request: ${req.method} ${req.originalUrl}`, {
      correlationId: req.headers['x-correlation-id'],
      requestId: req.headers['x-request-id'],
    });
    next();
  }
}
