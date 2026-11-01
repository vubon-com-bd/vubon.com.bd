import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { GetPaymentHandler } from '@application/queries/payment/get-payment.handler';
import { GetPaymentQuery } from '@application/queries/payment/get-payment.query';
import type { IPaymentService } from '@application/services/interfaces/payment.service.interface';

const PAYMENT_ID = '123e4567-e89b-42d3-a456-426614174000';

function makeMockService(): IPaymentService {
  return {
    initiate: jest.fn(), confirm: jest.fn(), cancel: jest.fn(), retry: jest.fn(),
    verify: jest.fn(), getById: jest.fn(), getPublic: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('GetPaymentHandler', () => {
  let handler: GetPaymentHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new GetPaymentHandler(service);
  });

  it('should delegate to service.getById', async () => {
    (service.getById as jest.Mock).mockResolvedValue({ id: PAYMENT_ID });
    const query = new GetPaymentQuery(PAYMENT_ID);
    const result = await handler.execute(query);
    expect(result).toEqual({ id: PAYMENT_ID });
    expect(service.getById).toHaveBeenCalledWith(PAYMENT_ID);
  });

  it('should have correct type', () => {
    expect(new GetPaymentQuery(PAYMENT_ID).type).toBe('payment.payment.get');
  });
});
