import { jest } from '@jest/globals';

/**
 * ClearCartHandler — Unit Tests
 */
import { ClearCartHandler } from '../../../../../src/module/application/commands/cart/clear-cart.handler.js';
import { ClearCartCommand } from '../../../../../src/module/application/commands/cart/clear-cart.command.js';
import type { ICartService } from '../../../../../src/module/application/services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartService> {
  return {
    create: jest.fn(), update: jest.fn(), clear: jest.fn(), delete: jest.fn(),
    getById: jest.fn(), getByUserId: jest.fn(), getSummary: jest.fn(), recalculateTotals: jest.fn(),
  };
}

describe('ClearCartHandler', () => {
  let service: jest.Mocked<ICartService>;
  let handler: ClearCartHandler;

  beforeEach(() => {
    service = makeService();
    handler = new ClearCartHandler(service);
  });

  it('delegates to service.clear', async () => {
    service.clear.mockResolvedValue({ id: UUID } as CartResponseDTO);
    const dto = { cartId: UUID, clearedBy: 'user-1' };
    const result = await handler.execute(new ClearCartCommand(dto));
    expect(service.clear).toHaveBeenCalledWith(dto);
    expect(result.id).toBe(UUID);
  });
});
