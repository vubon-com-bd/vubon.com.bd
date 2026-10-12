/**
 * Event Tracking Middleware
 * @module analytics-service/interfaces/middlewares
 *
 * Captures request context (URL, method, user, IP, user-agent) into
 * `request.analyticsContext` for downstream controllers/handlers.
 *
 * Uses lazy dynamic import of analytics event tracker if available — no
 * direct infra coupling in this middleware.
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

export interface AnalyticsRequestContext {
  readonly method: string;
  readonly path: string;
  readonly userAgent?: string;
  readonly ip?: string;
  readonly userId?: string;
  readonly sessionId?: string;
  readonly receivedAt: string;
}

type RequestWithAnalytics = Request & {
  analyticsContext?: AnalyticsRequestContext;
  correlationId?: string;
  user?: { userId?: string; sessionId?: string };
};

@Injectable()
export class EventTrackingMiddleware implements NestMiddleware {
  use(req: RequestWithAnalytics, _res: Response, next: NextFunction): void {
    const userAgent = req.headers['user-agent'];
    const forwardedFor = req.headers['x-forwarded-for'];

    const ip =
      (typeof forwardedFor === 'string' ? forwardedFor.split(',')[0].trim() : undefined) ??
      req.socket?.remoteAddress ??
      undefined;

    req.analyticsContext = Object.freeze({
      method: req.method,
      path: req.originalUrl ?? req.url,
      userAgent: typeof userAgent === 'string' ? userAgent : undefined,
      ip,
      userId: req.user?.userId,
      sessionId: req.user?.sessionId,
      receivedAt: new Date().toISOString(),
    });

    next();
  }
}
