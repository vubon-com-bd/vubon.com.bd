import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class WebhookLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(WebhookLoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();
    this.logger.debug(`Webhook incoming: ${req.method} ${req.originalUrl}`);

    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.debug(
        `Webhook completed: ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`,
      );
    });

    next();
  }
}
