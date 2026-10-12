import { jest } from '@jest/globals';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { firstValueFrom, of } from 'rxjs';
import { VendorCacheInterceptor } from '../../../../src/module/interfaces/interceptors/vendor-cache.interceptor.js';
import type { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

function makeRedis(): jest.Mocked<RedisService> {
  return {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue(undefined),
  } as unknown as jest.Mocked<RedisService>;
}

function makeCtx(method: string, url: string, user?: unknown): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => ({ method, url, user }) }),
    getHandler: () => ({}), getClass: () => ({}),
  } as never;
}

function makeHandler(value: unknown = { data: 'ok' }): CallHandler {
  return { handle: jest.fn(() => of(value)) } as never;
}

describe('VendorCacheInterceptor', () => {
  let redis: jest.Mocked<RedisService>;
  let interceptor: VendorCacheInterceptor;

  beforeEach(() => {
    redis = makeRedis();
    interceptor = new VendorCacheInterceptor(redis);
  });

  it('skips non-GET requests', async () => {
    const stream = await interceptor.intercept(makeCtx('POST', '/vendors'), makeHandler());
    await firstValueFrom(stream);
    expect(redis.get).not.toHaveBeenCalled();
  });

  it('skips authenticated GET', async () => {
    const stream = await interceptor.intercept(
      makeCtx('GET', '/vendors', { userId: 'u' }),
      makeHandler(),
    );
    await firstValueFrom(stream);
    expect(redis.get).not.toHaveBeenCalled();
  });

  it('returns cached value on hit', async () => {
    redis.get.mockResolvedValue({ cached: true });
    const stream = await interceptor.intercept(
      makeCtx('GET', '/vendors/1'),
      makeHandler({ cached: false }),
    );
    const v = await firstValueFrom(stream);
    expect(v).toEqual({ cached: true });
  });

  it('caches public GET responses', async () => {
    const stream = await interceptor.intercept(
      makeCtx('GET', '/public/vendors'),
      makeHandler({ data: 'x' }),
    );
    const v = await firstValueFrom(stream);
    expect(v).toEqual({ data: 'x' });
    expect(redis.set).toHaveBeenCalled();
  });

  it('caches non-public GET with shorter TTL', async () => {
    const stream = await interceptor.intercept(
      makeCtx('GET', '/vendors'),
      makeHandler({ data: 'y' }),
    );
    await firstValueFrom(stream);
    expect(redis.set).toHaveBeenCalled();
  });
});
