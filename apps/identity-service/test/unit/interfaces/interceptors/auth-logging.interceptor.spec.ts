/**
 * AuthLoggingInterceptor tests
 */
import { describe, it, expect } from '@jest/globals';
import { of, throwError, firstValueFrom } from 'rxjs';
import { AuthLoggingInterceptor } from '@interfaces/interceptors/auth-logging.interceptor.js';
import { makeExecutionContext } from '@fixtures/interfaces/index.js';

describe('AuthLoggingInterceptor', () => {
  const interceptor = new AuthLoggingInterceptor();

  it('should pass through successful response', async () => {
    const ctx = makeExecutionContext({ handler: 'login' });
    const next = { handle: () => of({ ok: true }) };

    const r = await firstValueFrom(interceptor.intercept(ctx, next as never));
    expect(r).toEqual({ ok: true });
  });

  it('should re-throw on error', async () => {
    const ctx = makeExecutionContext({ handler: 'login' });
    const next = { handle: () => throwError(() => new Error('boom')) };

    await expect(
      firstValueFrom(interceptor.intercept(ctx, next as never)),
    ).rejects.toThrow('boom');
  });
});
