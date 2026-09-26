/**
 * AuthCacheInterceptor — Unit Tests
 */
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { AuthCacheInterceptor } from './auth-cache.interceptor';

const mockRedis = () => {
  const store: Record<string, unknown> = {};
  return {
    get: jest.fn(async (key: string) => store[key] ?? null),
    set: jest.fn(async (key: string, value: unknown) => {
      store[key] = value;
    }),
  };
};

const buildContext = (opts: {
  method?: string;
  url?: string;
  userId?: string;
}): unknown => ({
  switchToHttp: () => ({
    getRequest: () => ({
      method: opts.method ?? 'GET',
      url: opts.url ?? '/test',
      user: opts.userId ? { id: opts.userId } : undefined,
    }),
  }),
});

describe('AuthCacheInterceptor', () => {
  let interceptor: AuthCacheInterceptor;
  let redis: ReturnType<typeof mockRedis>;

  beforeEach(() => {
    redis = mockRedis();
    interceptor = new AuthCacheInterceptor(redis as never);
  });

  describe('intercept()', () => {
    it('should bypass cache for POST requests', async () => {
      const ctx = buildContext({ method: 'POST', userId: 'u-1' });
      const next = { handle: jest.fn(() => of({ data: 'fresh' })) };

      const result$ = await interceptor.intercept(ctx as never, next as never);
      const data = await firstValueFrom(result$);

      expect(data).toEqual({ data: 'fresh' });
      expect(redis.get).not.toHaveBeenCalled();
    });

    it('should bypass cache for requests without user', async () => {
      const ctx = buildContext({ method: 'GET' });
      const next = { handle: jest.fn(() => of({ data: 'fresh' })) };

      const result$ = await interceptor.intercept(ctx as never, next as never);
      await firstValueFrom(result$);

      expect(redis.get).not.toHaveBeenCalled();
    });

    it('should return cached value on cache hit', async () => {
      const ctx = buildContext({ method: 'GET', userId: 'u-1', url: '/api/me' });
      redis.set('authcache:u-1:/api/me', { data: 'cached' });
      const next = { handle: jest.fn(() => of({ data: 'fresh' })) };

      const result$ = await interceptor.intercept(ctx as never, next as never);
      const data = await firstValueFrom(result$);

      expect(data).toEqual({ data: 'cached' });
      expect(next.handle).not.toHaveBeenCalled();
    });

    it('should cache fresh response on cache miss', async () => {
      const ctx = buildContext({ method: 'GET', userId: 'u-1', url: '/api/me' });
      const next = { handle: jest.fn(() => of({ data: 'fresh' })) };

      const result$ = await interceptor.intercept(ctx as never, next as never);
      const data = await firstValueFrom(result$);

      expect(data).toEqual({ data: 'fresh' });
      expect(next.handle).toHaveBeenCalled();
      expect(redis.set).toHaveBeenCalled();
    });
  });
});
