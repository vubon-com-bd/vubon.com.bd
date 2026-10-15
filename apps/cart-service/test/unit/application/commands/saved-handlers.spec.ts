import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SaveForLaterHandler } from '../../../../src/module/application/commands/saved/save-for-later.handler.js';
import { SaveForLaterCommand } from '../../../../src/module/application/commands/saved/save-for-later.command.js';
import { MoveToCartHandler } from '../../../../src/module/application/commands/saved/move-to-cart.handler.js';
import { MoveToCartCommand } from '../../../../src/module/application/commands/saved/move-to-cart.command.js';
import { RemoveSavedHandler } from '../../../../src/module/application/commands/saved/remove-saved.handler.js';
import { RemoveSavedCommand } from '../../../../src/module/application/commands/saved/remove-saved.command.js';
import type { ISavedForLaterService } from '../../../../src/module/application/services/interfaces/saved-for-later.service.interface.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';
const ITEM_ID = '223e4567-e89b-12d3-a456-426614174000';
const SAVED_ID = '323e4567-e89b-12d3-a456-426614174000';

function makeService(): jest.Mocked<ISavedForLaterService> {
  return {
    save: jest.fn(),
    moveToCart: jest.fn(),
    remove: jest.fn(),
    getById: jest.fn(),
    getPublicById: jest.fn(),
    listByUser: jest.fn(),
    list: jest.fn(),
  } as unknown as jest.Mocked<ISavedForLaterService>;
}

describe('Saved Command Handlers', () => {
  let service: jest.Mocked<ISavedForLaterService>;

  beforeEach(() => {
    service = makeService();
  });

  describe('SaveForLaterHandler', () => {
    it('should delegate to service.save', async () => {
      service.save.mockResolvedValue({ id: SAVED_ID } as never);

      const handler = new SaveForLaterHandler(service);
      const cmd = new SaveForLaterCommand({ cartId: CART_ID, itemId: ITEM_ID });
      await handler.execute(cmd);

      expect(service.save).toHaveBeenCalled();
    });
  });

  describe('MoveToCartHandler', () => {
    it('should delegate to service.moveToCart', async () => {
      service.moveToCart.mockResolvedValue({ success: true } as never);

      const handler = new MoveToCartHandler(service);
      const cmd = new MoveToCartCommand({ savedItemId: SAVED_ID, cartId: CART_ID, quantity: 1 });
      await handler.execute(cmd);

      expect(service.moveToCart).toHaveBeenCalled();
    });
  });

  describe('RemoveSavedHandler', () => {
    it('should delegate to service.remove', async () => {
      service.remove.mockResolvedValue({ success: true } as never);

      const handler = new RemoveSavedHandler(service);
      const cmd = new RemoveSavedCommand({ savedItemId: SAVED_ID });
      await handler.execute(cmd);

      expect(service.remove).toHaveBeenCalled();
    });
  });
});
