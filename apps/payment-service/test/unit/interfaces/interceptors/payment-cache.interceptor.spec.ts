/**
 * PaymentCacheInterceptor — unit tests
 * @module payment-service/test/unit/interfaces/interceptors
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { firstValueFrom, of } from 'rxjs';
import { PaymentCacheInterceptor } from '@interfaces/interceptors/payment-cache.interceptor';
import type { ExecutionContext, CallHandler } from '@nestjs/common';

function mockCtx(method: string, url: string, userId?: string): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ method, url, user: { userId } }),
    }),
  } as unknown as ExecutionContext;
}

function mockNext(data: unknown): CallHandler {
  return { handle: () => of(data) };
}

describe('PaymentCacheInterceptor', () => {
  let redis: { get: jest.Mock; set: jest.Mock };
  let interceptor: PaymentCacheInterceptor;

  beforeEach(() => {
    redis = {
      get: jest.fn(async () => null),
      set: jest.fn(async () => undefined),
    };
    interceptor = new PaymentCacheInterceptor(redis as never);
  });

  it('bypasses cache on non-GET methods', async () => {
    const next = mockNext({ ok: true });
    const obs = await interceptor.intercept(mockCtx('POST', '/payments'), next);
    const result = await firstValueFrom(obs);
    expect(result).toEqual({ ok: true });
    expect(redis.get).not.toHaveBeenCalled();
  });

  it('returns cached value on hit', async () => {
    redis.get.mockImplementation(async () => ({ cached: true }));
    const obs = await interceptor.intercept(mockCtx('GET', '/payments', 'u1'), mockNext({}));
    const result = await firstValueFrom(obs);
    expect(result).toEqual({ cached: true });
  });

  it('caches on miss', async () => {
    redis.get.mockImplementation(async () => null);
    const obs = await interceptor.intercept(mockCtx('GET', '/payments', 'u1'), mockNext({ data: 1 }));
    await firstValueFrom(obs);
    // small tick to let the void this.redis.set resolve
    await Promise.resolve();
    expect(redis.set).toHaveBeenCalled();
  });

  it('continues when redis.get throws', async () => {
    redis.get.mockImplementation(async () => {
      throw new Error('redis down');
    });
    const obs = await interceptor.intercept(mockCtx('GET', '/payments'), mockNext({ ok: 1 }));
    const result = await firstValueFrom(obs);
    expect(result).toEqual({ ok: 1 });
  });

  it('swallows redis.set error', async () => {
    redis.get.mockImplementation(async () => null);
    redis.set.mockImplementation(async () => {
      throw new Error('write failed');
    });
    const obs = await interceptor.intercept(mockCtx('GET', '/payments'), mockNext({ ok: 1 }));
    await firstValueFrom(obs);
    await Promise.resolve();
    // No throw expected
    expect(true).toBe(true);
  });
});
