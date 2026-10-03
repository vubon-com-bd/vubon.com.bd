import { jest } from '@jest/globals';

import { CartLockInterceptor } from '../../../../src/module/interfaces/interceptors/cart-lock.interceptor.js';
import type { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { of } from 'rxjs';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeRedis(): jest.Mocked<RedisService> {
  return {
    get: jest.fn(async () => null),
    set: jest.fn(async () => undefined),
    del: jest.fn(async () => undefined),
    exists: jest.fn(),
    isHealthy: jest.fn(async () => true),
  } as unknown as jest.Mocked<RedisService>;
}

function makeCtx(method: string, cartId?: string) {
  return {
    switchToHttp: () => ({ getRequest: () => ({ method, params: cartId ? { cartId } : {} }) }),
  } as unknown as Parameters<CartLockInterceptor['intercept']>[0];
}

function makeNext() {
  return { handle: jest.fn(() => of({ ok: true })) } as unknown as Parameters<CartLockInterceptor['intercept']>[1];
}

describe('CartLockInterceptor', () => {
  let redis: jest.Mocked<RedisService>;
  let icp: CartLockInterceptor;

  beforeEach(() => {
    redis = makeRedis();
    icp = new CartLockInterceptor(redis);
  });

  it('passes through GET without lock', (done) => {
    icp.intercept(makeCtx('GET'), makeNext()).subscribe(() => {
      expect(redis.get).not.toHaveBeenCalled();
      done();
    });
  });

  it('acquires lock for POST', (done) => {
    icp.intercept(makeCtx('POST', UUID), makeNext()).subscribe({
      next: () => {
        expect(redis.set).toHaveBeenCalled();
        done();
      },
      error: done,
    });
  });

  it('releases lock after handler', (done) => {
    icp.intercept(makeCtx('POST', UUID), makeNext()).subscribe({
      next: () => {
        setTimeout(() => {
          expect(redis.del).toHaveBeenCalled();
          done();
        }, 10);
      },
      error: done,
    });
  });

  it('throws when lock already held', (done) => {
    redis.get.mockResolvedValue('1');
    icp.intercept(makeCtx('POST', UUID), makeNext()).subscribe({
      next: () => done(new Error('should not succeed')),
      error: (err) => {
        expect(err).toBeDefined();
        done();
      },
    });
  });
});
