/**
 * IdempotencyMiddleware — normalizes Idempotency-Key header
 * @module identity-service/interfaces/middlewares
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

export const IDEMPOTENCY_KEY_HEADER = 'idempotency-key';

export interface IdempotentRequest extends Request {
  idempotencyKey?: string;
}

@Injectable()
export class IdempotencyMiddleware implements NestMiddleware {
  use(req: IdempotentRequest, _res: Response, next: NextFunction): void {
    const raw =
      (req.headers[IDEMPOTENCY_KEY_HEADER] as string | undefined) ??
      (req.headers['x-idempotency-key'] as string | undefined);

    if (raw && raw.length > 0 && raw.length <= 255) {
      req.idempotencyKey = raw;
    }
    next();
  }
}
