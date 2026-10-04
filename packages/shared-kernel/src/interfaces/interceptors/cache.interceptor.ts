/**
 * Cache Interceptor
 * @module shared-kernel/interfaces/interceptors
 *
 * Uses CACHE_TTL from shared-constants।
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { of, tap } from 'rxjs';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

interface CacheEntry {
  value: unknown;
  expiresAt: number;
}

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private readonly store = new Map<string, CacheEntry>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{
      method: string;
      url: string;
    }>();

    if (request.method !== 'GET') return next.handle();

    const key = `${request.method}:${request.url}`;
    const hit = this.store.get(key);
    if (hit && hit.expiresAt > Date.now()) {
      return of(hit.value);
    }

    return next.handle().pipe(
      tap((value) => {
        this.store.set(key, {
          value,
          expiresAt: Date.now() + CACHE_TTL.ONE_MINUTE * 1000,
        });
      })
    );
  }
}
