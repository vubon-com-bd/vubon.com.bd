/**
 * OwnOrderGuard Tests
 * @module order-service/test/unit/interfaces/guards
 */
import { jest } from '@jest/globals';
import { ForbiddenException } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import { OwnOrderGuard } from '@interfaces/guards/own-order.guard.js';

function buildContext(req: {
  params?: Record<string, string>;
  user?: { userId?: string; roles?: readonly string[] };
}): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => req }),
  } as unknown as ExecutionContext;
}

describe('OwnOrderGuard', () => {
  const mockRepo = { findById: jest.fn() } as never;
  let guard: OwnOrderGuard;

  beforeEach(() => {
    jest.clearAllMocks();
    guard = new OwnOrderGuard(mockRepo);
  });

  it('should allow if no orderId param', async () => {
    expect(await guard.canActivate(buildContext({ params: {} }))).toBe(true);
  });

  it('should throw if no user', async () => {
    await expect(
      guard.canActivate(buildContext({ params: { orderId: 'o-1' } })),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should allow admin', async () => {
    expect(
      await guard.canActivate(
        buildContext({
          params: { orderId: 'o-1' },
          user: { userId: 'a-1', roles: ['admin'] },
        }),
      ),
    ).toBe(true);
  });

  it('should allow super_admin', async () => {
    expect(
      await guard.canActivate(
        buildContext({
          params: { orderId: 'o-1' },
          user: { userId: 'sa-1', roles: ['super_admin'] },
        }),
      ),
    ).toBe(true);
  });

  it('should throw if order not found', async () => {
    (mockRepo as unknown as { findById: jest.Mock }).findById.mockResolvedValue(null);
    await expect(
      guard.canActivate(
        buildContext({
          params: { orderId: 'o-1' },
          user: { userId: 'u-1' },
        }),
      ),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should throw if not owner', async () => {
    (mockRepo as unknown as { findById: jest.Mock }).findById.mockResolvedValue({
      customerId: { value: 'other' },
    });
    await expect(
      guard.canActivate(
        buildContext({
          params: { orderId: 'o-1' },
          user: { userId: 'u-1' },
        }),
      ),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should allow owner', async () => {
    (mockRepo as unknown as { findById: jest.Mock }).findById.mockResolvedValue({
      customerId: { value: 'u-1' },
    });
    expect(
      await guard.canActivate(
        buildContext({
          params: { orderId: 'o-1' },
          user: { userId: 'u-1' },
        }),
      ),
    ).toBe(true);
  });

  it('should fall back to id param', async () => {
    (mockRepo as unknown as { findById: jest.Mock }).findById.mockResolvedValue({
      customerId: { value: 'u-1' },
    });
    expect(
      await guard.canActivate(
        buildContext({ params: { id: 'o-1' }, user: { userId: 'u-1' } }),
      ),
    ).toBe(true);
  });
});
