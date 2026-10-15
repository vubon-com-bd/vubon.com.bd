/**
 * GuestTokenMiddleware — normalizes X-Guest-Token header
 * @module cart-service/interfaces/middlewares
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

export const GUEST_TOKEN_MW_HEADER = 'x-guest-token';

@Injectable()
export class GuestTokenMiddleware implements NestMiddleware {
  use(
    req: Request & { guestToken?: string },
    _res: Response,
    next: NextFunction,
  ): void {
    const raw =
      (req.headers[GUEST_TOKEN_MW_HEADER] as string | undefined) ??
      (req.headers['guest-token'] as string | undefined) ??
      (req.body as { guestToken?: string } | undefined)?.guestToken;

    if (raw) req.guestToken = raw;
    next();
  }
}
