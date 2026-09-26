import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { getOptionalEnvInt } from '@vubon/shared-config/common';

@Injectable()
export class QueryTimeoutInterceptor implements NestInterceptor {
  private readonly timeoutMs: number;

  constructor() {
    this.timeoutMs = getOptionalEnvInt('OLAP_QUERY_TIMEOUT_MS', 30_000);
  }

  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      timeout(this.timeoutMs),
      catchError((error: unknown) => {
        if (error instanceof TimeoutError) {
          return throwError(
            () =>
              new RequestTimeoutException(
                `Query exceeded ${this.timeoutMs}ms`,
              ),
          );
        }
        return throwError(() => error);
      }),
    );
  }
}
