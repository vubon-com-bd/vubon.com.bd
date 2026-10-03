/**
 * Timeout Interceptor
 * @module shared-kernel/interfaces/interceptors
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { throwError, TimeoutError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly defaultMs = 30_000;

  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(this.defaultMs),
      catchError((err: unknown) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () =>
              new RequestTimeoutException({
                statusCode: HTTP_STATUS.REQUEST_TIMEOUT,
                message: `Request timed out after ${this.defaultMs}ms`,
              })
          );
        }
        return throwError(() => err);
      })
    );
  }
}
