import { jest } from '@jest/globals';

import { GetItemHandler } from '../../../../../src/module/application/queries/item/get-item.handler.js';
import { GetItemQuery } from '../../../../../src/module/application/queries/item/get-item.query.js';
import type { ICartItemService } from '../../../../../src/module/application/services/interfaces/cart-item.service.interface.js';
import type { CartItemStandaloneResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-item-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const ITEM = '11111111-1111-1111-1111-111111111111';

function makeService(): jest.Mocked<ICartItemService> {
  return {
    add: jest.fn(), update: jest.fn(), remove: jest.fn(),
    updateQuantity: jest.fn(), getItem: jest.fn(), listItems: jest.fn(),
  };
}

describe('GetItemHandler', () => {
  it('returns item DTO', async () => {
    const service = makeService();
    const handler = new GetItemHandler(service);
    service.getItem.mockResolvedValue({ id: ITEM, cartId: UUID } as CartItemStandaloneResponseDTO);
    const r = await handler.execute(new GetItemQuery(UUID, ITEM));
    expect(service.getItem).toHaveBeenCalledWith(UUID, ITEM);
    expect(r.id).toBe(ITEM);
  });

  it('propagates errors', async () => {
    const service = makeService();
    const handler = new GetItemHandler(service);
    service.getItem.mockRejectedValue(new Error('not found'));
    await expect(handler.execute(new GetItemQuery(UUID, 'x'))).rejects.toThrow('not found');
  });
});
