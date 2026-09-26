import { Injectable, Logger, type NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class WebhookLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(WebhookLoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();
    this.logger.log(`Webhook ${req.method} ${req.originalUrl}`);

    res.on('finish', () => {
      this.logger.log(
        `Webhook ${req.method} ${req.originalUrl} → ${res.statusCode} (${Date.now() - start}ms)`,
      );
    });

    next();
  }
}
