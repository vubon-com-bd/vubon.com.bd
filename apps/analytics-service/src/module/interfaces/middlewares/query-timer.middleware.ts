/**
 * Query Timer Middleware
 * @module analytics-service/interfaces/middlewares
 *
 * Attaches `x-analytics-duration-ms` response header + logs slow requests.
 * Threshold configurable via ANALYTICS_SLOW_QUERY_MS (default 1000ms)।
 */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

type RequestWithTimer = Request & {
  correlationId?: string;
  user?: { userId?: string };
};

@Injectable()
export class QueryTimerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('AnalyticsQueryTimer');
  private readonly slowThresholdMs = getOptionalEnvInt(
    'ANALYTICS_SLOW_QUERY_MS',
    1000
  );
  private readonly enabled = getOptionalEnv('ANALYTICS_QUERY_TIMER', 'true') === 'true';

  use(req: RequestWithTimer, res: Response, next: NextFunction): void {
    if (!this.enabled) {
      next();
      return;
    }

    const started = process.hrtime.bigint();

    res.on('finish', () => {
      const endedNs = process.hrtime.bigint();
      const durationMs = Number(endedNs - started) / 1_000_000;

      // Duration header
      res.setHeader('x-analytics-duration-ms', durationMs.toFixed(2));

      if (durationMs >= this.slowThresholdMs) {
        const cid = req.correlationId ?? '-';
        const userId = req.user?.userId ?? 'anonymous';
        this.logger.warn(
          `🐢 SLOW [${cid}] ${req.method} ${req.originalUrl} — ${durationMs.toFixed(2)}ms (user=${userId})`
        );
      }
    });

    next();
  }
}
