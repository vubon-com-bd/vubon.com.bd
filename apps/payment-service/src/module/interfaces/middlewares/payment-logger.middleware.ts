/**
 * PaymentLoggerMiddleware — request lifecycle logging for payment routes
 * @module payment-service/interfaces/middlewares
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

export const CORRELATION_HEADER = 'x-correlation-id';

@Injectable()
export class PaymentLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(PaymentLoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const started = Date.now();
    const incoming = req.headers[CORRELATION_HEADER];
    const correlationId =
      typeof incoming === 'string' && incoming.length > 0
        ? incoming
        : randomUUID();

    res.setHeader(CORRELATION_HEADER, correlationId);
    (req as Request & { correlationId?: string }).correlationId = correlationId;

    res.on('finish', () => {
      const duration = Date.now() - started;
      const method = req.method;
      const url = req.originalUrl ?? req.url ?? '';
      this.logger.log(
        `[payment] ${method} ${url} — ${res.statusCode} ${duration}ms cid=${correlationId.slice(0, 8)}`,
      );
    });

    next();
  }
}
