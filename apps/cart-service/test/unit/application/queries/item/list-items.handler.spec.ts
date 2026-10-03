import { jest } from '@jest/globals';

import { ListItemsHandler } from '../../../../../src/module/application/queries/item/list-items.handler.js';
import { ListItemsQuery } from '../../../../../src/module/application/queries/item/list-items.query.js';
import type { ICartItemService } from '../../../../../src/module/application/services/interfaces/cart-item.service.interface.js';
import type { CartItemStandaloneResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-item-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartItemService> {
  return {
    add: jest.fn(), update: jest.fn(), remove: jest.fn(),
    updateQuantity: jest.fn(), getItem: jest.fn(), listItems: jest.fn(),
  };
}

describe('ListItemsHandler', () => {
  it('returns list of items', async () => {
    const service = makeService();
    const handler = new ListItemsHandler(service);
    service.listItems.mockResolvedValue([
      { id: 'i1' }, { id: 'i2' },
    ] as unknown as readonly CartItemStandaloneResponseDTO[]);
    const r = await handler.execute(new ListItemsQuery(UUID));
    expect(r.length).toBe(2);
    expect(service.listItems).toHaveBeenCalledWith(UUID);
  });

  it('returns empty array for empty cart', async () => {
    const service = makeService();
    const handler = new ListItemsHandler(service);
    service.listItems.mockResolvedValue([]);
    const r = await handler.execute(new ListItemsQuery(UUID));
    expect(r.length).toBe(0);
  });
});
