import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { GetPaymentStatsHandler } from '@application/queries/payment/get-payment-stats.handler';
import { GetPaymentStatsQuery } from '@application/queries/payment/get-payment-stats.query';
import type { IPaymentService } from '@application/services/interfaces/payment.service.interface';

const USER_ID = '323e4567-e89b-42d3-a456-426614174002';

function makeMockService(): IPaymentService {
  return {
    initiate: jest.fn(), confirm: jest.fn(), cancel: jest.fn(), retry: jest.fn(),
    verify: jest.fn(), getById: jest.fn(), getPublic: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('GetPaymentStatsHandler', () => {
  let handler: GetPaymentStatsHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new GetPaymentStatsHandler(service);
  });

  it('should delegate to service.getStats with userId', async () => {
    (service.getStats as jest.Mock).mockResolvedValue({ total: 5 });
    const query = new GetPaymentStatsQuery(USER_ID);
    const result = await handler.execute(query);
    expect(result).toEqual({ total: 5 });
    expect(service.getStats).toHaveBeenCalledWith(USER_ID);
  });

  it('should call without userId', async () => {
    (service.getStats as jest.Mock).mockResolvedValue({});
    await handler.execute(new GetPaymentStatsQuery());
    expect(service.getStats).toHaveBeenCalledWith(undefined);
  });

  it('should have correct type', () => {
    expect(new GetPaymentStatsQuery().type).toBe('payment.payment.stats');
  });
});
