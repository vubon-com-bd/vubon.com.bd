import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SelectAddressHandler } from '@application/commands/checkout/select-address.handler.js';
import { SelectAddressCommand } from '@application/commands/checkout/select-address.command.js';
import type { ICheckoutService } from '@application/services/interfaces/checkout.service.interface.js';
import { makeCheckoutEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { CheckoutMapper } from '@application/mappers/checkout.mapper.js';

describe('SelectAddressHandler', () => {
  let handler: SelectAddressHandler;
  let service: jest.Mocked<ICheckoutService>;

  beforeEach(() => {
    service = { selectAddress: jest.fn() } as unknown as jest.Mocked<ICheckoutService>;
    handler = new SelectAddressHandler(service);
  });

  it('delegates to service.selectAddress', async () => {
    const dto = { checkoutId: FIXTURE_ID, shippingAddressId: FIXTURE_ID } as never;
    service.selectAddress.mockResolvedValue(CheckoutMapper.toResponse(makeCheckoutEntityStub()));
    await handler.execute(new SelectAddressCommand(dto, 'admin'));
    expect(service.selectAddress).toHaveBeenCalledWith(dto, 'admin');
  });
});
