import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { GetRevenueHandler } from '@application/queries/analytics/get-revenue.handler';
import { GetRevenueQuery } from '@application/queries/analytics/get-revenue.query';
import type { IPaymentService } from '@application/services/interfaces/payment.service.interface';

const USER_ID = '423e4567-e89b-42d3-a456-426614174003';

function makeMockService(): IPaymentService {
  return {
    initiate: jest.fn(), confirm: jest.fn(), cancel: jest.fn(), retry: jest.fn(),
    verify: jest.fn(), getById: jest.fn(), getPublic: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('GetRevenueHandler', () => {
  let handler: GetRevenueHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new GetRevenueHandler(service);
  });

  it('should delegate to service.getStats', async () => {
    (service.getStats as jest.Mock).mockResolvedValue({ total: 100, totalAmount: 50000 });
    const result = await handler.execute(new GetRevenueQuery(USER_ID));
    expect(result).toEqual({ total: 100, totalAmount: 50000 });
    expect(service.getStats).toHaveBeenCalledWith(USER_ID);
  });

  it('should handle date range args', async () => {
    (service.getStats as jest.Mock).mockResolvedValue({});
    await handler.execute(new GetRevenueQuery(USER_ID, '2025-01-01', '2025-01-31'));
    expect(service.getStats).toHaveBeenCalledWith(USER_ID);
  });

  it('should have correct type', () => {
    expect(new GetRevenueQuery().type).toBe('payment.analytics.revenue');
  });
});
