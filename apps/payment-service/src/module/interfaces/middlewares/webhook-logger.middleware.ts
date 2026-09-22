import { Injectable, Logger, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class WebhookLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('WebhookLogger');

  use(req: Request, _res: Response, next: NextFunction): void {
    this.logger.log(`Webhook received: ${req.method} ${req.originalUrl}`, {
      gateway: req.params?.gateway ?? 'unknown',
      hasSignature: Boolean(req.headers['x-webhook-signature']),
      correlationId: req.headers['x-correlation-id'],
    });
    next();
  }
}
