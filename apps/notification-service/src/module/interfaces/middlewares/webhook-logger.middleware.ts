/**
 * WebhookLoggerMiddleware — logs inbound provider webhooks
 * @module notification-service/interfaces/middlewares
 *
 * Logs provider, event type, payload size, and response time।
 * Useful for debugging SendGrid/Twilio/FCM/APNs callbacks।
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class WebhookLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('WebhookInbound');

  use(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();
    const provider = (req.params as Record<string, string>)['provider'] ?? 'unknown';
    const contentType = req.headers['content-type'] ?? 'unknown';
    const payloadSize = Number(req.headers['content-length'] ?? 0);

    this.logger.log(
      `📥 Webhook inbound — provider=${provider} path=${req.path} size=${payloadSize}B type=${contentType}`,
    );

    res.on('finish', () => {
      const ms = Date.now() - start;
      const status = res.statusCode;
      const level = status >= 400 ? 'warn' : 'log';
      this.logger[level](
        `📤 Webhook outbound — provider=${provider} status=${status} duration=${ms}ms`,
      );
    });

    next();
  }
}
