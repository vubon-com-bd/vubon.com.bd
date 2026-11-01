import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetOrderStatsHandler } from '@application/queries/order/get-order-stats.handler.js';
import { GetOrderStatsQuery } from '@application/queries/order/get-order-stats.query.js';
import type { IOrderService } from '@application/services/interfaces/order.service.interface.js';
import { FIXTURE_ID_2 } from '@fixtures/application/entity-factories.js';

describe('GetOrderStatsHandler', () => {
  let handler: GetOrderStatsHandler;
  let service: jest.Mocked<IOrderService>;
  beforeEach(() => {
    service = { getStats: jest.fn() } as unknown as jest.Mocked<IOrderService>;
    handler = new GetOrderStatsHandler(service);
  });
  it('delegates to service.getStats', async () => {
    service.getStats.mockResolvedValue({
      totalOrders: 10,
      totalRevenue: 1000,
      averageOrderValue: 100,
      currency: 'BDT',
      byStatus: {},
    });
    const result = await handler.execute(new GetOrderStatsQuery(FIXTURE_ID_2));
    expect(service.getStats).toHaveBeenCalledWith(FIXTURE_ID_2);
    expect(result.totalOrders).toBe(10);
  });
});
