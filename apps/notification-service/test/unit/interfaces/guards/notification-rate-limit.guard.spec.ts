/**
 * NotificationRateLimitGuard Tests
 * @module notification-service/test/unit/interfaces/guards
 */
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { ExecutionContext } from '@nestjs/common';
import { NotificationRateLimitGuard } from '@interfaces/guards/notification-rate-limit.guard.js';

function buildContext(userId?: string): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ user: userId ? { userId } : undefined, ip: '127.0.0.1' }),
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

describe('NotificationRateLimitGuard', () => {
  let guard: NotificationRateLimitGuard;

  beforeEach(() => {
    guard = new NotificationRateLimitGuard();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('allows first 10 requests', () => {
    const ctx = buildContext('u-1');
    for (let i = 0; i < 10; i++) {
      expect(guard.canActivate(ctx)).toBe(true);
    }
  });

  it('blocks 11th request', () => {
    const ctx = buildContext('u-1');
    for (let i = 0; i < 10; i++) guard.canActivate(ctx);
    expect(() => guard.canActivate(ctx)).toThrow('Too many notification requests');
  });

  it('resets after window', () => {
    const ctx = buildContext('u-1');
    for (let i = 0; i < 10; i++) guard.canActivate(ctx);
    jest.advanceTimersByTime(61_000);
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('tracks separate users independently', () => {
    const userA = buildContext('u-1');
    const userB = buildContext('u-2');
    for (let i = 0; i < 10; i++) guard.canActivate(userA);
    expect(() => guard.canActivate(userA)).toThrow();
    expect(guard.canActivate(userB)).toBe(true);
  });

  it('falls back to IP when no user', () => {
    const ctx = buildContext();
    for (let i = 0; i < 10; i++) guard.canActivate(ctx);
    expect(() => guard.canActivate(ctx)).toThrow();
  });
});
