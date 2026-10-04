/**
 * CorrelationIdMiddleware — ensures every request has x-correlation-id
 * @module payment-service/interfaces/middlewares
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { generateUuid } from '@vubon/shared-utils/infrastructure';

export const CORRELATION_ID_HEADER = 'x-correlation-id';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const id =
      (req.headers[CORRELATION_ID_HEADER] as string | undefined) ?? generateUuid();
    res.setHeader(CORRELATION_ID_HEADER, id);
    next();
  }
}
