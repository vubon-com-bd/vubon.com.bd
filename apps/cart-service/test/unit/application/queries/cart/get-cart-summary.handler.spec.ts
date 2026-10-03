import { jest } from '@jest/globals';

import { GetCartSummaryHandler } from '../../../../../src/module/application/queries/cart/get-cart-summary.handler.js';
import { GetCartSummaryQuery } from '../../../../../src/module/application/queries/cart/get-cart-summary.query.js';
import type { ICartService } from '../../../../../src/module/application/services/interfaces/cart.service.interface.js';
import type { CartSummaryResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-summary-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartService> {
  return {
    create: jest.fn(), update: jest.fn(), clear: jest.fn(), delete: jest.fn(),
    getById: jest.fn(), getByUserId: jest.fn(), getSummary: jest.fn(), recalculateTotals: jest.fn(),
  };
}

describe('GetCartSummaryHandler', () => {
  it('returns summary', async () => {
    const service = makeService();
    const handler = new GetCartSummaryHandler(service);
    service.getSummary.mockResolvedValue({ id: UUID, itemCount: 5 } as CartSummaryResponseDTO);
    const r = await handler.execute(new GetCartSummaryQuery(UUID));
    expect(service.getSummary).toHaveBeenCalledWith(UUID);
    expect(r.itemCount).toBe(5);
  });
});
