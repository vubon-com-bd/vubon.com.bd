import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

interface CacheEntry {
  value: unknown;
  expiresAt: number;
}

interface CacheableRequest {
  readonly method: string;
  readonly url: string;
  readonly user?: { readonly userId?: string };
}

@Injectable()
export class PaymentCacheInterceptor implements NestInterceptor {
  private readonly store = new Map<string, CacheEntry>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<CacheableRequest>();
    if (request.method !== 'GET') return next.handle();

    const key = `${request.user?.userId ?? 'anon'}:${request.url}`;
    const hit = this.store.get(key);
    if (hit && hit.expiresAt > Date.now()) {
      return of(hit.value);
    }

    return next.handle().pipe(
      tap((value) => {
        this.store.set(key, { value, expiresAt: Date.now() + 60_000 });
      }),
    );
  }
}
