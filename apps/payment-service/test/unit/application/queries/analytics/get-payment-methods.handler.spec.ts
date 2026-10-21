import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { GetPaymentMethodsAnalyticsHandler } from '@application/queries/analytics/get-payment-methods.handler';
import { GetPaymentMethodsAnalyticsQuery } from '@application/queries/analytics/get-payment-methods.query';
import type { IPaymentService } from '@application/services/interfaces/payment.service.interface';

const USER_ID = '523e4567-e89b-42d3-a456-426614174004';

function makeMockService(): IPaymentService {
  return {
    initiate: jest.fn(), confirm: jest.fn(), cancel: jest.fn(), retry: jest.fn(),
    verify: jest.fn(), getById: jest.fn(), getPublic: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('GetPaymentMethodsAnalyticsHandler', () => {
  let handler: GetPaymentMethodsAnalyticsHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new GetPaymentMethodsAnalyticsHandler(service);
  });

  it('should delegate to service.getStats with userId', async () => {
    (service.getStats as jest.Mock).mockResolvedValue({ byMethod: { card: 100 } });
    const result = await handler.execute(new GetPaymentMethodsAnalyticsQuery(USER_ID));
    expect(result).toEqual({ byMethod: { card: 100 } });
    expect(service.getStats).toHaveBeenCalledWith(USER_ID);
  });

  it('should have correct type', () => {
    expect(new GetPaymentMethodsAnalyticsQuery().type).toBe('payment.analytics.methods');
  });
});
