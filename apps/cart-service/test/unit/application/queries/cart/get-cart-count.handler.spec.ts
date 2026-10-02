import { jest } from '@jest/globals';

import { GetCartCountHandler } from '../../../../../src/module/application/queries/cart/get-cart-count.handler.js';
import { GetCartCountQuery } from '../../../../../src/module/application/queries/cart/get-cart-count.query.js';
import type { ICartService } from '../../../../../src/module/application/services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartService> {
  return {
    create: jest.fn(), update: jest.fn(), clear: jest.fn(), delete: jest.fn(),
    getById: jest.fn(), getByUserId: jest.fn(), getSummary: jest.fn(), recalculateTotals: jest.fn(),
  };
}

describe('GetCartCountHandler', () => {
  it('returns itemCount when cart exists', async () => {
    const service = makeService();
    const handler = new GetCartCountHandler(service);
    service.getByUserId.mockResolvedValue({ itemCount: 5 } as CartResponseDTO);
    const r = await handler.execute(new GetCartCountQuery(UUID));
    expect(r).toBe(5);
  });

  it('returns 0 when no cart', async () => {
    const service = makeService();
    const handler = new GetCartCountHandler(service);
    service.getByUserId.mockResolvedValue(null);
    const r = await handler.execute(new GetCartCountQuery(UUID));
    expect(r).toBe(0);
  });
});
