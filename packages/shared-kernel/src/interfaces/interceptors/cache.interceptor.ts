import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache: Map<string, CacheEntry> = new Map();
  private ttl: number = 60000; // 1 minute default

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const cacheKey = this.generateCacheKey(request);

    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return of(cached.data);
    }

    return next.handle().pipe(
      tap((data) => {
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
      })
    );
  }

  private generateCacheKey(request: unknown): string {
    const { method, url, query, body } = request as {
      method: string;
      url: string;
      query: Record<string, unknown>;
      body: unknown;
    };
    return `${method}:${url}:${JSON.stringify(query)}:${JSON.stringify(body)}`;
  }

  clearCache(): void {
    this.cache.clear();
  }

  setTTL(ttl: number): void {
    this.ttl = ttl;
  }
}
