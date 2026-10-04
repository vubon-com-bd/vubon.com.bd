import { jest } from '@jest/globals';

/**
 * DeleteCartHandler — Unit Tests
 */
import { DeleteCartHandler } from '../../../../../src/module/application/commands/cart/delete-cart.handler.js';
import { DeleteCartCommand } from '../../../../../src/module/application/commands/cart/delete-cart.command.js';
import type { ICartService } from '../../../../../src/module/application/services/interfaces/cart.service.interface.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartService> {
  return {
    create: jest.fn(), update: jest.fn(), clear: jest.fn(), delete: jest.fn(),
    getById: jest.fn(), getByUserId: jest.fn(), getSummary: jest.fn(), recalculateTotals: jest.fn(),
  };
}

describe('DeleteCartHandler', () => {
  let service: jest.Mocked<ICartService>;
  let handler: DeleteCartHandler;

  beforeEach(() => {
    service = makeService();
    handler = new DeleteCartHandler(service);
  });

  it('delegates to service.delete', async () => {
    service.delete.mockResolvedValue();
    const dto = { cartId: UUID, deletedBy: 'admin-1' };
    await handler.execute(new DeleteCartCommand(dto));
    expect(service.delete).toHaveBeenCalledWith(dto);
  });

  it('propagates errors', async () => {
    service.delete.mockRejectedValue(new Error('cannot delete'));
    await expect(handler.execute(new DeleteCartCommand({ cartId: UUID }))).rejects.toThrow('cannot delete');
  });
});
