/**
 * NotificationCacheInterceptor Tests
 * @module notification-service/test/unit/interfaces/interceptors
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { firstValueFrom, of } from 'rxjs';
import { NotificationCacheInterceptor } from '@interfaces/interceptors/notification-cache.interceptor.js';

function buildContext(
  method: string,
  url: string,
  userId?: string,
): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ method, url, user: userId ? { userId } : undefined }),
      getResponse: () => ({}),
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
}

function buildHandler(result: unknown): CallHandler {
  return { handle: () => of(result) } as unknown as CallHandler;
}

// small helper — flush pending microtasks
const flush = () => new Promise<void>((r) => setImmediate(r));

describe('NotificationCacheInterceptor', () => {
  let mockGet: jest.Mock<(key: string) => Promise<unknown>>;
  let mockSet: jest.Mock<(key: string, value: unknown, ttl: number) => Promise<void>>;
  let mockRedis: { get: typeof mockGet; set: typeof mockSet };
  let interceptor: NotificationCacheInterceptor;

  beforeEach(() => {
    mockGet = jest.fn<(key: string) => Promise<unknown>>();
    mockSet = jest.fn<(key: string, value: unknown, ttl: number) => Promise<void>>();
    mockRedis = { get: mockGet, set: mockSet };
    interceptor = new NotificationCacheInterceptor(mockRedis as never);
  });

  it('passes through non-GET requests', async () => {
    const ctx = buildContext('POST', '/notifications', 'u-1');
    const handler = buildHandler({ id: 'n-1' });
    const result$ = await interceptor.intercept(ctx, handler);
    const value = await firstValueFrom(result$);
    expect(value).toEqual({ id: 'n-1' });
    expect(mockGet).not.toHaveBeenCalled();
    expect(mockSet).not.toHaveBeenCalled();
  });

  it('returns cached value on hit', async () => {
    mockGet.mockResolvedValueOnce({ id: 'cached' });
    const ctx = buildContext('GET', '/notifications/n-1', 'u-1');
    const handler = buildHandler({ id: 'fresh' });
    const result$ = await interceptor.intercept(ctx, handler);
    const value = await firstValueFrom(result$);
    expect(value).toEqual({ id: 'cached' });
    expect(mockGet).toHaveBeenCalledWith('notification:http:cache:u-1:/notifications/n-1');
  });

  it('passes through on cache miss', async () => {
    mockGet.mockResolvedValueOnce(null);
    mockSet.mockResolvedValue(undefined);
    const ctx = buildContext('GET', '/notifications/n-1', 'u-1');
    const handler = buildHandler({ id: 'fresh' });
    const result$ = await interceptor.intercept(ctx, handler);
    const value = await firstValueFrom(result$);
    expect(value).toEqual({ id: 'fresh' });
  });

  it('falls back to anon when no user', async () => {
    mockGet.mockResolvedValueOnce(null);
    mockSet.mockResolvedValue(undefined);
    const ctx = buildContext('GET', '/x');
    const handler = buildHandler({ ok: true });
    const result$ = await interceptor.intercept(ctx, handler);
    await firstValueFrom(result$);
    expect(mockGet).toHaveBeenCalledWith('notification:http:cache:anon:/x');
  });

  it('continues on cache read error', async () => {
    mockGet.mockRejectedValueOnce(new Error('redis down'));
    mockSet.mockResolvedValue(undefined);
    const ctx = buildContext('GET', '/x', 'u-1');
    const handler = buildHandler({ ok: true });
    const result$ = await interceptor.intercept(ctx, handler);
    const value = await firstValueFrom(result$);
    expect(value).toEqual({ ok: true });
    await flush();
  });

  it('silently ignores cache write error', async () => {
    mockGet.mockResolvedValueOnce(null);
    mockSet.mockRejectedValueOnce(new Error('redis down'));
    const ctx = buildContext('GET', '/x', 'u-1');
    const handler = buildHandler({ ok: true });
    const result$ = await interceptor.intercept(ctx, handler);
    const value = await firstValueFrom(result$);
    expect(value).toEqual({ ok: true });
    await flush();
  });
});
