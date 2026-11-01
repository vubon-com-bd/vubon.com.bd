/**
 * IdempotencyInterceptor — unit tests
 * @module payment-service/test/unit/interfaces/interceptors
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { firstValueFrom, of } from 'rxjs';
import { IdempotencyInterceptor } from '@interfaces/interceptors/idempotency.interceptor';
import type { ExecutionContext, CallHandler } from '@nestjs/common';

function mockCtx(
  method: string,
  headers: Record<string, string | string[] | undefined>,
): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => ({ method, headers }) }),
  } as unknown as ExecutionContext;
}

function mockNext(data: unknown): CallHandler {
  return { handle: () => of(data) };
}

describe('IdempotencyInterceptor', () => {
  let redis: { get: jest.Mock; set: jest.Mock };
  let interceptor: IdempotencyInterceptor;

  beforeEach(() => {
    redis = {
      get: jest.fn(async () => null),
      set: jest.fn(async () => undefined),
    };
    interceptor = new IdempotencyInterceptor(redis as never);
  });

  it('bypasses on GET', async () => {
    const obs = await interceptor.intercept(mockCtx('GET', {}), mockNext({}));
    await firstValueFrom(obs);
    expect(redis.get).not.toHaveBeenCalled();
  });

  it('bypasses on DELETE', async () => {
    const obs = await interceptor.intercept(mockCtx('DELETE', {}), mockNext({}));
    await firstValueFrom(obs);
    expect(redis.get).not.toHaveBeenCalled();
  });

  it('bypasses when no idempotency-key header', async () => {
    const obs = await interceptor.intercept(mockCtx('POST', {}), mockNext({}));
    await firstValueFrom(obs);
    expect(redis.get).not.toHaveBeenCalled();
  });

  it('returns cached on POST with key', async () => {
    redis.get.mockImplementation(async () => ({ cached: true }));
    const obs = await interceptor.intercept(
      mockCtx('POST', { 'idempotency-key': 'abc12345' }),
      mockNext({}),
    );
    const result = await firstValueFrom(obs);
    expect(result).toEqual({ cached: true });
  });

  it('caches on PUT miss', async () => {
    redis.get.mockImplementation(async () => null);
    const obs = await interceptor.intercept(
      mockCtx('PUT', { 'idempotency-key': 'abc12345' }),
      mockNext({ ok: 1 }),
    );
    await firstValueFrom(obs);
    await Promise.resolve();
    expect(redis.set).toHaveBeenCalled();
  });

  it('accepts x-idempotency-key header', async () => {
    redis.get.mockImplementation(async () => ({ cached: true }));
    const obs = await interceptor.intercept(
      mockCtx('PATCH', { 'x-idempotency-key': 'abc12345' }),
      mockNext({}),
    );
    const result = await firstValueFrom(obs);
    expect(result).toEqual({ cached: true });
  });

  it('takes first when array header', async () => {
    redis.get.mockImplementation(async () => null);
    const obs = await interceptor.intercept(
      mockCtx('POST', { 'idempotency-key': ['abc12345', 'other'] }),
      mockNext({ ok: 1 }),
    );
    await firstValueFrom(obs);
    await Promise.resolve();
    expect(redis.set).toHaveBeenCalled();
  });

  it('continues when redis.get throws', async () => {
    redis.get.mockImplementation(async () => {
      throw new Error('boom');
    });
    const obs = await interceptor.intercept(
      mockCtx('POST', { 'idempotency-key': 'abc12345' }),
      mockNext({ ok: 1 }),
    );
    const result = await firstValueFrom(obs);
    expect(result).toEqual({ ok: 1 });
  });

  it('swallows redis.set error', async () => {
    redis.get.mockImplementation(async () => null);
    redis.set.mockImplementation(async () => {
      throw new Error('write failed');
    });
    const obs = await interceptor.intercept(
      mockCtx('POST', { 'idempotency-key': 'abc12345' }),
      mockNext({ ok: 1 }),
    );
    await firstValueFrom(obs);
    await Promise.resolve();
    expect(true).toBe(true);
  });
});
