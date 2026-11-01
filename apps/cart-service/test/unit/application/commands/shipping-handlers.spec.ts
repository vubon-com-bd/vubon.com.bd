import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SetShippingMethodHandler } from '../../../../src/module/application/commands/shipping/set-shipping-method.handler.js';
import { SetShippingMethodCommand } from '../../../../src/module/application/commands/shipping/set-shipping-method.command.js';
import { CalculateShippingHandler } from '../../../../src/module/application/commands/shipping/calculate-shipping.handler.js';
import { CalculateShippingCommand } from '../../../../src/module/application/commands/shipping/calculate-shipping.command.js';
import type { ICartShippingService } from '../../../../src/module/application/services/interfaces/cart-shipping.service.interface.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';

function makeService(): jest.Mocked<ICartShippingService> {
  return {
    setMethod: jest.fn(),
    calculate: jest.fn(),
    clear: jest.fn(),
  } as unknown as jest.Mocked<ICartShippingService>;
}

describe('Shipping Command Handlers', () => {
  let service: jest.Mocked<ICartShippingService>;

  beforeEach(() => {
    service = makeService();
  });

  describe('SetShippingMethodHandler', () => {
    it('should delegate to service.setMethod', async () => {
      service.setMethod.mockResolvedValue({ shipping: 60 } as never);

      const handler = new SetShippingMethodHandler(service);
      const cmd = new SetShippingMethodCommand({ cartId: CART_ID, method: 'standard' });
      await handler.execute(cmd);

      expect(service.setMethod).toHaveBeenCalled();
    });

    it('should have correct type', () => {
      const cmd = new SetShippingMethodCommand({ cartId: CART_ID, method: 'standard' });
      expect(cmd.type).toBe('cart.shipping.set_method');
    });
  });

  describe('CalculateShippingHandler', () => {
    it('should delegate to service.calculate', async () => {
      service.calculate.mockResolvedValue({ cost: 60, isFree: false } as never);

      const handler = new CalculateShippingHandler(service);
      const cmd = new CalculateShippingCommand({ cartId: CART_ID, method: 'standard' });
      const result = await handler.execute(cmd);

      expect(result.cost).toBe(60);
    });
  });
});
