/**
 * TimeoutInterceptor — fail after N ms
 * @module logistics-service/interfaces/interceptors
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
import { ERROR_CODE } from '@vubon/shared-constants/common';

const HTTP_REQUEST_TIMEOUT = 408;

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly ms: number;

  constructor(ms: number = 30_000) {
    this.ms = ms;
  }

  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(this.ms),
      catchError((err: unknown) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () =>
              new RequestTimeoutException({
                statusCode: HTTP_REQUEST_TIMEOUT,
                code: ERROR_CODE.SERVER_TIMEOUT,
                message: `Request timed out after ${this.ms}ms`,
              }),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
