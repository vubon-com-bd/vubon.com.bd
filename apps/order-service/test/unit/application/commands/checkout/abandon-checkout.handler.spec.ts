import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AbandonCheckoutHandler } from '@application/commands/checkout/abandon-checkout.handler.js';
import { AbandonCheckoutCommand } from '@application/commands/checkout/abandon-checkout.command.js';
import type { ICheckoutService } from '@application/services/interfaces/checkout.service.interface.js';
import { makeCheckoutEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { CheckoutMapper } from '@application/mappers/checkout.mapper.js';

describe('AbandonCheckoutHandler', () => {
  let handler: AbandonCheckoutHandler;
  let service: jest.Mocked<ICheckoutService>;

  beforeEach(() => {
    service = { abandon: jest.fn() } as unknown as jest.Mocked<ICheckoutService>;
    handler = new AbandonCheckoutHandler(service);
  });

  it('delegates to service.abandon', async () => {
    const dto = { checkoutId: FIXTURE_ID, reason: 'changed mind' } as never;
    service.abandon.mockResolvedValue(CheckoutMapper.toResponse(makeCheckoutEntityStub()));
    await handler.execute(new AbandonCheckoutCommand(dto, 'admin'));
    expect(service.abandon).toHaveBeenCalledWith(dto, 'admin');
  });
});
