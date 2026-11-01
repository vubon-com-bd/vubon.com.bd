/**
 * AuthTimeoutInterceptor tests
 */
import { describe, it, expect } from '@jest/globals';
import { of, throwError } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { RequestTimeoutException } from '@nestjs/common';
import { AuthTimeoutInterceptor } from '@interfaces/interceptors/auth-timeout.interceptor.js';
import { makeExecutionContext } from '@fixtures/interfaces/index.js';

describe('AuthTimeoutInterceptor', () => {
  const interceptor = new AuthTimeoutInterceptor(50);

  it('should pass through on fast response', async () => {
    const ctx = makeExecutionContext();
    const next = { handle: () => of({ fast: true }) };

    const result = await firstValueFrom(interceptor.intercept(ctx, next as never));
    expect(result).toEqual({ fast: true });
  });

  it('should throw RequestTimeoutException on TimeoutError', async () => {
    const ctx = makeExecutionContext();
    const next = { handle: () => throwError(() => new Error('other')) };

    await expect(
      firstValueFrom(interceptor.intercept(ctx, next as never)),
    ).rejects.toThrow('other');
  });
});
