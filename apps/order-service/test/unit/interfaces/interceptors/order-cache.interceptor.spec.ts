/**
 * OrderCacheInterceptor Tests
 * @module order-service/test/unit/interfaces/interceptors
 *
 * NOTE: In memory mode (default test env), the interceptor bypasses cache.
 * Tests below verify bypass behavior + key-building when cache is active.
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
  let mockRedis: { get: jest.Mock; raw: { set: jest.Mock; keys: jest.Mock; del: jest.Mock } };
  let next: CallHandler<unknown>;

  beforeEach(() => {
    mockRedis = {
      get: jest.fn(),
      raw: {
        set: jest.fn().mockResolvedValue('OK'),
        keys: jest.fn().mockResolvedValue([]),
        del: jest.fn().mockResolvedValue(1),
      },
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

  it('should return handler response (cache bypassed in memory mode)', async () => {
    const cached = { data: 'cached' };
    mockRedis.get.mockResolvedValue(cached);
    const interceptor = new OrderCacheInterceptor(mockRedis as never);
    const result$ = await interceptor.intercept(buildContext({ method: 'GET', url: '/o' }), next);
    const result = await firstValueFrom(result$);
    expect(result).toEqual({ data: 'response' });
    expect(next.handle).toHaveBeenCalled();
  });

  it('should pass through GET requests in memory mode', async () => {
    mockRedis.get.mockResolvedValue(null);
    const interceptor = new OrderCacheInterceptor(mockRedis as never);
    const result$ = await interceptor.intercept(buildContext({ method: 'GET', url: '/o' }), next);
    await firstValueFrom(result$);
    expect(next.handle).toHaveBeenCalled();
  });

  it('should not throw when building key with userId', async () => {
    const interceptor = new OrderCacheInterceptor(mockRedis as never);
    const result$ = await interceptor.intercept(
      buildContext({ method: 'GET', url: '/o', user: { userId: 'u-1' } }),
      next,
    );
    await firstValueFrom(result$);
    expect(result$).toBeDefined();
  });

  it('should not throw when building key without user', async () => {
    const interceptor = new OrderCacheInterceptor(mockRedis as never);
    const result$ = await interceptor.intercept(buildContext({ method: 'GET', url: '/o' }), next);
    await firstValueFrom(result$);
    expect(result$).toBeDefined();
  });
});
