/**
 * IdempotencyMiddleware — normalizes Idempotency-Key header
 * @module notification-service/interfaces/middlewares
 *
 * Attaches req.idempotencyKey from header so controllers can access it
 * via @IdempotencyHeader() decorator।
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

export const IDEMPOTENCY_KEY_HEADER = 'idempotency-key';
const MAX_KEY_LENGTH = 128;

declare module 'express-serve-static-core' {
  interface Request {
    idempotencyKey?: string;
  }
}

@Injectable()
export class IdempotencyMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction): void {
    const raw =
      req.headers[IDEMPOTENCY_KEY_HEADER] ??
      req.headers['x-idempotency-key'] ??
      req.headers['Idempotency-Key'];

    let key: string | undefined;
    if (Array.isArray(raw)) {
      key = raw[0];
    } else if (typeof raw === 'string') {
      key = raw;
    }

    if (key) {
      // Trim + max length
      const normalized = key.trim().slice(0, MAX_KEY_LENGTH);
      if (normalized.length > 0) {
        req.idempotencyKey = normalized;
      }
    }

    next();
  }
}
