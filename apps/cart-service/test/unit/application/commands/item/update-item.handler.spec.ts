import { jest } from '@jest/globals';

import { UpdateItemHandler } from '../../../../../src/module/application/commands/item/update-item.handler.js';
import { UpdateItemCommand } from '../../../../../src/module/application/commands/item/update-item.command.js';
import type { ICartItemService } from '../../../../../src/module/application/services/interfaces/cart-item.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartItemService> {
  return {
    add: jest.fn(), update: jest.fn(), remove: jest.fn(),
    updateQuantity: jest.fn(), getItem: jest.fn(), listItems: jest.fn(),
  };
}

describe('UpdateItemHandler', () => {
  it('delegates to service.update', async () => {
    const service = makeService();
    const handler = new UpdateItemHandler(service);
    service.update.mockResolvedValue({ id: UUID } as CartResponseDTO);
    const dto = { cartId: UUID, itemId: UUID, quantity: 5 };
    await handler.execute(new UpdateItemCommand(dto));
    expect(service.update).toHaveBeenCalledWith(dto);
  });
});
