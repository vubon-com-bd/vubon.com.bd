import { jest } from '@jest/globals';

import { GetCartHandler } from '../../../../../src/module/application/queries/cart/get-cart.handler.js';
import { GetCartQuery } from '../../../../../src/module/application/queries/cart/get-cart.query.js';
import type { ICartService } from '../../../../../src/module/application/services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartService> {
  return {
    create: jest.fn(), update: jest.fn(), clear: jest.fn(), delete: jest.fn(),
    getById: jest.fn(), getByUserId: jest.fn(), getSummary: jest.fn(), recalculateTotals: jest.fn(),
  };
}

describe('GetCartHandler', () => {
  it('returns cart for given id', async () => {
    const service = makeService();
    const handler = new GetCartHandler(service);
    service.getById.mockResolvedValue({ id: UUID } as CartResponseDTO);
    const r = await handler.execute(new GetCartQuery(UUID));
    expect(service.getById).toHaveBeenCalledWith(UUID);
    expect(r.id).toBe(UUID);
  });

  it('propagates errors', async () => {
    const service = makeService();
    const handler = new GetCartHandler(service);
    service.getById.mockRejectedValue(new Error('not found'));
    await expect(handler.execute(new GetCartQuery(UUID))).rejects.toThrow('not found');
  });
});
