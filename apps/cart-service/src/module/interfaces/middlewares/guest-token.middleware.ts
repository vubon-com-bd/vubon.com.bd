import { Injectable, Logger, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class GuestTokenMiddleware implements NestMiddleware {
  private readonly logger = new Logger(GuestTokenMiddleware.name);

  use(req: Request, _res: Response, next: NextFunction): void {
    const token = req.headers['x-guest-token'];
    if (!token) {
      this.logger.debug('No guest token present');
    }
    next();
  }
}
