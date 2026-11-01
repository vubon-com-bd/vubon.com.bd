import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetTotalsHandler } from '../../../../src/module/application/queries/totals/get-totals.handler.js';
import { GetTotalsQuery } from '../../../../src/module/application/queries/totals/get-totals.query.js';
import type { ICartTaxService } from '../../../../src/module/application/services/interfaces/cart-tax.service.interface.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';

function makeService(): jest.Mocked<ICartTaxService> {
  return {
    calculate: jest.fn(),
    recalculate: jest.fn(),
  } as unknown as jest.Mocked<ICartTaxService>;
}

describe('Totals Query Handlers', () => {
  let service: jest.Mocked<ICartTaxService>;

  beforeEach(() => {
    service = makeService();
  });

  describe('GetTotalsHandler', () => {
    it('should calculate totals with defaults', async () => {
      service.calculate.mockResolvedValue({
        subtotal: 1000, discount: 0, taxableBase: 1000, tax: 150,
        shipping: 60, total: 1210, currency: 'BDT', itemCount: 3,
      });

      const handler = new GetTotalsHandler(service);
      const query = new GetTotalsQuery(CART_ID);
      const result = await handler.execute(query);

      expect(result.total).toBe(1210);
      expect(result.tax).toBe(150);
    });

    it('should pass tax rate override', async () => {
      service.calculate.mockResolvedValue({
        subtotal: 1000, discount: 0, taxableBase: 1000, tax: 100,
        shipping: 0, total: 1100, currency: 'BDT', itemCount: 3,
      });

      const handler = new GetTotalsHandler(service);
      const query = new GetTotalsQuery(CART_ID, 10, false);
      await handler.execute(query);

      expect(service.calculate).toHaveBeenCalledWith(CART_ID, 10, false);
    });

    it('should have correct type', () => {
      const query = new GetTotalsQuery(CART_ID);
      expect(query.type).toBe('cart.totals.get');
    });
  });
});
