/**
 * AnalyticsController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/rest
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { AnalyticsController } from '@interfaces/controllers/rest/analytics.controller';
import type { QueryBus } from '@nestjs/cqrs';

describe('AnalyticsController', () => {
  let queryBus: { execute: jest.Mock };
  let controller: AnalyticsController;

  beforeEach(() => {
    queryBus = { execute: jest.fn(async () => ({ total: 100 })) };
    controller = new AnalyticsController(queryBus as unknown as QueryBus);
  });

  it('revenue dispatches GetRevenueQuery', async () => {
    await controller.revenue('u1', '2024-01-01', '2024-12-31');
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('revenue with no filters', async () => {
    await controller.revenue();
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('paymentMethods dispatches GetPaymentMethodsAnalyticsQuery', async () => {
    await controller.paymentMethods('u1', '2024-01-01', '2024-12-31');
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('paymentMethods with no filters', async () => {
    await controller.paymentMethods();
    expect(queryBus.execute).toHaveBeenCalled();
  });
});
