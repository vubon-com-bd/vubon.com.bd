/**
 * Query Timeout Interceptor
 * @module analytics-service/interfaces/interceptors
 *
 * Analytics queries must not hang indefinitely।
 * Fails with 504 if the request exceeds the configured timeout।
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Observable } from 'rxjs';
import { throwError, TimeoutError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';
import { SetMetadata } from '@nestjs/common';

export const ANALYTICS_TIMEOUT_META_KEY = 'analytics_query_timeout_ms';
export const DEFAULT_ANALYTICS_TIMEOUT_MS = 30_000;

/**
 * Decorator: @AnalyticsTimeout(15000) — override default timeout in ms
 */
export const AnalyticsTimeout = (ms: number): MethodDecorator =>
  SetMetadata(ANALYTICS_TIMEOUT_META_KEY, ms);

@Injectable()
export class QueryTimeoutInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const customMs = this.reflector.getAllAndOverride<number>(
      ANALYTICS_TIMEOUT_META_KEY,
      [context.getHandler(), context.getClass()]
    );
    const ms = customMs && customMs > 0 ? customMs : DEFAULT_ANALYTICS_TIMEOUT_MS;

    return next.handle().pipe(
      timeout(ms),
      catchError((err: unknown) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () =>
              new RequestTimeoutException({
                statusCode: HTTP_STATUS.REQUEST_TIMEOUT,
                code: ERROR_CODE.SERVER_TIMEOUT,
                message: `Analytics query timed out after ${ms}ms`,
              })
          );
        }
        return throwError(() => err);
      })
    );
  }
}
