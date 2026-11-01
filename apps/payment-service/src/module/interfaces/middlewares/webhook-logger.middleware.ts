/**
 * WebhookLoggerMiddleware — structured logging for webhook routes
 * @module payment-service/interfaces/middlewares
 *
 * Logs provider, event type, and payload size for every webhook request.
 * Runs before signature verification so failures are also captured.
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class WebhookLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(WebhookLoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const started = Date.now();
    const url = req.url ?? '';
    const provider = url.match(/\/webhooks\/([a-z0-9-]+)/i)?.[1] ?? 'unknown';
    const signature = this.extractSignature(req);

    res.on('finish', () => {
      const duration = Date.now() - started;
      this.logger.log(
        `[webhook] provider=${provider} status=${res.statusCode} ${duration}ms ` +
          `sig=${signature ? 'yes' : 'no'}`,
      );
    });

    next();
  }

  private extractSignature(req: Request): string | undefined {
    const names = [
      'x-signature',
      'x-bkash-signature',
      'stripe-signature',
      'paypal-transmission-sig',
    ];
    for (const name of names) {
      const raw = req.headers[name];
      if (typeof raw === 'string' && raw.length > 0) return raw;
    }
    return undefined;
  }
}
