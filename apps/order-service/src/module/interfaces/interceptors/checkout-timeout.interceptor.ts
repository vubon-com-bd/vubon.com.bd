import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, timeout, catchError, throwError } from 'rxjs';

const TIMEOUT_MS = 10_000;

@Injectable()
export class CheckoutTimeoutInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      timeout(TIMEOUT_MS),
      catchError((error) => {
        if (error?.name === 'TimeoutError') {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => error);
      }),
    );
  }
}
