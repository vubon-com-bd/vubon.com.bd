/**
 * IdempotencyMiddleware — normalizes Idempotency-Key header
 * @module vendor-service/interfaces/middlewares
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

export const IDEMPOTENCY_KEY_HEADER = 'idempotency-key';

@Injectable()
export class IdempotencyMiddleware implements NestMiddleware {
  use(
    req: Request & { idempotencyKey?: string },
    _res: Response,
    next: NextFunction,
  ): void {
    const key =
      (req.headers[IDEMPOTENCY_KEY_HEADER] as string | undefined) ??
      (req.headers['x-idempotency-key'] as string | undefined);
    if (key) req.idempotencyKey = key;
    next();
  }
}
