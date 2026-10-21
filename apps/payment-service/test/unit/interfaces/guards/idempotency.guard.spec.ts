/**
 * IdempotencyGuard — unit tests
 * @module payment-service/test/unit/interfaces/guards
 */
import { describe, it, expect } from '@jest/globals';
import type { ExecutionContext } from '@nestjs/common';
import { IdempotencyGuard } from '@interfaces/guards/idempotency.guard';

function ctx(headers: Record<string, string | string[] | undefined>): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => ({ headers }) }),
  } as unknown as ExecutionContext;
}

describe('IdempotencyGuard', () => {
  const guard = new IdempotencyGuard();

  it('returns true when valid idempotency-key header', () => {
    expect(guard.canActivate(ctx({ 'idempotency-key': 'abc12345' }))).toBe(true);
  });

  it('returns true when x-idempotency-key header', () => {
    expect(guard.canActivate(ctx({ 'x-idempotency-key': 'abc12345xyz' }))).toBe(true);
  });

  it('throws when header missing', () => {
    expect(() => guard.canActivate(ctx({}))).toThrow();
  });

  it('throws when key too short', () => {
    expect(() => guard.canActivate(ctx({ 'idempotency-key': 'abc' }))).toThrow();
  });

  it('throws when key too long', () => {
    const longKey = 'a'.repeat(200);
    expect(() => guard.canActivate(ctx({ 'idempotency-key': longKey }))).toThrow();
  });

  it('accepts array header (takes first)', () => {
    expect(
      guard.canActivate(ctx({ 'idempotency-key': ['abc12345', 'other'] })),
    ).toBe(true);
  });
});
