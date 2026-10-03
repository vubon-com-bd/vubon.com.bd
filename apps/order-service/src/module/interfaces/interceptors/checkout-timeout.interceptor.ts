/**
 * CheckoutTimeoutInterceptor — cancels slow checkout requests
 * @module order-service/interfaces/interceptors
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { catchError, throwError, timeout, type Observable } from 'rxjs';

const CHECKOUT_TIMEOUT_MS = 10_000;

@Injectable()
export class CheckoutTimeoutInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      timeout(CHECKOUT_TIMEOUT_MS),
      catchError((err: unknown) => {
        if (err instanceof Error && err.name === 'TimeoutError') {
          return throwError(
            () =>
              new RequestTimeoutException(
                `Checkout request exceeded ${CHECKOUT_TIMEOUT_MS}ms`,
              ),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
