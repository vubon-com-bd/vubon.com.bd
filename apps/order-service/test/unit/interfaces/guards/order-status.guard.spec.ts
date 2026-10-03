import { jest } from '@jest/globals';
import { ForbiddenException, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OrderStatusGuard } from '../../../../src/module/interfaces/guards/order-status.guard.js';
import { makeOrder, makeMockOrderRepo, UUID_ORDER } from '../../application/services/_helpers.js';
import { ORDER_STATUS_METADATA_KEY } from '../../../../src/module/interfaces/decorators/order-status.decorator.js';

function makeCtx(params: Record<string, string>): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => ({ params }) }),
    getHandler: () => ({}),
    getClass: () => ({}),
  } as unknown as ExecutionContext;
}

describe('OrderStatusGuard', () => {
  let repo: ReturnType<typeof makeMockOrderRepo>;
  let reflector: { getAllAndOverride: jest.Mock };
  let guard: OrderStatusGuard;

  beforeEach(() => {
    repo = makeMockOrderRepo();
    reflector = { getAllAndOverride: jest.fn() };
    guard = new OrderStatusGuard(repo as never, reflector as unknown as Reflector);
  });

  it('no metadata → true (no restriction)', async () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    expect(await guard.canActivate(makeCtx({ orderId: UUID_ORDER }))).toBe(true);
  });

  it('empty metadata array → true', async () => {
    reflector.getAllAndOverride.mockReturnValue([]);
    expect(await guard.canActivate(makeCtx({ orderId: UUID_ORDER }))).toBe(true);
  });

  it('no orderId in params → true', async () => {
    reflector.getAllAndOverride.mockReturnValue(['pending']);
    expect(await guard.canActivate(makeCtx({}))).toBe(true);
  });

  it('order not found → Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValue(['pending']);
    repo.findById.mockResolvedValue(null);
    await expect(guard.canActivate(makeCtx({ orderId: UUID_ORDER }))).rejects.toThrow(ForbiddenException);
  });

  it('status not allowed → Forbidden', async () => {
    reflector.getAllAndOverride.mockReturnValue(['confirmed']);
    repo.findById.mockResolvedValue(makeOrder()); // pending
    await expect(guard.canActivate(makeCtx({ orderId: UUID_ORDER }))).rejects.toThrow(ForbiddenException);
  });

  it('status allowed → true', async () => {
    reflector.getAllAndOverride.mockReturnValue(['pending']);
    repo.findById.mockResolvedValue(makeOrder());
    expect(await guard.canActivate(makeCtx({ orderId: UUID_ORDER }))).toBe(true);
  });

  it('uses ORDER_STATUS_METADATA_KEY for lookup', async () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    await guard.canActivate(makeCtx({}));
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(
      ORDER_STATUS_METADATA_KEY,
      expect.any(Array),
    );
  });
});
