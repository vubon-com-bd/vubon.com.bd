import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { type Observable, tap } from 'rxjs';

export interface BaseInterceptorHooks<T> {
  before?(context: ExecutionContext): void | Promise<void>;
  after?(value: T, context: ExecutionContext): void | Promise<void>;
  error?(err: unknown, context: ExecutionContext): void | Promise<void>;
}

/**
 * Base interceptor with before/after/error hooks.
 */
export abstract class BaseInterceptor<T = unknown> implements NestInterceptor<T, T> {
  protected hooks: BaseInterceptorHooks<T> = {};

  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    return next.handle().pipe(
      tap({
        next: (value: T) => {
          void this.hooks.after?.(value, _context);
        },
        error: (err: unknown) => {
          void this.hooks.error?.(err, _context);
        },
      })
    );
  }
}
