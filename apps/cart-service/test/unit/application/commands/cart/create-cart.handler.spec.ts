import { jest } from '@jest/globals';

/**
 * CreateCartHandler — Unit Tests
 */
import { CreateCartHandler } from '../../../../../src/module/application/commands/cart/create-cart.handler.js';
import { CreateCartCommand } from '../../../../../src/module/application/commands/cart/create-cart.command.js';
import type { ICartService } from '../../../../../src/module/application/services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';

function makeService(): jest.Mocked<ICartService> {
  return {
    create: jest.fn(),
    update: jest.fn(),
    clear: jest.fn(),
    delete: jest.fn(),
    getById: jest.fn(),
    getByUserId: jest.fn(),
    getSummary: jest.fn(),
    recalculateTotals: jest.fn(),
  };
}

describe('CreateCartHandler', () => {
  let service: jest.Mocked<ICartService>;
  let handler: CreateCartHandler;

  beforeEach(() => {
    service = makeService();
    handler = new CreateCartHandler(service);
  });

  it('delegates to service.create with dto + actorId', async () => {
    const expected = { id: UUID } as CartResponseDTO;
    service.create.mockResolvedValue(expected);
    const dto = { type: 'user' as const, userId: USER, currency: 'BDT' };
    const cmd = new CreateCartCommand(dto, USER);

    const result = await handler.execute(cmd);

    expect(service.create).toHaveBeenCalledWith(dto, USER);
    expect(result).toBe(expected);
  });

  it('passes undefined actorId when not provided', async () => {
    service.create.mockResolvedValue({} as CartResponseDTO);
    const cmd = new CreateCartCommand({});
    await handler.execute(cmd);
    expect(service.create).toHaveBeenCalledWith({}, undefined);
  });

  it('propagates service errors', async () => {
    service.create.mockRejectedValue(new Error('boom'));
    await expect(handler.execute(new CreateCartCommand({}))).rejects.toThrow('boom');
  });
});
