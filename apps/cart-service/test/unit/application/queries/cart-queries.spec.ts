import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetCartHandler } from '../../../../src/module/application/queries/cart/get-cart.handler.js';
import { GetCartQuery } from '../../../../src/module/application/queries/cart/get-cart.query.js';
import { GetCartByUserHandler } from '../../../../src/module/application/queries/cart/get-cart-by-user.handler.js';
import { GetCartByUserQuery } from '../../../../src/module/application/queries/cart/get-cart-by-user.query.js';
import { GetCartSummaryHandler } from '../../../../src/module/application/queries/cart/get-cart-summary.handler.js';
import { GetCartSummaryQuery } from '../../../../src/module/application/queries/cart/get-cart-summary.query.js';
import { GetCartCountHandler } from '../../../../src/module/application/queries/cart/get-cart-count.handler.js';
import { GetCartCountQuery } from '../../../../src/module/application/queries/cart/get-cart-count.query.js';
import type { ICartService } from '../../../../src/module/application/services/interfaces/cart.service.interface.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';
const USER_ID = '223e4567-e89b-12d3-a456-426614174000';

function makeService(): jest.Mocked<ICartService> {
  return {
    create: jest.fn(), update: jest.fn(), clear: jest.fn(),
    delete: jest.fn(), recover: jest.fn(),
    getById: jest.fn(), getPublic: jest.fn(), getDetail: jest.fn(),
    getSummary: jest.fn(), getByUserId: jest.fn(),
    list: jest.fn(), count: jest.fn(), getStats: jest.fn(),
  } as unknown as jest.Mocked<ICartService>;
}

describe('Cart Query Handlers', () => {
  let service: jest.Mocked<ICartService>;

  beforeEach(() => {
    service = makeService();
  });

  describe('GetCartHandler', () => {
    it('should return cart by id', async () => {
      service.getById.mockResolvedValue({ id: CART_ID } as never);

      const handler = new GetCartHandler(service);
      const query = new GetCartQuery(CART_ID);
      const result = await handler.execute(query);

      expect(result.id).toBe(CART_ID);
      expect(service.getById).toHaveBeenCalledWith(CART_ID);
    });

    it('should have correct type', () => {
      const query = new GetCartQuery(CART_ID);
      expect(query.type).toBe('cart.cart.get');
    });
  });

  describe('GetCartByUserHandler', () => {
    it('should return active cart for user', async () => {
      service.getByUserId.mockResolvedValue({ id: CART_ID } as never);

      const handler = new GetCartByUserHandler(service);
      const query = new GetCartByUserQuery(USER_ID);
      const result = await handler.execute(query);

      expect(result?.id).toBe(CART_ID);
    });

    it('should return null when user has no cart', async () => {
      service.getByUserId.mockResolvedValue(null);

      const handler = new GetCartByUserHandler(service);
      const query = new GetCartByUserQuery(USER_ID);
      const result = await handler.execute(query);

      expect(result).toBeNull();
    });
  });

  describe('GetCartSummaryHandler', () => {
    it('should return cart summary', async () => {
      service.getSummary.mockResolvedValue({
        id: CART_ID, itemCount: 3, total: 500, currency: 'BDT',
      });

      const handler = new GetCartSummaryHandler(service);
      const query = new GetCartSummaryQuery(CART_ID);
      const result = await handler.execute(query);

      expect(result.id).toBe(CART_ID);
      expect(result.itemCount).toBe(3);
    });
  });

  describe('GetCartCountHandler', () => {
    it('should return count with user filter', async () => {
      service.count.mockResolvedValue({
        total: 5, byStatus: { active: 3, abandoned: 2 },
      });

      const handler = new GetCartCountHandler(service);
      const query = new GetCartCountQuery(USER_ID);
      const result = await handler.execute(query);

      expect(result.total).toBe(5);
      expect(service.count).toHaveBeenCalledWith({ userId: USER_ID });
    });

    it('should pass undefined when no user filter', async () => {
      service.count.mockResolvedValue({ total: 10, byStatus: {} });

      const handler = new GetCartCountHandler(service);
      const query = new GetCartCountQuery();
      await handler.execute(query);

      expect(service.count).toHaveBeenCalledWith(undefined);
    });
  });
});
