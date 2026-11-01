import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ApplyVoucherHandler } from '../../../../src/module/application/commands/voucher/apply-voucher.handler.js';
import { ApplyVoucherCommand } from '../../../../src/module/application/commands/voucher/apply-voucher.command.js';
import { RemoveVoucherHandler } from '../../../../src/module/application/commands/voucher/remove-voucher.handler.js';
import { RemoveVoucherCommand } from '../../../../src/module/application/commands/voucher/remove-voucher.command.js';
import type { ICartVoucherService } from '../../../../src/module/application/services/interfaces/cart-voucher.service.interface.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';

function makeService(): jest.Mocked<ICartVoucherService> {
  return {
    apply: jest.fn(),
    remove: jest.fn(),
    validate: jest.fn(),
    getByCartId: jest.fn(),
    getPublicByCartId: jest.fn(),
  } as unknown as jest.Mocked<ICartVoucherService>;
}

describe('Voucher Command Handlers', () => {
  let service: jest.Mocked<ICartVoucherService>;

  beforeEach(() => {
    service = makeService();
  });

  describe('ApplyVoucherHandler', () => {
    it('should delegate to service.apply', async () => {
      service.apply.mockResolvedValue({ code: 'GIFT12345678' } as never);

      const handler = new ApplyVoucherHandler(service);
      const cmd = new ApplyVoucherCommand({ cartId: CART_ID, code: 'GIFT12345678' });
      await handler.execute(cmd);

      expect(service.apply).toHaveBeenCalled();
    });

    it('should have correct type', () => {
      const cmd = new ApplyVoucherCommand({ cartId: CART_ID, code: 'GIFT12345678' });
      expect(cmd.type).toBe('cart.voucher.apply');
    });
  });

  describe('RemoveVoucherHandler', () => {
    it('should delegate to service.remove', async () => {
      service.remove.mockResolvedValue({ success: true } as never);

      const handler = new RemoveVoucherHandler(service);
      const cmd = new RemoveVoucherCommand({ cartId: CART_ID, code: 'GIFT12345678' });
      await handler.execute(cmd);

      expect(service.remove).toHaveBeenCalled();
    });
  });
});
