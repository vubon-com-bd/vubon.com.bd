import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { StartCheckoutHandler } from '@application/commands/checkout/start-checkout.handler.js';
import { StartCheckoutCommand } from '@application/commands/checkout/start-checkout.command.js';
import type { ICheckoutService } from '@application/services/interfaces/checkout.service.interface.js';
import { makeCheckoutEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { CheckoutMapper } from '@application/mappers/checkout.mapper.js';

describe('StartCheckoutHandler', () => {
  let handler: StartCheckoutHandler;
  let service: jest.Mocked<ICheckoutService>;

  beforeEach(() => {
    service = { start: jest.fn() } as unknown as jest.Mocked<ICheckoutService>;
    handler = new StartCheckoutHandler(service);
  });

  it('delegates to service.start', async () => {
    const dto = { cartId: FIXTURE_ID, email: 'x@y.com' } as never;
    service.start.mockResolvedValue(CheckoutMapper.toResponse(makeCheckoutEntityStub()));
    const cmd = new StartCheckoutCommand(dto, 'user-1');
    await handler.execute(cmd);
    expect(service.start).toHaveBeenCalledWith(dto, 'user-1');
  });
});
