import { jest } from '@jest/globals';

import { GetCartAnalyticsHandler } from '../../../../../src/module/application/queries/analytics/get-cart-analytics.handler.js';
import { GetCartAnalyticsQuery } from '../../../../../src/module/application/queries/analytics/get-cart-analytics.query.js';
import { CartEntity } from '../../../../../src/module/domain/entities/cart.entity.js';
import { CartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import type { CartRepository } from '../../../../../src/module/domain/repositories/cart.repository.interface.js';
import { CART_STATUS, CART_TYPE } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeRepo(): jest.Mocked<CartRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(async (c) => c), delete: jest.fn(), exists: jest.fn(),
    findByUserId: jest.fn(), findBySessionId: jest.fn(), findActiveByUserId: jest.fn(),
    findAllByUserId: jest.fn(), findExpired: jest.fn(), findInactive: jest.fn(),
    findPaginated: jest.fn(), countByUserId: jest.fn(), softDelete: jest.fn(),
  };
}

function makeCart(status: string = CART_STATUS.ACTIVE) {
  return CartEntity.create({
    id: UUID,
    now: NOW,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(status),
      userId: CartUserIdVO.create(USER),
      currency: 'BDT',
      expiresAt: FUTURE,
      lastActivityAt: NOW,
    },
  });
}

describe('GetCartAnalyticsHandler', () => {
  it('computes analytics from all carts', async () => {
    const repo = makeRepo();
    const handler = new GetCartAnalyticsHandler(repo);
    repo.findAll.mockResolvedValue([
      makeCart(CART_STATUS.ACTIVE),
      makeCart(CART_STATUS.CONVERTED),
      makeCart(CART_STATUS.ABANDONED),
      makeCart(CART_STATUS.ACTIVE),
    ]);
    const r = await handler.execute(new GetCartAnalyticsQuery());
    expect(r.totalCarts).toBe(4);
    expect(r.activeCarts).toBe(2);
    expect(r.convertedCarts).toBe(1);
    expect(r.abandonedCarts).toBe(1);
    expect(r.conversionRate).toBe(25);
  });

  it('returns 0 conversion rate for empty carts', async () => {
    const repo = makeRepo();
    const handler = new GetCartAnalyticsHandler(repo);
    repo.findAll.mockResolvedValue([]);
    const r = await handler.execute(new GetCartAnalyticsQuery());
    expect(r.totalCarts).toBe(0);
    expect(r.conversionRate).toBe(0);
  });

  it('passes date filters', async () => {
    const repo = makeRepo();
    const handler = new GetCartAnalyticsHandler(repo);
    repo.findAll.mockResolvedValue([]);
    const r = await handler.execute(new GetCartAnalyticsQuery('2026-01-01', '2026-12-31'));
    expect(r.from).toBe('2026-01-01');
    expect(r.to).toBe('2026-12-31');
  });
});
