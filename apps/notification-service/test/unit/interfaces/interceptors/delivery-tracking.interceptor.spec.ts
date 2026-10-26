/**
 * DeliveryTrackingInterceptor Tests
 * @module notification-service/test/unit/interfaces/interceptors
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { firstValueFrom, of, throwError } from 'rxjs';
import { DeliveryTrackingInterceptor } from '@interfaces/interceptors/delivery-tracking.interceptor.js';

function buildContext(method: string, url: string, userId?: string): ExecutionContext {
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

describe('DeliveryTrackingInterceptor', () => {
  let interceptor: DeliveryTrackingInterceptor;
  let logSpy: jest.Mock;
  let warnSpy: jest.Mock;

  beforeEach(() => {
    interceptor = new DeliveryTrackingInterceptor();
    logSpy = jest.fn();
    warnSpy = jest.fn();
    // Access private logger
    (interceptor as unknown as { logger: { log: jest.Mock; warn: jest.Mock } }).logger = {
      log: logSpy,
      warn: warnSpy,
    };
  });

  it('skips GET requests', async () => {
    const ctx = buildContext('GET', '/notifications', 'u-1');
    await firstValueFrom(interceptor.intercept(ctx, buildHandler({ ok: true })));
    expect(logSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('skips HEAD requests', async () => {
    const ctx = buildContext('HEAD', '/notifications', 'u-1');
    await firstValueFrom(interceptor.intercept(ctx, buildHandler({ ok: true })));
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('logs POST requests with notificationIds', async () => {
    const ctx = buildContext('POST', '/notifications', 'u-1');
    await firstValueFrom(
      interceptor.intercept(
        ctx,
        buildHandler({ notificationIds: ['n-1', 'n-2'] }),
      ),
    );
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0]?.[0]).toContain('DELIVERY');
    expect(logSpy.mock.calls[0]?.[0]).toContain('ids=2');
  });

  it('logs POST with single id', async () => {
    const ctx = buildContext('POST', '/notifications', 'u-1');
    await firstValueFrom(
      interceptor.intercept(ctx, buildHandler({ id: 'abcdef123456' })),
    );
    expect(logSpy.mock.calls[0]?.[0]).toContain('id=abcdef12');
  });

  it('logs generic ok for non-id results', async () => {
    const ctx = buildContext('POST', '/notifications', 'u-1');
    await firstValueFrom(interceptor.intercept(ctx, buildHandler({ foo: 'bar' })));
    expect(logSpy.mock.calls[0]?.[0]).toContain('ok');
  });

  it('logs null result', async () => {
    const ctx = buildContext('POST', '/x', 'u-1');
    await firstValueFrom(interceptor.intercept(ctx, buildHandler(null)));
    expect(logSpy.mock.calls[0]?.[0]).toContain('null');
  });

  it('logs non-object result', async () => {
    const ctx = buildContext('POST', '/x', 'u-1');
    await firstValueFrom(interceptor.intercept(ctx, buildHandler('string')));
    expect(logSpy.mock.calls[0]?.[0]).toContain('string');
  });

  it('logs error on failure', async () => {
    const ctx = buildContext('POST', '/notifications', 'u-1');
    const handler: CallHandler = {
      handle: () => throwError(() => new Error('send failed')),
    } as unknown as CallHandler;
    await expect(
      firstValueFrom(interceptor.intercept(ctx, handler)),
    ).rejects.toThrow('send failed');
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0]?.[0]).toContain('DELIVERY FAIL');
  });
});
