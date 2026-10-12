/**
 * Analytics Cache Interceptor
 * @module analytics-service/interfaces/interceptors
 *
 * In-memory response cache for GET endpoints with per-route TTL.
 * Production → replace with Redis-backed adapter.
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Observable } from 'rxjs';
import { of, tap } from 'rxjs';
import { SetMetadata } from '@nestjs/common';

export const ANALYTICS_CACHE_META_KEY = 'analytics_cache_ttl';

/**
 * Decorator: @AnalyticsCache(300) — cache GET responses for N seconds
 */
export const AnalyticsCache = (ttlSeconds: number): MethodDecorator =>
  SetMetadata(ANALYTICS_CACHE_META_KEY, ttlSeconds);

interface CacheEntry {
  readonly value: unknown;
  readonly expiresAt: number;
}

@Injectable()
export class AnalyticsCacheInterceptor implements NestInterceptor {
  private readonly store = new Map<string, CacheEntry>();

  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ttl = this.reflector.getAllAndOverride<number>(
      ANALYTICS_CACHE_META_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!ttl || ttl <= 0) return next.handle();

    const request = context.switchToHttp().getRequest<{
      method: string;
      url: string;
    }>();

    // Only cache GETs
    if (request.method !== 'GET') return next.handle();

    const key = `analytics:${request.method}:${request.url}`;
    const hit = this.store.get(key);

    if (hit && hit.expiresAt > Date.now()) {
      return of(hit.value);
    }

    return next.handle().pipe(
      tap((value) => {
        this.store.set(key, {
          value,
          expiresAt: Date.now() + ttl * 1000,
        });
      })
    );
  }

  /** Manual invalidation — call from write handlers */
  invalidateByPrefix(prefix: string): number {
    let count = 0;
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) {
        this.store.delete(key);
        count++;
      }
    }
    return count;
  }

  clear(): void {
    this.store.clear();
  }
}
