/**
 * OrderCacheInterceptor Tests
 * @module order-service/test/unit/interfaces/interceptors
 */
import { jest } from '@jest/globals';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { of, firstValueFrom } from 'rxjs';
import { OrderCacheInterceptor } from '@interfaces/interceptors/order-cache.interceptor.js';

function buildContext(req: {
  method: string;
  url: string;
  user?: { userId?: string };
}): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => req }),
  } as unknown as ExecutionContext;
}

describe('OrderCacheInterceptor', () => {
  let mockRedis: { get: jest.Mock; raw: { set: jest.Mock } };
  let next: CallHandler<unknown>;

  beforeEach(() => {
    mockRedis = {
      get: jest.fn(),
      raw: { set: jest.fn().mockResolvedValue('OK') },
    };
    next = { handle: jest.fn(() => of({ data: 'response' })) };
  });

  it('should bypass cache for non-GET methods', async () => {
    const interceptor = new OrderCacheInterceptor(mockRedis as never);
    const result$ = await interceptor.intercept(buildContext({ method: 'POST', url: '/o' }), next);
    await firstValueFrom(result$);
    expect(mockRedis.get).not.toHaveBeenCalled();
    expect(next.handle).toHaveBeenCalled();
  });

  it('should return cached response on cache hit', async () => {
    const cached = { data: 'cached' };
    mockRedis.get.mockResolvedValue(cached);
    const interceptor = new OrderCacheInterceptor(mockRedis as never);
    const result$ = await interceptor.intercept(buildContext({ method: 'GET', url: '/o' }), next);
    expect(await firstValueFrom(result$)).toEqual(cached);
    expect(next.handle).not.toHaveBeenCalled();
  });

  it('should call handler on cache miss', async () => {
    mockRedis.get.mockResolvedValue(null);
    const interceptor = new OrderCacheInterceptor(mockRedis as never);
    const result$ = await interceptor.intercept(buildContext({ method: 'GET', url: '/o' }), next);
    await firstValueFrom(result$);
    expect(next.handle).toHaveBeenCalled();
    expect(mockRedis.raw.set).toHaveBeenCalled();
  });

  it('should include userId in cache key', async () => {
    mockRedis.get.mockResolvedValue(null);
    const interceptor = new OrderCacheInterceptor(mockRedis as never);
    const result$ = await interceptor.intercept(
      buildContext({ method: 'GET', url: '/o', user: { userId: 'u-1' } }),
      next,
    );
    await firstValueFrom(result$);
    expect(mockRedis.get).toHaveBeenCalledWith(expect.stringContaining('u-1'));
  });

  it('should use "anon" for missing user', async () => {
    mockRedis.get.mockResolvedValue(null);
    const interceptor = new OrderCacheInterceptor(mockRedis as never);
    const result$ = await interceptor.intercept(buildContext({ method: 'GET', url: '/o' }), next);
    await firstValueFrom(result$);
    expect(mockRedis.get).toHaveBeenCalledWith(expect.stringContaining('anon'));
  });

  it('should handle Redis get failure as cache miss', async () => {
    mockRedis.get.mockRejectedValue(new Error('Redis down'));
    const interceptor = new OrderCacheInterceptor(mockRedis as never);
    const result$ = await interceptor.intercept(buildContext({ method: 'GET', url: '/o' }), next);
    await firstValueFrom(result$);
    expect(next.handle).toHaveBeenCalled();
  });
});
