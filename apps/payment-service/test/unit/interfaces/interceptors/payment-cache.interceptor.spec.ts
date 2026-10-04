import { jest } from '@jest/globals';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { of, lastValueFrom } from 'rxjs';
import { PaymentCacheInterceptor } from '../../../../src/module/interfaces/interceptors/payment-cache.interceptor.js';

function mockCtx(method: string, url: string, userId?: string): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ method, url, user: userId ? { userId } : undefined }),
    }),
  } as unknown as ExecutionContext;
}

function mockRedis() {
  return {
    get: jest.fn(async () => null),
    raw: {
      set: jest.fn(async () => 'OK'),
    },
  };
}

describe('PaymentCacheInterceptor', () => {
  let redis: ReturnType<typeof mockRedis>;
  let interceptor: PaymentCacheInterceptor;

  beforeEach(() => {
    redis = mockRedis();
    interceptor = new PaymentCacheInterceptor(redis as never);
  });

  it('non-GET requests bypass cache', async () => {
    const next: CallHandler = { handle: () => of({ ok: true }) };
    const result = await interceptor.intercept(mockCtx('POST', '/payments'), next);
    await lastValueFrom(result);
    expect(redis.get).not.toHaveBeenCalled();
    expect(redis.raw.set).not.toHaveBeenCalled();
  });

  it('GET without cache hit — writes to cache', async () => {
    const next: CallHandler = { handle: () => of({ ok: true }) };
    const obs = await interceptor.intercept(mockCtx('GET', '/payments', 'u1'), next);
    await lastValueFrom(obs);
    expect(redis.get).toHaveBeenCalled();
    expect(redis.raw.set).toHaveBeenCalled();
  });

  it('GET with cache hit — returns cached value', async () => {
    redis.get.mockResolvedValue({ cached: true });
    const next: CallHandler = { handle: () => of({ fresh: true }) };
    const obs = await interceptor.intercept(mockCtx('GET', '/payments', 'u1'), next);
    const result = await lastValueFrom(obs);
    expect(result).toEqual({ cached: true });
    expect(redis.raw.set).not.toHaveBeenCalled();
  });

  it('cache read error — falls through to handler', async () => {
    redis.get.mockRejectedValue(new Error('redis down'));
    const next: CallHandler = { handle: () => of({ fresh: true }) };
    const obs = await interceptor.intercept(mockCtx('GET', '/payments'), next);
    const result = await lastValueFrom(obs);
    expect(result).toEqual({ fresh: true });
  });

  it('anonymous user gets anon cache key', async () => {
    const next: CallHandler = { handle: () => of({ ok: true }) };
    const obs = await interceptor.intercept(mockCtx('GET', '/payments'), next);
    await lastValueFrom(obs);
    expect(redis.raw.set).toHaveBeenCalledWith(
      expect.stringContaining(':anon:'),
      expect.any(String),
      'EX',
      expect.any(Number),
    );
  });
});
