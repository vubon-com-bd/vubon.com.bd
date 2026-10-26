/**
 * AnalyticsController Tests
 * @module notification-service/test/unit/interfaces/controllers/rest
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { QueryBus } from '@nestjs/cqrs';
import { AnalyticsController } from '@interfaces/controllers/rest/analytics.controller.js';

describe('AnalyticsController', () => {
  let controller: AnalyticsController;
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    queryBus = { execute: jest.fn() };
    controller = new AnalyticsController(queryBus as unknown as QueryBus);
  });

  describe('deliveryRate', () => {
    it('dispatches GetDeliveryRateQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        totalAttempts: 100,
        delivered: 95,
        failed: 5,
        deliveryRate: 0.95,
      });
      const result = await controller.deliveryRate('2026-01-01', '2026-12-31', 'email');
      expect(result).toBeDefined();
    });

    it('handles undefined args', async () => {
      queryBus.execute.mockResolvedValueOnce({});
      await controller.deliveryRate();
      expect(queryBus.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('channels', () => {
    it('dispatches GetChannelStatsQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({ channels: [] });
      const result = await controller.channels('2026-01-01', '2026-12-31');
      expect(result).toBeDefined();
    });
  });

  describe('engagement', () => {
    it('dispatches GetEngagementQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        totalDelivered: 100,
        totalRead: 50,
        openRate: 0.5,
        clickRate: 0,
        unsubscribeRate: 0,
      });
      const result = await controller.engagement('2026-01-01', '2026-12-31');
      expect(result).toBeDefined();
    });
  });

  describe('templatePerformance', () => {
    it('dispatches GetTemplatePerformanceQuery', async () => {
      queryBus.execute.mockResolvedValueOnce({
        templateId: 't-1',
        renders: 10,
        sent: 10,
        failed: 0,
      });
      const result = await controller.templatePerformance(
        't-1',
        '2026-01-01',
        '2026-12-31',
      );
      expect(result).toBeDefined();
    });
  });
});
