/**
 * CheckoutTimeoutInterceptor — fail after N ms
 * @module order-service/interfaces/interceptors
 */
import {
  Optional,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { throwError, TimeoutError, type Observable } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';

@Injectable()
export class CheckoutTimeoutInterceptor implements NestInterceptor {
  private readonly ms: number;

  constructor(@Optional() ms: number = 30_000) {
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
