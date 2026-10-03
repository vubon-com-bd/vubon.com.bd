import { jest } from '@jest/globals';

import { RemoveItemHandler } from '../../../../../src/module/application/commands/item/remove-item.handler.js';
import { RemoveItemCommand } from '../../../../../src/module/application/commands/item/remove-item.command.js';
import type { ICartItemService } from '../../../../../src/module/application/services/interfaces/cart-item.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartItemService> {
  return {
    add: jest.fn(), update: jest.fn(), remove: jest.fn(),
    updateQuantity: jest.fn(), getItem: jest.fn(), listItems: jest.fn(),
  };
}

describe('RemoveItemHandler', () => {
  it('delegates to service.remove', async () => {
    const service = makeService();
    const handler = new RemoveItemHandler(service);
    service.remove.mockResolvedValue({ id: UUID } as CartResponseDTO);
    const dto = { cartId: UUID, itemId: UUID };
    await handler.execute(new RemoveItemCommand(dto));
    expect(service.remove).toHaveBeenCalledWith(dto);
  });
});
