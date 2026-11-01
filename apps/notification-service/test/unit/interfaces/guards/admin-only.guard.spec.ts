/**
 * AdminOnlyGuard Tests
 * @module notification-service/test/unit/interfaces/guards
 */
import { describe, expect, it } from '@jest/globals';
import type { ExecutionContext } from '@nestjs/common';
import { AdminOnlyGuard } from '@interfaces/guards/admin-only.guard.js';

function buildContext(user?: { userId?: string; roles?: readonly string[] }): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ user }),
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

describe('AdminOnlyGuard', () => {
  const guard = new AdminOnlyGuard();

  it('throws when no user', () => {
    expect(() => guard.canActivate(buildContext())).toThrow('Authentication required');
  });

  it('throws when user has no roles', () => {
    expect(() => guard.canActivate(buildContext({ userId: 'u-1' }))).toThrow(
      'Admin access required',
    );
  });

  it('throws when user has non-admin role', () => {
    expect(() =>
      guard.canActivate(buildContext({ userId: 'u-1', roles: ['customer'] })),
    ).toThrow('Admin access required');
  });

  it('returns true for admin', () => {
    expect(
      guard.canActivate(buildContext({ userId: 'u-1', roles: ['admin'] })),
    ).toBe(true);
  });

  it('returns true for super_admin', () => {
    expect(
      guard.canActivate(buildContext({ userId: 'u-1', roles: ['super_admin'] })),
    ).toBe(true);
  });
});
