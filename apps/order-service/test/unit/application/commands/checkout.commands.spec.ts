import { jest } from '@jest/globals';
import { StartCheckoutHandler } from '../../../../src/module/application/commands/checkout/start-checkout.handler.js';
import { SelectAddressHandler } from '../../../../src/module/application/commands/checkout/select-address.handler.js';
import { SelectShippingHandler } from '../../../../src/module/application/commands/checkout/select-shipping.handler.js';
import { SelectPaymentHandler } from '../../../../src/module/application/commands/checkout/select-payment.handler.js';
import { ConfirmCheckoutHandler } from '../../../../src/module/application/commands/checkout/confirm-checkout.handler.js';
import { AbandonCheckoutHandler } from '../../../../src/module/application/commands/checkout/abandon-checkout.handler.js';
import { StartCheckoutCommand } from '../../../../src/module/application/commands/checkout/start-checkout.command.js';
import { ConfirmCheckoutCommand } from '../../../../src/module/application/commands/checkout/confirm-checkout.command.js';
import { AbandonCheckoutCommand } from '../../../../src/module/application/commands/checkout/abandon-checkout.command.js';
import { CHECKOUT_COMMAND_HANDLERS } from '../../../../src/module/application/commands/checkout/index.js';

function mockService() {
  return {
    start: jest.fn().mockResolvedValue({}),
    selectAddress: jest.fn().mockResolvedValue({}),
    selectShipping: jest.fn().mockResolvedValue({}),
    selectPayment: jest.fn().mockResolvedValue({}),
    confirm: jest.fn().mockResolvedValue({}),
    abandon: jest.fn().mockResolvedValue({}),
  };
}

describe('Checkout command handlers', () => {
  let service: ReturnType<typeof mockService>;
  beforeEach(() => { service = mockService(); });

  it('StartCheckoutHandler', async () => {
    const h = new StartCheckoutHandler(service as never);
    await h.execute(new StartCheckoutCommand({} as never, 'actor-1'));
    expect(service.start).toHaveBeenCalled();
  });

  it('SelectAddressHandler', async () => {
    const h = new SelectAddressHandler(service as never);
    await h.execute({ dto: {}, actorId: 'a' } as never);
    expect(service.selectAddress).toHaveBeenCalled();
  });

  it('SelectShippingHandler', async () => {
    const h = new SelectShippingHandler(service as never);
    await h.execute({ dto: {}, actorId: 'a' } as never);
    expect(service.selectShipping).toHaveBeenCalled();
  });

  it('SelectPaymentHandler', async () => {
    const h = new SelectPaymentHandler(service as never);
    await h.execute({ dto: {}, actorId: 'a' } as never);
    expect(service.selectPayment).toHaveBeenCalled();
  });

  it('ConfirmCheckoutHandler', async () => {
    const h = new ConfirmCheckoutHandler(service as never);
    await h.execute(new ConfirmCheckoutCommand({} as never));
    expect(service.confirm).toHaveBeenCalled();
  });

  it('AbandonCheckoutHandler', async () => {
    const h = new AbandonCheckoutHandler(service as never);
    await h.execute(new AbandonCheckoutCommand({} as never));
    expect(service.abandon).toHaveBeenCalled();
  });

  it('CHECKOUT_COMMAND_HANDLERS exports 6', () => {
    expect(CHECKOUT_COMMAND_HANDLERS).toHaveLength(6);
  });
});
