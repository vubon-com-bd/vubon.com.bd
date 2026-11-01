/**
 * CartVoucherController — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartVoucherController } from '../../../../src/module/interfaces/controllers/rest/cart-voucher.controller.js';
import { createMockCommandBus } from '../../../fixtures/interfaces/command-handler.fixture.js';
import { CART_ID } from '../../../fixtures/interfaces/http-dto.fixture.js';
import { createAuthUser } from '../../../fixtures/interfaces/http-request.fixture.js';

describe('CartVoucherController', () => {
  let controller: CartVoucherController;
  let cmdBus: ReturnType<typeof createMockCommandBus>;

  beforeEach(() => {
    cmdBus = createMockCommandBus();
    controller = new CartVoucherController(cmdBus.bus);
  });

  it('should dispatch ApplyVoucherCommand', async () => {
    await controller.apply(
      CART_ID,
      { code: 'GIFT2026ABC' } as never,
      createAuthUser(),
    );
    expect(cmdBus.executed.length).toBe(1);
  });

  it('should dispatch RemoveVoucherCommand', async () => {
    await controller.remove(CART_ID, { code: 'GIFT2026ABC' } as never, createAuthUser());
    expect(cmdBus.executed.length).toBe(1);
  });
});
