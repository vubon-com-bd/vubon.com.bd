/**
 * RateLimitInterceptor Tests
 * @module notification-service/test/unit/interfaces/interceptors
 */
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { firstValueFrom, of } from 'rxjs';
import { RateLimitInterceptor } from '@interfaces/interceptors/rate-limit.interceptor.js';

function buildContext(
  userId?: string,
  ip = '127.0.0.1',
): {
  ctx: ExecutionContext;
  headers: Record<string, string>;
} {
  const headers: Record<string, string> = {};
  const ctx = {
    switchToHttp: () => ({
      getRequest: () => ({ user: userId ? { userId } : undefined, ip }),
      getResponse: () => ({
        setHeader: (key: string, value: string) => {
          headers[key] = value;
        },
      }),
      getNext: () => ({}),
    }),
    getHandler: () => () => undefined,
    getClass: () => class {},
    getArgs: () => [],
    getArgByIndex: () => undefined,
    getType: () => 'http' as never,
    switchToRpc: () => ({ getContext: () => ({}), getData: () => ({}), getMetadata: () => ({}) }),
    switchToWs: () => ({ getClient: () => ({}), getData: () => ({}), getPattern: () => '' }),
  } as unknown as ExecutionContext;
  return { ctx, headers };
}

function buildHandler(result: unknown): CallHandler {
  return { handle: () => of(result) } as unknown as CallHandler;
}

describe('RateLimitInterceptor', () => {
  let interceptor: RateLimitInterceptor;

  beforeEach(() => {
    interceptor = new RateLimitInterceptor();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('sets limit headers on first request', async () => {
    const { ctx, headers } = buildContext('u-1');
    const result$ = interceptor.intercept(ctx, buildHandler({ ok: true }));
    await firstValueFrom(result$);
    expect(headers['X-RateLimit-Limit']).toBe('100');
    expect(headers['X-RateLimit-Remaining']).toBe('99');
    expect(headers['X-RateLimit-Reset']).toBeDefined();
  });

  it('decrements remaining on subsequent requests', async () => {
    const { ctx, headers } = buildContext('u-1');
    for (let i = 0; i < 5; i++) {
      const result$ = interceptor.intercept(ctx, buildHandler({ ok: true }));
      await firstValueFrom(result$);
    }
    expect(headers['X-RateLimit-Remaining']).toBe('95');
  });

  it('falls back to IP when no user', async () => {
    const { ctx, headers } = buildContext(undefined, '1.2.3.4');
    const result$ = interceptor.intercept(ctx, buildHandler({ ok: true }));
    await firstValueFrom(result$);
    expect(headers['X-RateLimit-Limit']).toBe('100');
  });

  it('resets after window', async () => {
    const { ctx, headers } = buildContext('u-1');
    for (let i = 0; i < 5; i++) {
      await firstValueFrom(interceptor.intercept(ctx, buildHandler({ ok: true })));
    }
    expect(headers['X-RateLimit-Remaining']).toBe('95');

    // Advance time > 60s
    jest.advanceTimersByTime(61_000);
    await firstValueFrom(interceptor.intercept(ctx, buildHandler({ ok: true })));
    expect(headers['X-RateLimit-Remaining']).toBe('99');
  });

  it('keeps remaining at 0 when bucket exceeded', async () => {
    const { ctx, headers } = buildContext('u-1');
    // 150 requests — exceed 100 max
    for (let i = 0; i < 150; i++) {
      await firstValueFrom(interceptor.intercept(ctx, buildHandler({ ok: true })));
    }
    expect(headers['X-RateLimit-Remaining']).toBe('0');
  });

  it('tracks users independently', async () => {
    const userA = buildContext('u-a');
    const userB = buildContext('u-b');
    await firstValueFrom(
      interceptor.intercept(userA.ctx, buildHandler({ ok: true })),
    );
    await firstValueFrom(
      interceptor.intercept(userB.ctx, buildHandler({ ok: true })),
    );
    expect(userA.headers['X-RateLimit-Remaining']).toBe('99');
    expect(userB.headers['X-RateLimit-Remaining']).toBe('99');
  });
});
