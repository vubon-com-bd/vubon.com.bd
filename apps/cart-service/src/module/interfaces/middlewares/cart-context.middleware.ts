import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class CartContextMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction): void {
    const cartId =
      (req.params?.['cartId'] as string | undefined) ??
      (req.body as { cartId?: string } | undefined)?.cartId;
    if (cartId) {
      (req as Request & { cartId?: string }).cartId = cartId;
    }
    next();
  }
}
