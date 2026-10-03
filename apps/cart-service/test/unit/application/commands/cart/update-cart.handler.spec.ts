import { jest } from '@jest/globals';

/**
 * UpdateCartHandler — Unit Tests
 */
import { UpdateCartHandler } from '../../../../../src/module/application/commands/cart/update-cart.handler.js';
import { UpdateCartCommand } from '../../../../../src/module/application/commands/cart/update-cart.command.js';
import type { ICartService } from '../../../../../src/module/application/services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartService> {
  return {
    create: jest.fn(), update: jest.fn(), clear: jest.fn(), delete: jest.fn(),
    getById: jest.fn(), getByUserId: jest.fn(), getSummary: jest.fn(), recalculateTotals: jest.fn(),
  };
}

describe('UpdateCartHandler', () => {
  let service: jest.Mocked<ICartService>;
  let handler: UpdateCartHandler;

  beforeEach(() => {
    service = makeService();
    handler = new UpdateCartHandler(service);
  });

  it('delegates to service.update with cartId + dto', async () => {
    service.update.mockResolvedValue({ id: UUID } as CartResponseDTO);
    const dto = { notes: 'test note' };
    const cmd = new UpdateCartCommand(UUID, dto);
    const result = await handler.execute(cmd);
    expect(service.update).toHaveBeenCalledWith(dto, UUID);
    expect(result.id).toBe(UUID);
  });

  it('propagates errors', async () => {
    service.update.mockRejectedValue(new Error('not found'));
    await expect(handler.execute(new UpdateCartCommand(UUID, {}))).rejects.toThrow('not found');
  });
});
