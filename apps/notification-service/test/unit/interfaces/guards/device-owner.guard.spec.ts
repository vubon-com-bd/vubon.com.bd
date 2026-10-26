/**
 * DeviceOwnerGuard Tests
 * @module notification-service/test/unit/interfaces/guards
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { ExecutionContext } from '@nestjs/common';
import { DeviceOwnerGuard } from '@interfaces/guards/device-owner.guard.js';

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

describe('DeviceOwnerGuard', () => {
  let mockFindById: jest.Mock<() => Promise<unknown>>;
  let guard: DeviceOwnerGuard;

  beforeEach(() => {
    mockFindById = jest.fn<() => Promise<unknown>>();
    const mockRepo = { findByIdVO: mockFindById };
    guard = new DeviceOwnerGuard(mockRepo as never);
  });

  it('returns true when no deviceId', async () => {
    expect(await guard.canActivate(buildContext({}))).toBe(true);
  });

  it('throws when user missing', async () => {
    await expect(guard.canActivate(buildContext({ deviceId: '33333333-3333-4333-8333-333333333333' }))).rejects.toThrow(
      'Authentication required',
    );
  });

  it('admin bypass', async () => {
    expect(
      await guard.canActivate(buildContext({ deviceId: '33333333-3333-4333-8333-333333333333' }, { userId: 'u', roles: ['admin'] })),
    ).toBe(true);
  });

  it('throws when device not found', async () => {
    mockFindById.mockResolvedValueOnce(null);
    await expect(
      guard.canActivate(buildContext({ deviceId: '33333333-3333-4333-8333-333333333333' }, { userId: 'u' })),
    ).rejects.toThrow('Device not found');
  });

  it('throws when not owner', async () => {
    mockFindById.mockResolvedValueOnce({
      vo: { userId: { value: 'u-other' } },
    });
    await expect(
      guard.canActivate(buildContext({ deviceId: '33333333-3333-4333-8333-333333333333' }, { userId: 'u' })),
    ).rejects.toThrow('You do not own this device');
  });

  it('returns true when owner matches', async () => {
    mockFindById.mockResolvedValueOnce({
      vo: { userId: { value: 'u' } },
    });
    expect(
      await guard.canActivate(buildContext({ deviceId: '33333333-3333-4333-8333-333333333333' }, { userId: 'u' })),
    ).toBe(true);
  });
});
