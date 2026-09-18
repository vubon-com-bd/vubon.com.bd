/**
 * Correlation ID Middleware
 * @module shared-kernel/interfaces/middlewares
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { generateUuid } from '@vubon/shared-utils/infrastructure';

export const CORRELATION_HEADER = 'x-correlation-id';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const incoming = req.headers[CORRELATION_HEADER];
    const id = typeof incoming === 'string' && incoming.length > 0 ? incoming : generateUuid();
    res.setHeader(CORRELATION_HEADER, id);
    (req as Request & { correlationId?: string }).correlationId = id;
    next();
  }
}
