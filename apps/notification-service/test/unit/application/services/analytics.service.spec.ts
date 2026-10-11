import { describe, it, expect, beforeEach } from '@jest/globals';
import { AnalyticsService } from '../../../../src/module/application/services/impl/analytics.service.js';
import { makeNotificationRepo } from '../../../../helpers/mock-services.js';
import { FIXED_USER_ID } from '../../../../helpers/test-factories.js';

function makeService() {
  const repo = makeNotificationRepo();
  const svc = new AnalyticsService(repo as never);
  return { svc, repo };
}

describe('AnalyticsService', () => {
  let ctx: ReturnType<typeof makeService>;
  beforeEach(() => {
    ctx = makeService();
    ctx.repo.getStats.mockResolvedValue({
      total: 100,
      unread: 30,
      byChannel: { email: 60, sms: 40 },
      byStatus: { delivered: 80, failed: 20 },
      byCategory: { order: 50 },
    } as never);
  });

  describe('overview', () => {
    it('computes overview', async () => {
      const r = await ctx.svc.overview({
        userId: FIXED_USER_ID,
        fromDate: '2026-01-01',
        toDate: '2026-12-31',
      });
      expect(r.totalSent).toBe(100);
      expect(r.totalDelivered).toBe(80);
      expect(r.totalFailed).toBe(20);
      expect(r.deliveryRate).toBe(80);
    });

    it('throws when fromDate > toDate', async () => {
      await expect(ctx.svc.overview({
        fromDate: '2026-12-31',
        toDate: '2026-01-01',
      })).rejects.toThrow();
    });

    it('with channel/category filters', async () => {
      const r = await ctx.svc.overview({
        userId: FIXED_USER_ID,
        fromDate: '2026-01-01',
        toDate: '2026-12-31',
        channel: 'email',
        category: 'order',
      });
      expect(r).toBeDefined();
    });

    it('deliveryRate 0 when totalSent 0', async () => {
      ctx.repo.getStats.mockResolvedValueOnce({
        total: 0, unread: 0,
        byChannel: {}, byStatus: {}, byCategory: {},
      } as never);
      const r = await ctx.svc.overview({
        fromDate: '2026-01-01', toDate: '2026-12-31',
      });
      expect(r.deliveryRate).toBe(0);
    });
  });

  describe('timeSeries', () => {
    it('returns empty points', async () => {
      const r = await ctx.svc.timeSeries({
        fromDate: '2026-01-01',
        toDate: '2026-12-31',
        interval: 'day',
      });
      expect(r.points).toEqual([]);
    });

    it('throws when fromDate > toDate', async () => {
      await expect(ctx.svc.timeSeries({
        fromDate: '2026-12-31', toDate: '2026-01-01',
        interval: 'day',
      })).rejects.toThrow();
    });

    it('with channel filter', async () => {
      const r = await ctx.svc.timeSeries({
        fromDate: '2026-01-01', toDate: '2026-12-31',
        interval: 'hour', channel: 'email',
      });
      expect(r.interval).toBe('hour');
    });
  });

  describe('channelPerformance', () => {
    it('returns per-channel array', async () => {
      const r = await ctx.svc.channelPerformance('2026-01-01', '2026-12-31');
      expect(Array.isArray(r)).toBe(true);
      expect(r.length).toBeGreaterThan(0);
    });

    it('throws when fromDate > toDate', async () => {
      await expect(ctx.svc.channelPerformance('2026-12-31', '2026-01-01')).rejects.toThrow();
    });
  });

  describe('generateReport', () => {
    it('returns report', async () => {
      const r = await ctx.svc.generateReport({
        reportType: 'delivery',
        format: 'json',
        fromDate: '2026-01-01',
        toDate: '2026-12-31',
      }, 'actor');
      expect(r.reportType).toBe('delivery');
      expect(r.format).toBe('json');
    });

    it('with userId filter', async () => {
      const r = await ctx.svc.generateReport({
        reportType: 'engagement', format: 'csv',
        fromDate: '2026-01-01', toDate: '2026-12-31',
        userId: FIXED_USER_ID,
      });
      expect(r).toBeDefined();
    });
  });
});
