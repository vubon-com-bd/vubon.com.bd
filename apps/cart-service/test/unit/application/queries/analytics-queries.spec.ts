import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetCartAnalyticsHandler } from '../../../../src/module/application/queries/analytics/get-cart-analytics.handler.js';
import { GetCartAnalyticsQuery } from '../../../../src/module/application/queries/analytics/get-cart-analytics.query.js';
import { GetAbandonmentRateHandler } from '../../../../src/module/application/queries/analytics/get-abandonment-rate.handler.js';
import { GetAbandonmentRateQuery } from '../../../../src/module/application/queries/analytics/get-abandonment-rate.query.js';
import type { ICartService } from '../../../../src/module/application/services/interfaces/cart.service.interface.js';
import type { IAbandonedCartService } from '../../../../src/module/application/services/interfaces/abandoned-cart.service.interface.js';

function makeCartService(): jest.Mocked<ICartService> {
  return {
    create: jest.fn(), update: jest.fn(), clear: jest.fn(),
    delete: jest.fn(), recover: jest.fn(),
    getById: jest.fn(), getPublic: jest.fn(), getDetail: jest.fn(),
    getSummary: jest.fn(), getByUserId: jest.fn(),
    list: jest.fn(), count: jest.fn(), getStats: jest.fn(),
  } as unknown as jest.Mocked<ICartService>;
}

function makeAbandonedService(): jest.Mocked<IAbandonedCartService> {
  return {
    detect: jest.fn(), sendReminder: jest.fn(), recover: jest.fn(),
    markLost: jest.fn(), getById: jest.fn(), getPublicById: jest.fn(),
    list: jest.fn(), getStats: jest.fn(),
  } as unknown as jest.Mocked<IAbandonedCartService>;
}

describe('Analytics Query Handlers', () => {
  let cartService: jest.Mocked<ICartService>;
  let abandonedService: jest.Mocked<IAbandonedCartService>;

  beforeEach(() => {
    cartService = makeCartService();
    abandonedService = makeAbandonedService();
  });

  describe('GetCartAnalyticsHandler', () => {
    it('should return cart stats', async () => {
      cartService.getStats.mockResolvedValue({
        total: 100, totalValue: 50000, averageValue: 500,
        averageItemCount: 2.5, currency: 'BDT',
        byStatus: { active: 80, abandoned: 20 },
        byType: { user: 60, guest: 40 },
      });

      const handler = new GetCartAnalyticsHandler(cartService);
      const query = new GetCartAnalyticsQuery();
      const result = await handler.execute(query);

      expect(result.total).toBe(100);
      expect(result.byType.user).toBe(60);
    });
  });

  describe('GetAbandonmentRateHandler', () => {
    it('should return abandonment stats', async () => {
      abandonedService.getStats.mockResolvedValue({
        total: 100, totalValue: 50000, averageValue: 500,
        recoveredCount: 30, recoveryRate: 0.3,
        byStatus: { pending: 50, recovered: 30, lost: 20 },
      });

      const handler = new GetAbandonmentRateHandler(abandonedService);
      const query = new GetAbandonmentRateQuery();
      const result = await handler.execute(query);

      expect(result.recoveryRate).toBe(0.3);
    });
  });
});
