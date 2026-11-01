import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SelectPaymentHandler } from '@application/commands/checkout/select-payment.handler.js';
import { SelectPaymentCommand } from '@application/commands/checkout/select-payment.command.js';
import type { ICheckoutService } from '@application/services/interfaces/checkout.service.interface.js';
import { makeCheckoutEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { CheckoutMapper } from '@application/mappers/checkout.mapper.js';

describe('SelectPaymentHandler', () => {
  let handler: SelectPaymentHandler;
  let service: jest.Mocked<ICheckoutService>;

  beforeEach(() => {
    service = { selectPayment: jest.fn() } as unknown as jest.Mocked<ICheckoutService>;
    handler = new SelectPaymentHandler(service);
  });

  it('delegates to service.selectPayment', async () => {
    const dto = { checkoutId: FIXTURE_ID, paymentMethod: 'bkash' } as never;
    service.selectPayment.mockResolvedValue(CheckoutMapper.toResponse(makeCheckoutEntityStub()));
    await handler.execute(new SelectPaymentCommand(dto, 'admin'));
    expect(service.selectPayment).toHaveBeenCalledWith(dto, 'admin');
  });
});
