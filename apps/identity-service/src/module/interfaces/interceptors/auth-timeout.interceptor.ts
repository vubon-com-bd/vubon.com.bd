/**
 * AuthTimeoutInterceptor — fail after N ms
 * @module identity-service/interfaces/interceptors
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { throwError, TimeoutError, type Observable } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class AuthTimeoutInterceptor implements NestInterceptor {
  private readonly ms: number = 30_000;

  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(this.ms),
      catchError((err: unknown) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () =>
              new RequestTimeoutException({
                statusCode: 408,
                code: 'SERVER_TIMEOUT',
                message: `Request timed out after ${this.ms}ms`,
              }),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
