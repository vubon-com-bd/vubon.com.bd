/**
 * CartController — Unit Tests
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { CartController } from '../../../../src/module/interfaces/controllers/rest/cart.controller.js';
import { createMockCommandBus, createMockQueryBus } from '../../../fixtures/interfaces/command-handler.fixture.js';
import { makeCreateCartDto, makeListCartsQuery, CART_ID } from '../../../fixtures/interfaces/http-dto.fixture.js';
import { createAuthUser } from '../../../fixtures/interfaces/http-request.fixture.js';

describe('CartController', () => {
  let controller: CartController;
  let cmdBus: ReturnType<typeof createMockCommandBus>;
  let qryBus: ReturnType<typeof createMockQueryBus>;

  beforeEach(() => {
    cmdBus = createMockCommandBus();
    qryBus = createMockQueryBus({ id: CART_ID, type: 'user', status: 'active' });
    controller = new CartController(cmdBus.bus, qryBus.bus);
  });

  describe('create', () => {
    it('should dispatch CreateCartCommand', async () => {
      const dto = makeCreateCartDto();
      const user = createAuthUser();
      await controller.create(dto, user);
      expect(cmdBus.executed.length).toBe(1);
      expect((cmdBus.executed[0] as { type: string }).type).toBe('cart.cart.create');
    });

    it('should pass idempotencyKey', async () => {
      const dto = makeCreateCartDto();
      const user = createAuthUser();
      await controller.create(dto, user, 'idem-key-abc');
      expect(cmdBus.executed.length).toBe(1);
    });
  });

  describe('getById', () => {
    it('should dispatch GetCartQuery', async () => {
      await controller.getById(CART_ID);
      expect(qryBus.executed.length).toBe(1);
    });
  });

  describe('summary', () => {
    it('should dispatch GetCartSummaryQuery', async () => {
      qryBus.mockExecute.mockImplementationOnce(async (q: unknown) => {
        qryBus.executed.push(q);
        return {
          id: CART_ID,
          itemCount: 3,
          total: 100,
          currency: 'BDT',
        };
      });
      const result = await controller.summary(CART_ID);
      expect(qryBus.executed.length).toBe(1);
      expect(result.id).toBe(CART_ID);
    });
  });

  describe('count', () => {
    it('should dispatch GetCartCountQuery', async () => {
      qryBus.mockExecute.mockImplementationOnce(async (q: unknown) => {
        qryBus.executed.push(q);
        return {
          total: 0,
          byStatus: {},
        };
      });
      const result = await controller.count(createAuthUser());
      expect(qryBus.executed.length).toBe(1);
      expect(result.total).toBe(0);
    });
  });
});
