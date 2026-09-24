import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class QueryTimerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(QueryTimerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      if (duration > 1000) {
        this.logger.warn(
          `Slow request: ${req.method} ${req.originalUrl} - ${duration}ms`,
        );
      }
    });
    next();
  }
}
