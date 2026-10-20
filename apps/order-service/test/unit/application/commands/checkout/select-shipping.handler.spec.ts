import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SelectShippingHandler } from '@application/commands/checkout/select-shipping.handler.js';
import { SelectShippingCommand } from '@application/commands/checkout/select-shipping.command.js';
import type { ICheckoutService } from '@application/services/interfaces/checkout.service.interface.js';
import { makeCheckoutEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { CheckoutMapper } from '@application/mappers/checkout.mapper.js';

describe('SelectShippingHandler', () => {
  let handler: SelectShippingHandler;
  let service: jest.Mocked<ICheckoutService>;

  beforeEach(() => {
    service = { selectShipping: jest.fn() } as unknown as jest.Mocked<ICheckoutService>;
    handler = new SelectShippingHandler(service);
  });

  it('delegates to service.selectShipping', async () => {
    const dto = { checkoutId: FIXTURE_ID, shippingMethodId: FIXTURE_ID } as never;
    service.selectShipping.mockResolvedValue(CheckoutMapper.toResponse(makeCheckoutEntityStub()));
    await handler.execute(new SelectShippingCommand(dto, 'admin'));
    expect(service.selectShipping).toHaveBeenCalledWith(dto, 'admin');
  });
});
