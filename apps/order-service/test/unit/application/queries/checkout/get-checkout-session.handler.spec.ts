import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetCheckoutSessionHandler } from '@application/queries/checkout/get-checkout-session.handler.js';
import { GetCheckoutSessionQuery } from '@application/queries/checkout/get-checkout-session.query.js';
import type { ICheckoutSessionService } from '@application/services/interfaces/checkout-session.service.interface.js';
import { makeCheckoutSessionEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { CheckoutSessionMapper } from '@application/mappers/checkout.mapper.js';

describe('GetCheckoutSessionHandler', () => {
  let handler: GetCheckoutSessionHandler;
  let service: jest.Mocked<ICheckoutSessionService>;
  beforeEach(() => {
    service = { getById: jest.fn() } as unknown as jest.Mocked<ICheckoutSessionService>;
    handler = new GetCheckoutSessionHandler(service);
  });
  it('delegates to service.getById', async () => {
    service.getById.mockResolvedValue(
      CheckoutSessionMapper.toResponse(makeCheckoutSessionEntityStub() as never),
    );
    await handler.execute(new GetCheckoutSessionQuery(FIXTURE_ID));
    expect(service.getById).toHaveBeenCalledWith(FIXTURE_ID);
  });
});
