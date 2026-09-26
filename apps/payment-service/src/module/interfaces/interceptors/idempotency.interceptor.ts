import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

interface IdempotentRequest {
  readonly method: string;
  readonly headers: Readonly<Record<string, string | string[] | undefined>>;
}

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  private readonly store = new Map<string, unknown>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<IdempotentRequest>();
    if (request.method === 'GET') return next.handle();

    const raw = request.headers['x-idempotency-key'];
    const key = Array.isArray(raw) ? raw[0] : raw;
    if (!key) return next.handle();

    if (this.store.has(key)) {
      return of(this.store.get(key));
    }

    return next.handle().pipe(tap((value) => this.store.set(key, value)));
  }
}
