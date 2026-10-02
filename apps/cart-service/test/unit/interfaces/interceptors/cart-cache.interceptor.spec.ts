import { jest } from '@jest/globals';

import { CartCacheInterceptor } from '../../../../src/module/interfaces/interceptors/cart-cache.interceptor.js';
import type { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { of } from 'rxjs';

function makeRedis(): jest.Mocked<RedisService> {
  return {
    get: jest.fn(async () => null),
    set: jest.fn(async () => undefined),
    del: jest.fn(async () => undefined),
    exists: jest.fn(),
    isHealthy: jest.fn(async () => true),
  } as unknown as jest.Mocked<RedisService>;
}

function makeCtx(method: string, url: string) {
  return {
    switchToHttp: () => ({ getRequest: () => ({ method, url }) }),
  } as unknown as Parameters<CartCacheInterceptor['intercept']>[0];
}

function makeNext() {
  return { handle: jest.fn(() => of({ cached: false })) } as unknown as Parameters<CartCacheInterceptor['intercept']>[1];
}

describe('CartCacheInterceptor', () => {
  let redis: jest.Mocked<RedisService>;
  let icp: CartCacheInterceptor;

  beforeEach(() => {
    redis = makeRedis();
    icp = new CartCacheInterceptor(redis);
  });

  it('bypasses cache for non-GET', (done) => {
    icp.intercept(makeCtx('POST', '/cart'), makeNext()).subscribe(() => {
      expect(redis.get).not.toHaveBeenCalled();
      done();
    });
  });

  it('passes GET through and caches result', (done) => {
    icp.intercept(makeCtx('GET', '/cart/123'), makeNext()).subscribe({
      next: () => {
        setTimeout(() => {
          expect(redis.set).toHaveBeenCalled();
          done();
        }, 10);
      },
      error: done,
    });
  });

  it('returns cached value on GET hit', (done) => {
    redis.get.mockResolvedValue({ cached: true });
    icp.intercept(makeCtx('GET', '/cart/123'), makeNext()).subscribe({
      next: (r) => {
        expect(r).toEqual({ cached: true });
        done();
      },
      error: done,
    });
  });
});
