/**
 * ProductTimeoutInterceptor — fail after N ms
 * @module product-service/interfaces/interceptors
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
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';

const DEFAULT_TIMEOUT_MS = 30_000;

@Injectable()
export class ProductTimeoutInterceptor implements NestInterceptor {
  private readonly ms: number = DEFAULT_TIMEOUT_MS;

  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(this.ms),
      catchError((err: unknown) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () =>
              new RequestTimeoutException({
                statusCode: HTTP_STATUS.REQUEST_TIMEOUT,
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
