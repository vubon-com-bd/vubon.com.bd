import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CreateGuestCartHandler } from '../../../../src/module/application/commands/guest/create-guest-cart.handler.js';
import { CreateGuestCartCommand } from '../../../../src/module/application/commands/guest/create-guest-cart.command.js';
import { MergeGuestCartHandler } from '../../../../src/module/application/commands/guest/merge-guest-cart.handler.js';
import { MergeGuestCartCommand } from '../../../../src/module/application/commands/guest/merge-guest-cart.command.js';
import type { IGuestCartService } from '../../../../src/module/application/services/interfaces/guest-cart.service.interface.js';

const USER_ID = '123e4567-e89b-12d3-a456-426614174000';
const TOKEN = 'guest-token-abcdefghijklmnopqrst';

function makeService(): jest.Mocked<IGuestCartService> {
  return {
    create: jest.fn(),
    merge: jest.fn(),
    getById: jest.fn(),
    getPublicById: jest.fn(),
    findByToken: jest.fn(),
    expire: jest.fn(),
    abandon: jest.fn(),
  } as unknown as jest.Mocked<IGuestCartService>;
}

describe('Guest Command Handlers', () => {
  let service: jest.Mocked<IGuestCartService>;

  beforeEach(() => {
    service = makeService();
  });

  describe('CreateGuestCartHandler', () => {
    it('should delegate to service.create', async () => {
      service.create.mockResolvedValue({
        success: true,
        guestCartId: 'some-id',
        token: TOKEN,
        expiresAt: '2099-01-01T00:00:00Z',
      });

      const handler = new CreateGuestCartHandler(service);
      const cmd = new CreateGuestCartCommand({ currency: 'BDT' });
      await handler.execute(cmd);

      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('MergeGuestCartHandler', () => {
    it('should delegate to service.merge', async () => {
      service.merge.mockResolvedValue({ mergerId: 'm-1' } as never);

      const handler = new MergeGuestCartHandler(service);
      const cmd = new MergeGuestCartCommand({
        guestToken: TOKEN,
        userId: USER_ID,
        strategy: 'sum_quantity',
      });
      await handler.execute(cmd);

      expect(service.merge).toHaveBeenCalled();
    });

    it('should have correct type', () => {
      const cmd = new MergeGuestCartCommand({
        guestToken: TOKEN,
        userId: USER_ID,
      });
      expect(cmd.type).toBe('cart.guest.merge');
    });
  });
});
