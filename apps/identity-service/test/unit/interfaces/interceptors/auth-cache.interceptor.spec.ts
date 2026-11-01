/**
 * AuthCacheInterceptor tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { of } from 'rxjs';
import { AuthCacheInterceptor } from '@interfaces/interceptors/auth-cache.interceptor.js';
import {
  makeExecutionContext,
  makeRedisServiceMock,
  makeCurrentUser,
} from '@fixtures/interfaces/index.js';

describe('AuthCacheInterceptor', () => {
  let interceptor: AuthCacheInterceptor;
  let redis: ReturnType<typeof makeRedisServiceMock>;

  beforeEach(() => {
    redis = makeRedisServiceMock();
    interceptor = new AuthCacheInterceptor(redis as never);
  });

  it('should skip cache for POST', async () => {
    const ctx = makeExecutionContext({ method: 'POST', url: '/test' });
    const next = { handle: jest.fn(() => of({ fresh: true })) };

    const result$ = await interceptor.intercept(ctx, next as never);
    let value: unknown;
    result$.subscribe((v) => { value = v; });

    expect(value).toEqual({ fresh: true });
    expect(redis.get).not.toHaveBeenCalled();
  });

  it('should return cached value on GET cache hit', async () => {
    redis.get.mockResolvedValue({ cached: true });
    const ctx = makeExecutionContext({ method: 'GET', url: '/test' });
    const next = { handle: jest.fn(() => of({ fresh: true })) };

    const result$ = await interceptor.intercept(ctx, next as never);
    let value: unknown;
    result$.subscribe((v) => { value = v; });

    expect(value).toEqual({ cached: true });
    expect(next.handle).not.toHaveBeenCalled();
  });

  it('should call next on GET cache miss and set cache', async () => {
    redis.get.mockResolvedValue(null);
    const ctx = makeExecutionContext({ method: 'GET', url: '/test' });
    const next = { handle: jest.fn(() => of({ fresh: true })) };

    const result$ = await interceptor.intercept(ctx, next as never);
    await new Promise<void>((resolve) => result$.subscribe({ complete: () => resolve() }));

    expect(next.handle).toHaveBeenCalled();
    expect(redis.set).toHaveBeenCalled();
  });

  it('should fallback to next on cache get failure', async () => {
    redis.get.mockRejectedValue(new Error('redis down'));
    const ctx = makeExecutionContext({ method: 'GET', url: '/test' });
    const next = { handle: jest.fn(() => of({ fresh: true })) };

    const result$ = await interceptor.intercept(ctx, next as never);
    let value: unknown;
    result$.subscribe((v) => { value = v; });

    expect(value).toEqual({ fresh: true });
  });

  it('should build user-scoped key', async () => {
    redis.get.mockResolvedValue(null);
    const ctx = makeExecutionContext({
      method: 'GET',
      url: '/test',
      user: makeCurrentUser({ userId: 'u-123' }),
    });
    const next = { handle: jest.fn(() => of({})) };

    await interceptor.intercept(ctx, next as never);

    const key = (redis.get.mock.calls[0] as unknown[])[0] as string;
    expect(key).toContain('u-123');
    expect(key).toContain('GET');
    expect(key).toContain('/test');
  });

  it('should use anon key when no user', async () => {
    redis.get.mockResolvedValue(null);
    const ctx = makeExecutionContext({ method: 'GET', url: '/test', user: {} });
    const next = { handle: jest.fn(() => of({})) };

    await interceptor.intercept(ctx, next as never);
    const key = (redis.get.mock.calls[0] as unknown[])[0] as string;
    expect(key).toContain('anon');
  });
});
