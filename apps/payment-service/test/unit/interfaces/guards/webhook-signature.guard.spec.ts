/**
 * WebhookSignatureGuard — unit tests
 * @module payment-service/test/unit/interfaces/guards
 */
import { describe, it, expect } from '@jest/globals';
import type { ExecutionContext } from '@nestjs/common';
import { WebhookSignatureGuard } from '@interfaces/guards/webhook-signature.guard';

function ctx(headers: Record<string, string | string[] | undefined>): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => ({ headers }) }),
  } as unknown as ExecutionContext;
}

describe('WebhookSignatureGuard', () => {
  const guard = new WebhookSignatureGuard();

  it('returns true when x-signature header present', () => {
    expect(guard.canActivate(ctx({ 'x-signature': 'abc' }))).toBe(true);
  });

  it('returns true when stripe-signature header present', () => {
    expect(guard.canActivate(ctx({ 'stripe-signature': 't=123,v1=abc' }))).toBe(true);
  });

  it('returns true when x-bkash-signature header present', () => {
    expect(guard.canActivate(ctx({ 'x-bkash-signature': 'sig' }))).toBe(true);
  });

  it('returns true when paypal-transmission-sig header present', () => {
    expect(guard.canActivate(ctx({ 'paypal-transmission-sig': 'sig' }))).toBe(true);
  });

  it('returns true when x-sslcommerz-signature header present', () => {
    expect(guard.canActivate(ctx({ 'x-sslcommerz-signature': 'sig' }))).toBe(true);
  });

  it('returns true when header is array with values', () => {
    expect(guard.canActivate(ctx({ 'x-signature': ['sig1', 'sig2'] }))).toBe(true);
  });

  it('throws Unauthorized when no signature header', () => {
    expect(() => guard.canActivate(ctx({}))).toThrow();
  });

  it('throws Unauthorized when signature header is empty', () => {
    expect(() => guard.canActivate(ctx({ 'x-signature': '' }))).toThrow();
  });

  it('throws Unauthorized when signature header is empty array', () => {
    expect(() => guard.canActivate(ctx({ 'x-signature': [] }))).toThrow();
  });
});

// ─── Edge cases ─────────────────────────────
describe('WebhookSignatureGuard — edge cases', () => {
  const guard = new WebhookSignatureGuard();

  it('throws when signature header is empty array', () => {
    expect(() => guard.canActivate(ctx({ 'x-signature': [] }))).toThrow();
  });

  it('throws when all signature headers are empty', () => {
    expect(() =>
      guard.canActivate(
        ctx({
          'x-signature': [],
          'stripe-signature': '',
          'x-bkash-signature': [],
        }),
      ),
    ).toThrow();
  });

  it('returns true when at least one header has array value', () => {
    expect(
      guard.canActivate(
        ctx({
          'x-signature': [],
          'stripe-signature': ['t=1,v1=abc'],
        }),
      ),
    ).toBe(true);
  });
});
