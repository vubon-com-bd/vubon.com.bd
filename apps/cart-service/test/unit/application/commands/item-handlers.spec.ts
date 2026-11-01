import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AddItemHandler } from '../../../../src/module/application/commands/item/add-item.handler.js';
import { AddItemCommand } from '../../../../src/module/application/commands/item/add-item.command.js';
import { UpdateItemHandler } from '../../../../src/module/application/commands/item/update-item.handler.js';
import { UpdateItemCommand } from '../../../../src/module/application/commands/item/update-item.command.js';
import { RemoveItemHandler } from '../../../../src/module/application/commands/item/remove-item.handler.js';
import { RemoveItemCommand } from '../../../../src/module/application/commands/item/remove-item.command.js';
import { UpdateQuantityHandler } from '../../../../src/module/application/commands/item/update-quantity.handler.js';
import { UpdateQuantityCommand } from '../../../../src/module/application/commands/item/update-quantity.command.js';
import type { ICartItemService } from '../../../../src/module/application/services/interfaces/cart-item.service.interface.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';
const ITEM_ID = '223e4567-e89b-12d3-a456-426614174000';
const PRODUCT_ID = '323e4567-e89b-12d3-a456-426614174000';

function makeService(): jest.Mocked<ICartItemService> {
  return {
    add: jest.fn(),
    update: jest.fn(),
    updateQuantity: jest.fn(),
    remove: jest.fn(),
    select: jest.fn(),
    moveToSaved: jest.fn(),
    getById: jest.fn(),
    getPublic: jest.fn(),
    listByCart: jest.fn(),
    list: jest.fn(),
    countByCart: jest.fn(),
  } as unknown as jest.Mocked<ICartItemService>;
}

describe('Item Command Handlers', () => {
  let service: jest.Mocked<ICartItemService>;

  beforeEach(() => {
    service = makeService();
  });

  describe('AddItemHandler', () => {
    it('should delegate to service.add', async () => {
      service.add.mockResolvedValue({ id: ITEM_ID } as never);

      const handler = new AddItemHandler(service);
      const cmd = new AddItemCommand({
        cartId: CART_ID,
        productId: PRODUCT_ID,
        quantity: 2,
      });
      await handler.execute(cmd);

      expect(service.add).toHaveBeenCalled();
    });

    it('should have correct command type', () => {
      const cmd = new AddItemCommand({
        cartId: CART_ID,
        productId: PRODUCT_ID,
        quantity: 1,
      });
      expect(cmd.type).toBe('cart.item.add');
    });
  });

  describe('UpdateItemHandler', () => {
    it('should delegate to service.update', async () => {
      service.update.mockResolvedValue({ id: ITEM_ID } as never);

      const handler = new UpdateItemHandler(service);
      const cmd = new UpdateItemCommand({ cartId: CART_ID, itemId: ITEM_ID, quantity: 5 });
      await handler.execute(cmd);

      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('RemoveItemHandler', () => {
    it('should delegate to service.remove', async () => {
      service.remove.mockResolvedValue({ success: true } as never);

      const handler = new RemoveItemHandler(service);
      const cmd = new RemoveItemCommand({ cartId: CART_ID, itemId: ITEM_ID });
      await handler.execute(cmd);

      expect(service.remove).toHaveBeenCalled();
    });
  });

  describe('UpdateQuantityHandler', () => {
    it('should delegate to service.updateQuantity', async () => {
      service.updateQuantity.mockResolvedValue({ id: ITEM_ID } as never);

      const handler = new UpdateQuantityHandler(service);
      const cmd = new UpdateQuantityCommand({
        cartId: CART_ID,
        itemId: ITEM_ID,
        quantity: 3,
      });
      await handler.execute(cmd);

      expect(service.updateQuantity).toHaveBeenCalled();
    });
  });
});
