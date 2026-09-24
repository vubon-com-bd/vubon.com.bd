import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class EventTrackingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(EventTrackingMiddleware.name);

  use(req: Request, _res: Response, next: NextFunction): void {
    if (req.method !== 'GET') {
      this.logger.debug(
        `Trackable action: ${req.method} ${req.originalUrl}`,
      );
    }
    next();
  }
}
