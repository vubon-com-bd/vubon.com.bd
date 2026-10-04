/**
 * Logger Service (NestJS injectable)
 * @module shared-kernel/infrastructure/observability
 *
 * Values আসে shared-config ও shared-constants থেকে।
 */
import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { LOGGING_CONFIG } from '@vubon/shared-config/common';
import { LOG_LEVEL } from '@vubon/shared-constants/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly levelOrder: readonly string[] = [
    LOG_LEVEL.ERROR,
    LOG_LEVEL.WARN,
    LOG_LEVEL.INFO,
    LOG_LEVEL.DEBUG,
  ];

  private shouldLog(level: string): boolean {
    const configuredIndex = this.levelOrder.indexOf(LOGGING_CONFIG.level);
    const levelIndex = this.levelOrder.indexOf(level);
    if (configuredIndex === -1) return true;
    if (levelIndex === -1) return false;
    return levelIndex <= configuredIndex;
  }

  private redact(payload: unknown): unknown {
    if (typeof payload !== 'object' || payload === null) return payload;
    const copy = { ...(payload as Record<string, unknown>) };
    for (const key of LOGGING_CONFIG.redactFields) {
      if (key in copy) copy[key] = '[REDACTED]';
    }
    return copy;
  }

  log(message: string, context?: unknown): void {
    if (this.shouldLog(LOG_LEVEL.INFO)) {
      // eslint-disable-next-line no-console
      console.log(`[INFO] ${message}`, this.redact(context));
    }
  }

  error(message: string, trace?: string, context?: unknown): void {
    if (this.shouldLog(LOG_LEVEL.ERROR)) {
      console.error(`[ERROR] ${message}`, trace, this.redact(context));
    }
  }

  warn(message: string, context?: unknown): void {
    if (this.shouldLog(LOG_LEVEL.WARN)) {
      console.warn(`[WARN] ${message}`, this.redact(context));
    }
  }

  debug(message: string, context?: unknown): void {
    if (this.shouldLog(LOG_LEVEL.DEBUG)) {
      // eslint-disable-next-line no-console
      console.debug(`[DEBUG] ${message}`, this.redact(context));
    }
  }

  verbose(message: string, context?: unknown): void {
    this.debug(message, context);
  }
}
