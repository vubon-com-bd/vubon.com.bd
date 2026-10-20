import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ConfirmCheckoutHandler } from '@application/commands/checkout/confirm-checkout.handler.js';
import { ConfirmCheckoutCommand } from '@application/commands/checkout/confirm-checkout.command.js';
import type { ICheckoutService } from '@application/services/interfaces/checkout.service.interface.js';
import { FIXTURE_ID } from '@fixtures/application/entity-factories.js';

describe('ConfirmCheckoutHandler', () => {
  let handler: ConfirmCheckoutHandler;
  let service: jest.Mocked<ICheckoutService>;

  beforeEach(() => {
    service = { confirm: jest.fn() } as unknown as jest.Mocked<ICheckoutService>;
    handler = new ConfirmCheckoutHandler(service);
  });

  it('delegates to service.confirm', async () => {
    const dto = { checkoutId: FIXTURE_ID } as never;
    service.confirm.mockResolvedValue({
      success: true,
      checkoutId: FIXTURE_ID,
      orderId: FIXTURE_ID,
      orderNumber: 'ORD-1',
    });
    await handler.execute(new ConfirmCheckoutCommand(dto, 'admin'));
    expect(service.confirm).toHaveBeenCalledWith(dto, 'admin');
  });
});
