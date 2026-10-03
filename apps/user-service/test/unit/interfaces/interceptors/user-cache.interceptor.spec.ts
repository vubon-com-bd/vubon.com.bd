/**
 * UserCacheInterceptor Unit Test
 */
import { jest } from '@jest/globals';

import { of, firstValueFrom } from 'rxjs';
import type { ExecutionContext, CallHandler } from '@nestjs/common';
import { UserCacheInterceptor } from '@interfaces/interceptors/user-cache.interceptor';

describe('UserCacheInterceptor', () => {
  let interceptor: UserCacheInterceptor;
  let redis: { get: jest.Mock; set: jest.Mock };

  beforeEach(() => {
    redis = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
    };
    interceptor = new UserCacheInterceptor(redis as never);
  });

  const buildContext = (method: string, url: string): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ method, originalUrl: url }),
      }),
    }) as unknown as ExecutionContext;

  const buildNext = (data: unknown): CallHandler => ({
    handle: () => of(data),
  });

  it('should bypass cache for non-GET requests', async () => {
    const ctx = buildContext('POST', '/users');
    const result = await firstValueFrom(
      interceptor.intercept(ctx, buildNext({ id: 'user-1' }))
    );
    expect(result).toEqual({ id: 'user-1' });
    expect(redis.get).not.toHaveBeenCalled();
  });

  it('should return cached data if available', async () => {
    redis.get.mockResolvedValue({ id: 'cached' });
    const ctx = buildContext('GET', '/users/user-1');
    const result = await firstValueFrom(
      interceptor.intercept(ctx, buildNext({ id: 'fresh' }))
    );
    expect(result).toEqual({ id: 'cached' });
  });

  it('should call next and cache on miss', async () => {
    redis.get.mockResolvedValue(null);
    const ctx = buildContext('GET', '/users/user-1');
    const result = await firstValueFrom(
      interceptor.intercept(ctx, buildNext({ id: 'user-1' }))
    );
    expect(result).toEqual({ id: 'user-1' });
    expect(redis.set).toHaveBeenCalled();
  });
});
