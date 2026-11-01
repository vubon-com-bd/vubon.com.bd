/**
 * CartContextMiddleware — attaches cart context to request
 * @module cart-service/interfaces/middlewares
 *
 * Adds req.cartContext with correlationId + guestToken + userId.
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

export interface CartRequestContext {
  readonly correlationId?: string;
  readonly guestToken?: string;
  readonly userId?: string;
  readonly cartId?: string;
  readonly startedAt: number;
}

export const CART_CONTEXT_KEY = 'cartContext';

@Injectable()
export class CartContextMiddleware implements NestMiddleware {
  use(
    req: Request & {
      [CART_CONTEXT_KEY]?: CartRequestContext;
      correlationId?: string;
      guestToken?: string;
      user?: { userId?: string };
      params?: Record<string, string>;
    },
    _res: Response,
    next: NextFunction,
  ): void {
    const context: CartRequestContext = {
      correlationId: req.correlationId,
      guestToken: req.guestToken,
      userId: req.user?.userId,
      cartId: req.params?.['cartId'] ?? req.params?.['id'],
      startedAt: Date.now(),
    };

    Object.defineProperty(req, CART_CONTEXT_KEY, {
      value: context,
      writable: false,
      enumerable: true,
      configurable: true,
    });

    next();
  }
}
