/**
 * CartContextMiddleware — attaches cart context (user/guest) to request
 * @module cart-service/interfaces/middlewares
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

export interface CartContext {
  readonly userId?: string;
  readonly guestToken?: string;
  readonly isGuest: boolean;
}

@Injectable()
export class CartContextMiddleware implements NestMiddleware {
  use(req: Request & { cartContext?: CartContext }, _res: Response, next: NextFunction): void {
    const user = (req as { user?: { userId?: string } }).user;
    const guestToken = req.header('x-guest-token');
    req.cartContext = {
      userId: user?.userId,
      guestToken,
      isGuest: !user?.userId,
    };
    next();
  }
}
