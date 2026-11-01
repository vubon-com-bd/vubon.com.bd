/**
 * VendorOrderGuard Tests
 * @module order-service/test/unit/interfaces/guards
 */
import { jest } from '@jest/globals';
import { ForbiddenException } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import { VendorOrderGuard } from '@interfaces/guards/vendor-order.guard.js';

function buildContext(req: {
  params?: Record<string, string>;
  user?: { userId?: string; roles?: readonly string[] };
}): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => req }),
  } as unknown as ExecutionContext;
}

describe('VendorOrderGuard', () => {
  const mockRepo = { findById: jest.fn() } as never;
  let guard: VendorOrderGuard;

  beforeEach(() => {
    jest.clearAllMocks();
    guard = new VendorOrderGuard(mockRepo);
  });

  it('should allow if no orderId', async () => {
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

  it('should throw for non-vendor', async () => {
    await expect(
      guard.canActivate(
        buildContext({
          params: { orderId: 'o-1' },
          user: { userId: 'u-1', roles: ['customer'] },
        }),
      ),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should throw if order not found', async () => {
    (mockRepo as unknown as { findById: jest.Mock }).findById.mockResolvedValue(null);
    await expect(
      guard.canActivate(
        buildContext({
          params: { orderId: 'o-1' },
          user: { userId: 'v-1', roles: ['vendor'] },
        }),
      ),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should allow vendor for existing order', async () => {
    (mockRepo as unknown as { findById: jest.Mock }).findById.mockResolvedValue({ id: 'o-1' });
    expect(
      await guard.canActivate(
        buildContext({
          params: { orderId: 'o-1' },
          user: { userId: 'v-1', roles: ['vendor'] },
        }),
      ),
    ).toBe(true);
  });

  it('should allow vendor_manager', async () => {
    (mockRepo as unknown as { findById: jest.Mock }).findById.mockResolvedValue({ id: 'o-1' });
    expect(
      await guard.canActivate(
        buildContext({
          params: { orderId: 'o-1' },
          user: { userId: 'vm-1', roles: ['vendor_manager'] },
        }),
      ),
    ).toBe(true);
  });
});
