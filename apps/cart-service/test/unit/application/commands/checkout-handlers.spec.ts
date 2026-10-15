import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ProceedToCheckoutHandler } from '../../../../src/module/application/commands/checkout/proceed-to-checkout.handler.js';
import { ProceedToCheckoutCommand } from '../../../../src/module/application/commands/checkout/proceed-to-checkout.command.js';
import type { ICartService } from '../../../../src/module/application/services/interfaces/cart.service.interface.js';
import { ProceedToCheckoutError } from '../../../../src/module/application/errors/checkout.errors.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';

function makeService(): jest.Mocked<ICartService> {
  return {
    create: jest.fn(),
    update: jest.fn(),
    clear: jest.fn(),
    delete: jest.fn(),
    recover: jest.fn(),
    getById: jest.fn(),
    getPublic: jest.fn(),
    getDetail: jest.fn(),
    getSummary: jest.fn(),
    getByUserId: jest.fn(),
    list: jest.fn(),
    count: jest.fn(),
    getStats: jest.fn(),
  } as unknown as jest.Mocked<ICartService>;
}

describe('Checkout Command Handlers', () => {
  let service: jest.Mocked<ICartService>;

  beforeEach(() => {
    service = makeService();
  });

  describe('ProceedToCheckoutHandler', () => {
    it('should return cart when itemCount > 0', async () => {
      service.getById.mockResolvedValue({ id: CART_ID, itemCount: 3 } as never);

      const handler = new ProceedToCheckoutHandler(service);
      const cmd = new ProceedToCheckoutCommand({ cartId: CART_ID });
      const result = await handler.execute(cmd);

      expect(result.id).toBe(CART_ID);
    });

    it('should throw when cart is empty', async () => {
      service.getById.mockResolvedValue({ id: CART_ID, itemCount: 0 } as never);

      const handler = new ProceedToCheckoutHandler(service);
      const cmd = new ProceedToCheckoutCommand({ cartId: CART_ID });

      await expect(handler.execute(cmd)).rejects.toThrow(ProceedToCheckoutError);
    });

    it('should have correct type', () => {
      const cmd = new ProceedToCheckoutCommand({ cartId: CART_ID });
      expect(cmd.type).toBe('cart.checkout.proceed');
    });
  });
});
