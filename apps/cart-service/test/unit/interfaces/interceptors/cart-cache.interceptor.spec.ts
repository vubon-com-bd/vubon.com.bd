/**
 * CartCacheInterceptor — Unit Tests
 */
import { describe, it, expect, jest } from '@jest/globals';
import { lastValueFrom, of } from 'rxjs';
import { CartCacheInterceptor } from '../../../../src/module/interfaces/interceptors/cart-cache.interceptor.js';
import { createMockRedis } from '../../../fixtures/interfaces/redis-mock.fixture.js';
import { createMockContext } from '../../../fixtures/interfaces/http-request.fixture.js';

const makeCallHandler = (value: unknown) => ({
  handle: jest.fn(() => of(value)),
});

describe('CartCacheInterceptor', () => {
  it('should skip non-GET requests', async () => {
    const redis = createMockRedis();
    const ic = new CartCacheInterceptor(redis as never);
    const ctx = createMockContext({ method: 'POST', url: '/carts' });
    const next = makeCallHandler({ ok: true });
    const result = await ic.intercept(ctx, next as never);
    await lastValueFrom(result);
    expect(redis.get).not.toHaveBeenCalled();
    expect(next.handle).toHaveBeenCalled();
  });

  it('should return cached value on hit', async () => {
    const redis = createMockRedis();
    redis._store.set('cart-service:http-cache:anon:GET:/carts/test', { cached: true });
    const ic = new CartCacheInterceptor(redis as never);
    const ctx = createMockContext({ method: 'GET', url: '/carts/test' });
    const next = makeCallHandler({ fresh: true });
    const result = await ic.intercept(ctx, next as never);
    const value = await lastValueFrom(result);
    expect(value).toEqual({ cached: true });
    expect(next.handle).not.toHaveBeenCalled();
  });

  it('should fetch and set cache on miss', async () => {
    const redis = createMockRedis();
    const ic = new CartCacheInterceptor(redis as never);
    const ctx = createMockContext({ method: 'GET', url: '/carts/new' });
    const next = makeCallHandler({ fresh: true });
    const result = await ic.intercept(ctx, next as never);
    const value = await lastValueFrom(result);
    expect(value).toEqual({ fresh: true });
    expect(next.handle).toHaveBeenCalled();
  });
});
