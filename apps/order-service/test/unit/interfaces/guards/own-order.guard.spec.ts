import { jest } from '@jest/globals';
import { ForbiddenException, type ExecutionContext } from '@nestjs/common';
import { OwnOrderGuard } from '../../../../src/module/interfaces/guards/own-order.guard.js';
import { makeOrder, makeMockOrderRepo, UUID_ORDER, UUID_CUSTOMER } from '../../application/services/_helpers.js';

function makeCtx(params: Record<string, string>, user?: { userId?: string; role?: string }): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ params, user }),
    }),
  } as unknown as ExecutionContext;
}

describe('OwnOrderGuard', () => {
  let repo: ReturnType<typeof makeMockOrderRepo>;
  let guard: OwnOrderGuard;

  beforeEach(() => {
    repo = makeMockOrderRepo();
    guard = new OwnOrderGuard(repo as never);
  });

  it('returns true when no orderId in params', async () => {
    expect(await guard.canActivate(makeCtx({}))).toBe(true);
  });

  it('throws ForbiddenException when no user', async () => {
    await expect(guard.canActivate(makeCtx({ orderId: UUID_ORDER }))).rejects.toThrow(ForbiddenException);
  });

  it('allows admin', async () => {
    const result = await guard.canActivate(
      makeCtx({ orderId: UUID_ORDER }, { userId: 'x', role: 'admin' }),
    );
    expect(result).toBe(true);
  });

  it('allows super_admin', async () => {
    const result = await guard.canActivate(
      makeCtx({ orderId: UUID_ORDER }, { userId: 'x', role: 'super_admin' }),
    );
    expect(result).toBe(true);
  });

  it('throws when order not found', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(
      guard.canActivate(makeCtx({ orderId: UUID_ORDER }, { userId: 'x' })),
    ).rejects.toThrow(ForbiddenException);
  });

  it('throws when user is not owner', async () => {
    repo.findById.mockResolvedValue(makeOrder());
    await expect(
      guard.canActivate(makeCtx({ orderId: UUID_ORDER }, { userId: 'other-user' })),
    ).rejects.toThrow(ForbiddenException);
  });

  it('allows owner', async () => {
    repo.findById.mockResolvedValue(makeOrder());
    const result = await guard.canActivate(
      makeCtx({ orderId: UUID_ORDER }, { userId: UUID_CUSTOMER }),
    );
    expect(result).toBe(true);
  });

  it('also accepts id param', async () => {
    repo.findById.mockResolvedValue(makeOrder());
    const result = await guard.canActivate(
      makeCtx({ id: UUID_ORDER }, { userId: UUID_CUSTOMER }),
    );
    expect(result).toBe(true);
  });
});
