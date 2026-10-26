/**
 * OwnNotificationGuard Tests
 * @module notification-service/test/unit/interfaces/guards
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { ExecutionContext } from '@nestjs/common';
import { OwnNotificationGuard } from '@interfaces/guards/own-notification.guard.js';

function buildContext(
  params: Record<string, string>,
  user?: { userId?: string; roles?: readonly string[] },
): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ params, user }),
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

describe('OwnNotificationGuard', () => {
  let mockFindById: jest.Mock<() => Promise<unknown>>;
  let guard: OwnNotificationGuard;

  beforeEach(() => {
    mockFindById = jest.fn<() => Promise<unknown>>();
    const mockRepo = { findByIdVO: mockFindById };
    guard = new OwnNotificationGuard(mockRepo as never);
  });

  it('returns true when no notificationId param', async () => {
    const ctx = buildContext({});
    expect(await guard.canActivate(ctx)).toBe(true);
  });

  it('throws when user not authenticated', async () => {
    const ctx = buildContext({ notificationId: '11111111-1111-4111-8111-111111111111' });
    await expect(guard.canActivate(ctx)).rejects.toThrow('Authentication required');
  });

  it('returns true for admin role bypass', async () => {
    const ctx = buildContext(
      { notificationId: '11111111-1111-4111-8111-111111111111' },
      { userId: 'u-1', roles: ['admin'] },
    );
    expect(await guard.canActivate(ctx)).toBe(true);
  });

  it('returns true for super_admin role bypass', async () => {
    const ctx = buildContext(
      { notificationId: '11111111-1111-4111-8111-111111111111' },
      { userId: 'u-1', roles: ['super_admin'] },
    );
    expect(await guard.canActivate(ctx)).toBe(true);
  });

  it('throws when notification not found', async () => {
    mockFindById.mockResolvedValueOnce(null);
    const ctx = buildContext({ notificationId: '11111111-1111-4111-8111-111111111111' }, { userId: 'u-1' });
    await expect(guard.canActivate(ctx)).rejects.toThrow('Notification not found');
  });

  it('throws when user does not own notification', async () => {
    mockFindById.mockResolvedValueOnce({
      vo: { userId: { value: 'u-other' } },
    });
    const ctx = buildContext({ notificationId: '11111111-1111-4111-8111-111111111111' }, { userId: 'u-1' });
    await expect(guard.canActivate(ctx)).rejects.toThrow(
      'You do not own this notification',
    );
  });

  it('returns true when owner matches', async () => {
    mockFindById.mockResolvedValueOnce({
      vo: { userId: { value: 'u-1' } },
    });
    const ctx = buildContext({ notificationId: '11111111-1111-4111-8111-111111111111' }, { userId: 'u-1' });
    expect(await guard.canActivate(ctx)).toBe(true);
  });
});
