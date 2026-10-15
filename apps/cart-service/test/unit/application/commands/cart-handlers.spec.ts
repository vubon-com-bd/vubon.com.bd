import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CreateCartHandler } from '../../../../src/module/application/commands/cart/create-cart.handler.js';
import { CreateCartCommand } from '../../../../src/module/application/commands/cart/create-cart.command.js';
import { UpdateCartHandler } from '../../../../src/module/application/commands/cart/update-cart.handler.js';
import { UpdateCartCommand } from '../../../../src/module/application/commands/cart/update-cart.command.js';
import { ClearCartHandler } from '../../../../src/module/application/commands/cart/clear-cart.handler.js';
import { ClearCartCommand } from '../../../../src/module/application/commands/cart/clear-cart.command.js';
import { DeleteCartHandler } from '../../../../src/module/application/commands/cart/delete-cart.handler.js';
import { DeleteCartCommand } from '../../../../src/module/application/commands/cart/delete-cart.command.js';
import { RecoverCartHandler } from '../../../../src/module/application/commands/cart/recover-cart.handler.js';
import { RecoverCartCommand } from '../../../../src/module/application/commands/cart/recover-cart.command.js';
import type { ICartService } from '../../../../src/module/application/services/interfaces/cart.service.interface.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';
const USER_ID = '223e4567-e89b-12d3-a456-426614174000';
const NOW = '2024-01-15T10:00:00.000Z';

function makeService(): jest.Mocked<ICartService> {
  return {
    create: jest.fn(),
    update: jest.fn(),
    clear: jest.fn(),
    delete: jest.fn(),
    recover: jest.fn(),
    getById: jest.fn(),
    getPublic: jest.fn(),
    getDetail: jest.fn(),
    getSummary: jest.fn(),
    getByUserId: jest.fn(),
    list: jest.fn(),
    count: jest.fn(),
    getStats: jest.fn(),
  } as unknown as jest.Mocked<ICartService>;
}

describe('Cart Command Handlers', () => {
  let service: jest.Mocked<ICartService>;

  beforeEach(() => {
    service = makeService();
  });

  describe('CreateCartHandler', () => {
    it('should delegate to service.create', async () => {
      const expected = { success: true as const, cartId: CART_ID, type: 'user' as const, status: 'active' as const, createdAt: NOW };
      service.create.mockResolvedValue(expected);

      const handler = new CreateCartHandler(service);
      const cmd = new CreateCartCommand({ type: 'user', currency: 'BDT' }, USER_ID);
      const result = await handler.execute(cmd);

      expect(result).toEqual(expected);
      expect(service.create).toHaveBeenCalledWith(cmd.dto, USER_ID, undefined);
    });

    it('should have correct command type', () => {
      const cmd = new CreateCartCommand({ type: 'user', currency: 'BDT' });
      expect(cmd.type).toBe('cart.cart.create');
    });
  });

  describe('UpdateCartHandler', () => {
    it('should delegate to service.update', async () => {
      const expected = { id: CART_ID } as unknown;
      service.update.mockResolvedValue(expected as never);

      const handler = new UpdateCartHandler(service);
      const cmd = new UpdateCartCommand({ cartId: CART_ID, notes: 'test' }, USER_ID);
      await handler.execute(cmd);

      expect(service.update).toHaveBeenCalledWith(cmd.dto, USER_ID);
    });

    it('should have correct command type', () => {
      const cmd = new UpdateCartCommand({ cartId: CART_ID, notes: 'x' });
      expect(cmd.type).toBe('cart.cart.update');
    });
  });

  describe('ClearCartHandler', () => {
    it('should delegate to service.clear', async () => {
      const expected = { success: true as const, cartId: CART_ID, message: 'Cart cleared', at: NOW };
      service.clear.mockResolvedValue(expected);

      const handler = new ClearCartHandler(service);
      const cmd = new ClearCartCommand({ cartId: CART_ID }, USER_ID);
      const result = await handler.execute(cmd);

      expect(result).toEqual(expected);
    });
  });

  describe('DeleteCartHandler', () => {
    it('should delegate to service.delete', async () => {
      const expected = { success: true as const, cartId: CART_ID, message: 'Cart deleted', at: NOW };
      service.delete.mockResolvedValue(expected);

      const handler = new DeleteCartHandler(service);
      const cmd = new DeleteCartCommand({ cartId: CART_ID, hardDelete: false }, USER_ID);
      await handler.execute(cmd);

      expect(service.delete).toHaveBeenCalled();
    });
  });

  describe('RecoverCartHandler', () => {
    it('should delegate to service.recover', async () => {
      service.recover.mockResolvedValue({ id: CART_ID } as never);

      const handler = new RecoverCartHandler(service);
      const cmd = new RecoverCartCommand({
        abandonedCartId: CART_ID,
        sendNotification: false,
      }, USER_ID);
      await handler.execute(cmd);

      expect(service.recover).toHaveBeenCalled();
    });
  });
});
