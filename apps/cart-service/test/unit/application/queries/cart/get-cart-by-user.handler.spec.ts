import { jest } from '@jest/globals';

import { GetCartByUserHandler } from '../../../../../src/module/application/queries/cart/get-cart-by-user.handler.js';
import { GetCartByUserQuery } from '../../../../../src/module/application/queries/cart/get-cart-by-user.query.js';
import type { ICartService } from '../../../../../src/module/application/services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartService> {
  return {
    create: jest.fn(), update: jest.fn(), clear: jest.fn(), delete: jest.fn(),
    getById: jest.fn(), getByUserId: jest.fn(), getSummary: jest.fn(), recalculateTotals: jest.fn(),
  };
}

describe('GetCartByUserHandler', () => {
  it('returns cart for user', async () => {
    const service = makeService();
    const handler = new GetCartByUserHandler(service);
    service.getByUserId.mockResolvedValue({ id: UUID } as CartResponseDTO);
    const r = await handler.execute(new GetCartByUserQuery(UUID));
    expect(service.getByUserId).toHaveBeenCalledWith(UUID);
    expect(r?.id).toBe(UUID);
  });

  it('returns null when no cart', async () => {
    const service = makeService();
    const handler = new GetCartByUserHandler(service);
    service.getByUserId.mockResolvedValue(null);
    const r = await handler.execute(new GetCartByUserQuery(UUID));
    expect(r).toBeNull();
  });
});
