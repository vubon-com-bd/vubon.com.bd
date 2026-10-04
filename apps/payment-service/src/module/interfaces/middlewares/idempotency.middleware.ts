/**
 * IdempotencyMiddleware — reads Idempotency-Key header and stashes it
 * on the request object for downstream handlers.
 * @module payment-service/interfaces/middlewares
 *
 * NOTE: Actual dedup happens in PaymentService via IdempotencyCacheRepository.
 * This middleware only normalizes the header name into the standard place.
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

export const IDEMPOTENCY_KEY_HEADER = 'idempotency-key';

@Injectable()
export class IdempotencyMiddleware implements NestMiddleware {
  use(req: Request & { idempotencyKey?: string }, _res: Response, next: NextFunction): void {
    const key =
      (req.headers[IDEMPOTENCY_KEY_HEADER] as string | undefined) ??
      (req.headers['x-idempotency-key'] as string | undefined);
    if (key) req.idempotencyKey = key;
    next();
  }
}
