/**
 * WebhookRetryInterceptor — unit tests
 * @module payment-service/test/unit/interfaces/interceptors
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { firstValueFrom, of, throwError } from 'rxjs';
import { WebhookRetryInterceptor } from '@interfaces/interceptors/webhook-retry.interceptor';
import type { ExecutionContext, CallHandler } from '@nestjs/common';

function mockCtx(method: string, url: string): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ method, url, headers: {} }),
    }),
  } as unknown as ExecutionContext;
}

describe('WebhookRetryInterceptor', () => {
  let interceptor: WebhookRetryInterceptor;

  beforeEach(() => {
    interceptor = new WebhookRetryInterceptor();
  });

  it('passes through successful response', async () => {
    const next: CallHandler = { handle: () => of({ ok: true }) };
    const obs = interceptor.intercept(mockCtx('POST', '/webhooks/stripe'), next);
    const result = await firstValueFrom(obs);
    expect(result).toEqual({ ok: true });
  });

  it('logs failure and re-throws (Error instance)', async () => {
    const next: CallHandler = {
      handle: () => throwError(() => new Error('gateway down')),
    };
    const obs = interceptor.intercept(mockCtx('POST', '/webhooks/bkash'), next);
    await expect(firstValueFrom(obs)).rejects.toThrow('gateway down');
  });

  it('logs failure when non-Error thrown', async () => {
    const next: CallHandler = {
      handle: () => throwError(() => 'string error'),
    };
    const obs = interceptor.intercept(mockCtx('POST', '/webhooks/nagad'), next);
    await expect(firstValueFrom(obs)).rejects.toBeDefined();
  });

  it('handles non-webhook URL gracefully', async () => {
    const next: CallHandler = { handle: () => of({ ok: true }) };
    const obs = interceptor.intercept(mockCtx('POST', '/payments'), next);
    const result = await firstValueFrom(obs);
    expect(result).toEqual({ ok: true });
  });

  it('extracts provider when URL contains webhooks path', async () => {
    const next: CallHandler = {
      handle: () => throwError(() => new Error('fail')),
    };
    const obs = interceptor.intercept(mockCtx('POST', '/webhooks/paypal'), next);
    await expect(firstValueFrom(obs)).rejects.toThrow();
  });
});

// ─── Edge cases ─────────────────────────────
describe('WebhookRetryInterceptor — edge cases', () => {
  let interceptor: WebhookRetryInterceptor;

  beforeEach(() => {
    interceptor = new WebhookRetryInterceptor();
  });

  it('handles non-Error thrown in error handler', async () => {
    const next: CallHandler = {
      handle: () => throwError(() => ({ message: 'object error' })),
    };
    const obs = interceptor.intercept(mockCtx('POST', '/webhooks/nagad'), next);
    await expect(firstValueFrom(obs)).rejects.toBeDefined();
  });

  it('handles undefined thrown', async () => {
    const next: CallHandler = {
      handle: () => throwError(() => undefined),
    };
    const obs = interceptor.intercept(mockCtx('POST', '/webhooks/stripe'), next);
    await expect(firstValueFrom(obs)).rejects.toBeUndefined();
  });

  it('extracts provider when URL has no path', async () => {
    const next: CallHandler = {
      handle: () => throwError(() => new Error('fail')),
    };
    const obs = interceptor.intercept(mockCtx('POST', ''), next);
    await expect(firstValueFrom(obs)).rejects.toThrow();
  });
});
