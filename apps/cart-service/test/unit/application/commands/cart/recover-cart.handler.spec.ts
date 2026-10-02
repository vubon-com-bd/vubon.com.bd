import { jest } from '@jest/globals';

/**
 * RecoverCartHandler — Unit Tests
 */
import { RecoverCartHandler } from '../../../../../src/module/application/commands/cart/recover-cart.handler.js';
import { RecoverCartCommand } from '../../../../../src/module/application/commands/cart/recover-cart.command.js';
import type { ICartService } from '../../../../../src/module/application/services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartService> {
  return {
    create: jest.fn(), update: jest.fn(), clear: jest.fn(), delete: jest.fn(),
    getById: jest.fn(), getByUserId: jest.fn(), getSummary: jest.fn(), recalculateTotals: jest.fn(),
  };
}

describe('RecoverCartHandler', () => {
  let service: jest.Mocked<ICartService>;
  let handler: RecoverCartHandler;

  beforeEach(() => {
    service = makeService();
    handler = new RecoverCartHandler(service);
  });

  it('calls service.getById (current impl)', async () => {
    service.getById.mockResolvedValue({ id: UUID } as CartResponseDTO);
    const cmd = new RecoverCartCommand({ cartId: UUID, channel: 'email' });
    const result = await handler.execute(cmd);
    expect(service.getById).toHaveBeenCalledWith(UUID);
    expect(result.id).toBe(UUID);
  });

  it('propagates errors', async () => {
    service.getById.mockRejectedValue(new Error('not found'));
    await expect(
      handler.execute(new RecoverCartCommand({ cartId: UUID })),
    ).rejects.toThrow('not found');
  });
});
