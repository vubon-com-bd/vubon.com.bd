/**
 * CorrelationIdMiddleware — propagates x-correlation-id
 * @module vendor-service/interfaces/middlewares
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

export const CORRELATION_HEADER = 'x-correlation-id';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(
    req: Request & { correlationId?: string },
    res: Response,
    next: NextFunction,
  ): void {
    const incoming = req.headers[CORRELATION_HEADER];
    const id =
      typeof incoming === 'string' && incoming.length > 0
        ? incoming
        : randomUUID();
    res.setHeader(CORRELATION_HEADER, id);
    req.correlationId = id;
    next();
  }
}
