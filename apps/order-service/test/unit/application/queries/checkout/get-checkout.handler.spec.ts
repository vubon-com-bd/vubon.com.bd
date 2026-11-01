import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetCheckoutHandler } from '@application/queries/checkout/get-checkout.handler.js';
import { GetCheckoutQuery } from '@application/queries/checkout/get-checkout.query.js';
import type { ICheckoutService } from '@application/services/interfaces/checkout.service.interface.js';
import { makeCheckoutEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { CheckoutMapper } from '@application/mappers/checkout.mapper.js';

describe('GetCheckoutHandler', () => {
  let handler: GetCheckoutHandler;
  let service: jest.Mocked<ICheckoutService>;
  beforeEach(() => {
    service = { getById: jest.fn() } as unknown as jest.Mocked<ICheckoutService>;
    handler = new GetCheckoutHandler(service);
  });
  it('delegates to service.getById', async () => {
    service.getById.mockResolvedValue(CheckoutMapper.toResponse(makeCheckoutEntityStub()));
    await handler.execute(new GetCheckoutQuery(FIXTURE_ID));
    expect(service.getById).toHaveBeenCalledWith(FIXTURE_ID);
  });
});
