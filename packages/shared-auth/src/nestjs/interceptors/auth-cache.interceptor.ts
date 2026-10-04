import {
  Injectable,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface CacheEntry {
  readonly value: unknown;
  readonly expiresAt: number;
}

/**
 * Very small in-memory cache for auth-heavy endpoints.
 * Replace with Redis in production.
 */
@Injectable()
export class AuthCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map<string, CacheEntry>();

  constructor(private readonly ttlMs = 60_000) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<{ method?: string; url?: string }>();
    if (req.method !== 'GET' || !req.url) return next.handle();

    const key = req.url;
    const hit = this.cache.get(key);
    if (hit && hit.expiresAt > Date.now()) {
      return of(hit.value);
    }

    return next.handle().pipe(
      tap((value: unknown) => {
        this.cache.set(key, {
          value,
          expiresAt: Date.now() + this.ttlMs,
        });
      })
    );
  }
}
