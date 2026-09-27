/**
 * AvatarCacheInterceptor Unit Test
 */
import { jest } from '@jest/globals';

import { of, firstValueFrom } from 'rxjs';
import type { ExecutionContext, CallHandler } from '@nestjs/common';
import { AvatarCacheInterceptor } from '@interfaces/interceptors/avatar-cache.interceptor';

describe('AvatarCacheInterceptor', () => {
  let interceptor: AvatarCacheInterceptor;
  let response: { setHeader: jest.Mock };

  beforeEach(() => {
    response = { setHeader: jest.fn() };
    interceptor = new AvatarCacheInterceptor();
  });

  const buildContext = (): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getResponse: () => response,
      }),
    }) as unknown as ExecutionContext;

  const buildNext = (data: unknown): CallHandler => ({
    handle: () => of(data),
  });

  it('should set Cache-Control header', async () => {
    const ctx = buildContext();
    await firstValueFrom(interceptor.intercept(ctx, buildNext({ url: 'x' })));
    expect(response.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('public')
    );
  });

  it('should set max-age to 86400', async () => {
    const ctx = buildContext();
    await firstValueFrom(interceptor.intercept(ctx, buildNext({})));
    const [header, value] = response.setHeader.mock.calls[0];
    expect(header).toBe('Cache-Control');
    expect(value).toContain('max-age=86400');
  });
});
