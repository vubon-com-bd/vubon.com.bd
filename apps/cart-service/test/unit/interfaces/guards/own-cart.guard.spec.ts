import { jest } from '@jest/globals';

import { OwnCartGuard } from '../../../../src/module/interfaces/guards/own-cart.guard.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import { CART_STATUS, CART_TYPE } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';
const OTHER_USER = '00000000-0000-0000-0000-000000000002';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeRepo(): jest.Mocked<CartRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(), delete: jest.fn(), exists: jest.fn(),
    findByUserId: jest.fn(), findBySessionId: jest.fn(), findActiveByUserId: jest.fn(),
    findAllByUserId: jest.fn(), findExpired: jest.fn(), findInactive: jest.fn(),
    findPaginated: jest.fn(), countByUserId: jest.fn(), softDelete: jest.fn(),
  };
}

function makeCart(userId = USER) {
  return CartEntity.create({
    id: UUID, now: NOW,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(CART_STATUS.ACTIVE),
      userId: CartUserIdVO.create(userId),
      currency: 'BDT', expiresAt: FUTURE, lastActivityAt: NOW,
    },
  });
}

function makeCtx(params: Record<string, string>, user?: { userId?: string; role?: string }) {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ params, user }),
    }),
  } as unknown as Parameters<OwnCartGuard['canActivate']>[0];
}

describe('OwnCartGuard', () => {
  let repo: jest.Mocked<CartRepository>;
  let guard: OwnCartGuard;

  beforeEach(() => {
    repo = makeRepo();
    guard = new OwnCartGuard(repo);
  });

  it('returns true when no cartId in params', async () => {
    expect(await guard.canActivate(makeCtx({}))).toBe(true);
  });

  it('returns true for admin', async () => {
    repo.findById.mockResolvedValue(makeCart(OTHER_USER));
    const r = await guard.canActivate(makeCtx({ cartId: UUID }, { userId: USER, role: 'admin' }));
    expect(r).toBe(true);
  });

  it('returns true when user owns cart', async () => {
    repo.findById.mockResolvedValue(makeCart(USER));
    expect(await guard.canActivate(makeCtx({ cartId: UUID }, { userId: USER }))).toBe(true);
  });

  it('throws when no auth', async () => {
    await expect(guard.canActivate(makeCtx({ cartId: UUID }))).rejects.toThrow();
  });

  it('throws when cart not found', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(
      guard.canActivate(makeCtx({ cartId: UUID }, { userId: USER })),
    ).rejects.toThrow();
  });

  it('throws when user does not own cart', async () => {
    repo.findById.mockResolvedValue(makeCart(OTHER_USER));
    await expect(
      guard.canActivate(makeCtx({ cartId: UUID }, { userId: USER })),
    ).rejects.toThrow();
  });
});
