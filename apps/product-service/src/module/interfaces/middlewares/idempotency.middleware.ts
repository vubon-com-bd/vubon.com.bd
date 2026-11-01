/**
 * IdempotencyMiddleware — normalizes Idempotency-Key header
 * @module product-service/interfaces/middlewares
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

export const MW_IDEMPOTENCY_KEY_HEADER = 'idempotency-key';
export const MW_X_IDEMPOTENCY_KEY_HEADER = 'x-idempotency-key';

export interface RequestWithIdempotency extends Request {
  idempotencyKey?: string;
}

@Injectable()
export class IdempotencyMiddleware implements NestMiddleware {
  use(
    req: RequestWithIdempotency,
    _res: Response,
    next: NextFunction,
  ): void {
    const key =
      (req.headers[MW_IDEMPOTENCY_KEY_HEADER] as string | undefined) ??
      (req.headers[MW_X_IDEMPOTENCY_KEY_HEADER] as string | undefined);
    if (key) req.idempotencyKey = key;
    next();
  }
}
