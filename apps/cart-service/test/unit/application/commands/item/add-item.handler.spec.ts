import { jest } from '@jest/globals';

/**
 * AddItemHandler — Unit Tests
 */
import { AddItemHandler } from '../../../../../src/module/application/commands/item/add-item.handler.js';
import { AddItemCommand } from '../../../../../src/module/application/commands/item/add-item.command.js';
import type { ICartItemService } from '../../../../../src/module/application/services/interfaces/cart-item.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartItemService> {
  return {
    add: jest.fn(), update: jest.fn(), remove: jest.fn(),
    updateQuantity: jest.fn(), getItem: jest.fn(), listItems: jest.fn(),
  };
}

describe('AddItemHandler', () => {
  let service: jest.Mocked<ICartItemService>;
  let handler: AddItemHandler;

  beforeEach(() => {
    service = makeService();
    handler = new AddItemHandler(service);
  });

  it('delegates to service.add', async () => {
    service.add.mockResolvedValue({ id: UUID } as CartResponseDTO);
    const dto = {
      cartId: UUID,
      productId: UUID,
      sku: 'SKU',
      name: 'Item',
      unitPrice: 100,
      quantity: 1,
      currency: 'BDT',
    };
    const result = await handler.execute(new AddItemCommand(dto));
    expect(service.add).toHaveBeenCalledWith(dto);
    expect(result.id).toBe(UUID);
  });

  it('propagates errors', async () => {
    service.add.mockRejectedValue(new Error('out of stock'));
    await expect(handler.execute(new AddItemCommand({} as never))).rejects.toThrow('out of stock');
  });
});
