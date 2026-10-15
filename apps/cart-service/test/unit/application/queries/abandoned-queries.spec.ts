import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ListAbandonedHandler } from '../../../../src/module/application/queries/abandoned/list-abandoned.handler.js';
import { ListAbandonedQuery } from '../../../../src/module/application/queries/abandoned/list-abandoned.query.js';
import { GetAbandonedStatsHandler } from '../../../../src/module/application/queries/abandoned/get-abandoned-stats.handler.js';
import { GetAbandonedStatsQuery } from '../../../../src/module/application/queries/abandoned/get-abandoned-stats.query.js';
import type { IAbandonedCartService } from '../../../../src/module/application/services/interfaces/abandoned-cart.service.interface.js';

function makeService(): jest.Mocked<IAbandonedCartService> {
  return {
    detect: jest.fn(), sendReminder: jest.fn(), recover: jest.fn(),
    markLost: jest.fn(), getById: jest.fn(), getPublicById: jest.fn(),
    list: jest.fn(), getStats: jest.fn(),
  } as unknown as jest.Mocked<IAbandonedCartService>;
}

describe('Abandoned Query Handlers', () => {
  let service: jest.Mocked<IAbandonedCartService>;

  beforeEach(() => {
    service = makeService();
  });

  describe('ListAbandonedHandler', () => {
    it('should return paginated abandoned cart list', async () => {
      service.list.mockResolvedValue({
        items: [], total: 0, page: 1, limit: 10, totalPages: 0,
      });

      const handler = new ListAbandonedHandler(service);
      const query = new ListAbandonedQuery({ page: 1, limit: 10 });
      const result = await handler.execute(query);

      expect(result.total).toBe(0);
    });
  });

  describe('GetAbandonedStatsHandler', () => {
    it('should return abandonment stats', async () => {
      service.getStats.mockResolvedValue({
        total: 100, totalValue: 50000, averageValue: 500,
        recoveredCount: 30, recoveryRate: 0.3,
        byStatus: { pending: 50, recovered: 30, lost: 20 },
      });

      const handler = new GetAbandonedStatsHandler(service);
      const query = new GetAbandonedStatsQuery();
      const result = await handler.execute(query);

      expect(result.total).toBe(100);
      expect(result.recoveryRate).toBe(0.3);
    });

    it('should pass filter to service', async () => {
      service.getStats.mockResolvedValue({
        total: 50, totalValue: 25000, averageValue: 500,
        recoveredCount: 10, recoveryRate: 0.2, byStatus: {},
      });

      const handler = new GetAbandonedStatsHandler(service);
      const query = new GetAbandonedStatsQuery({ status: 'pending' });
      await handler.execute(query);

      expect(service.getStats).toHaveBeenCalledWith({ status: 'pending' });
    });
  });
});
