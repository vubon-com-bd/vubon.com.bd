import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';

interface LockRequest {
  readonly method: string;
  readonly params?: Readonly<Record<string, string>>;
  readonly body?: { readonly cartId?: string };
}

@Injectable()
export class CartLockInterceptor implements NestInterceptor {
  private readonly locks = new Set<string>();

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest<LockRequest>();
    if (request.method === 'GET') return next.handle();

    const cartId = request.params?.['cartId'] ?? request.body?.cartId;
    if (!cartId) return next.handle();

    if (this.locks.has(cartId)) {
      throw new ConflictException(`Cart ${cartId} is being modified`);
    }
    this.locks.add(cartId);

    return next.handle().pipe(
      tap({
        next: () => this.locks.delete(cartId),
        error: () => this.locks.delete(cartId),
      }),
      catchError((error: unknown) => {
        this.locks.delete(cartId);
        return throwError(() => error);
      }),
    );
  }
}
