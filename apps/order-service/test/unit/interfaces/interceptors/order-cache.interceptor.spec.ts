import { jest } from '@jest/globals';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { of, firstValueFrom } from 'rxjs';
import { OrderCacheInterceptor } from '../../../../src/module/interfaces/interceptors/order-cache.interceptor.js';

function makeCtx(method: string, url: string, userId = 'user-1'): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ method, url, user: { userId } }),
    }),
  } as unknown as ExecutionContext;
}

function makeNext(data: unknown = { ok: true }): CallHandler {
  return { handle: () => of(data) };
}

function makeRedis(cached: unknown = null) {
  return {
    get: jest.fn().mockResolvedValue(cached),
    raw: { set: jest.fn().mockResolvedValue('OK') },
  };
}

describe('OrderCacheInterceptor', () => {
  it('GET: cache hit → returns cached, no handler call', async () => {
    const redis = makeRedis({ cached: true });
    const interceptor = new OrderCacheInterceptor(redis as never);
    const next = makeNext({ fresh: true });
    const result = await interceptor.intercept(makeCtx('GET', '/orders'), next);
    expect(await firstValueFrom(result)).toEqual({ cached: true });
    expect(redis.raw.set).not.toHaveBeenCalled();
  });

  it('GET: cache miss → calls handler and stores', async () => {
    const redis = makeRedis(null);
    const interceptor = new OrderCacheInterceptor(redis as never);
    const next = makeNext({ fresh: true });
    const result = await interceptor.intercept(makeCtx('GET', '/orders'), next);
    const data = await firstValueFrom(result);
    expect(data).toEqual({ fresh: true });
    expect(redis.raw.set).toHaveBeenCalled();
  });

  it('POST: bypasses cache entirely', async () => {
    const redis = makeRedis({ cached: true });
    const interceptor = new OrderCacheInterceptor(redis as never);
    const next = makeNext({ fresh: true });
    const result = await interceptor.intercept(makeCtx('POST', '/orders'), next);
    expect(await firstValueFrom(result)).toEqual({ fresh: true });
    expect(redis.get).not.toHaveBeenCalled();
  });

  it('cache.get error → falls through to handler', async () => {
    const redis = {
      get: jest.fn().mockRejectedValue(new Error('redis down')),
      raw: { set: jest.fn() },
    };
    const interceptor = new OrderCacheInterceptor(redis as never);
    const next = makeNext({ fresh: true });
    const result = await interceptor.intercept(makeCtx('GET', '/orders'), next);
    expect(await firstValueFrom(result)).toEqual({ fresh: true });
  });

  it('anonymous user gets "anon" in key', async () => {
    const redis = makeRedis(null);
    const interceptor = new OrderCacheInterceptor(redis as never);
    const ctx = {
      switchToHttp: () => ({ getRequest: () => ({ method: 'GET', url: '/orders', user: undefined }) }),
    } as unknown as ExecutionContext;
    const result = await interceptor.intercept(ctx, makeNext());
    await firstValueFrom(result);
    const setCall = (redis.raw.set as jest.Mock).mock.calls[0];
    expect(setCall[0]).toContain('anon');
  });
});
