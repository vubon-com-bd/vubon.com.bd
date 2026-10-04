import { jest } from '@jest/globals';
import { ForbiddenException, type ExecutionContext } from '@nestjs/common';
import { VendorOrderGuard } from '../../../../src/module/interfaces/guards/vendor-order.guard.js';
import { makeOrder, makeMockOrderRepo, UUID_ORDER, UUID_VENDOR } from '../../application/services/_helpers.js';

function makeCtx(
  params: Record<string, string>,
  user?: { userId?: string; role?: string; vendorId?: string },
): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => ({ params, user }) }),
  } as unknown as ExecutionContext;
}

describe('VendorOrderGuard', () => {
  let repo: ReturnType<typeof makeMockOrderRepo>;
  let guard: VendorOrderGuard;

  beforeEach(() => {
    repo = makeMockOrderRepo();
    guard = new VendorOrderGuard(repo as never);
  });

  it('no orderId → true', async () => {
    expect(await guard.canActivate(makeCtx({}))).toBe(true);
  });

  it('no user → Forbidden', async () => {
    await expect(guard.canActivate(makeCtx({ orderId: UUID_ORDER }))).rejects.toThrow(ForbiddenException);
  });

  it('admin allowed', async () => {
    expect(
      await guard.canActivate(makeCtx({ orderId: UUID_ORDER }, { userId: 'x', role: 'admin' })),
    ).toBe(true);
  });

  it('non-vendor role → Forbidden', async () => {
    await expect(
      guard.canActivate(makeCtx({ orderId: UUID_ORDER }, { userId: 'x', role: 'customer' })),
    ).rejects.toThrow(ForbiddenException);
  });

  it('vendor without vendorId → Forbidden', async () => {
    await expect(
      guard.canActivate(makeCtx({ orderId: UUID_ORDER }, { userId: 'x', role: 'vendor' })),
    ).rejects.toThrow(ForbiddenException);
  });

  it('order not found → Forbidden', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(
      guard.canActivate(
        makeCtx({ orderId: UUID_ORDER }, { userId: 'x', role: 'vendor', vendorId: UUID_VENDOR }),
      ),
    ).rejects.toThrow(ForbiddenException);
  });

  it('vendor not in order → Forbidden', async () => {
    repo.findById.mockResolvedValue(makeOrder());
    await expect(
      guard.canActivate(
        makeCtx({ orderId: UUID_ORDER }, { userId: 'x', role: 'vendor', vendorId: UUID_VENDOR }),
      ),
    ).rejects.toThrow(ForbiddenException);
  });

  it('vendor in order → true', async () => {
    repo.findById.mockResolvedValue(makeOrder(false, UUID_VENDOR));
    expect(
      await guard.canActivate(
        makeCtx({ orderId: UUID_ORDER }, { userId: 'x', role: 'vendor', vendorId: UUID_VENDOR }),
      ),
    ).toBe(true);
  });
});
