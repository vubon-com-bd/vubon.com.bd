/**
 * SubscriptionControllerMapper — unit tests
 * @module payment-service/test/unit/interfaces/mappers
 */
import { describe, it, expect } from '@jest/globals';
import { SubscriptionControllerMapper } from '@interfaces/mappers/subscription.controller.mapper';

describe('SubscriptionControllerMapper', () => {
  describe('toCreateAppDto', () => {
    it('maps full DTO', () => {
      const dto = {
        plan: 'premium',
        interval: 'monthly',
        intervalCount: 1,
        price: 999,
        currency: 'BDT',
        method: 'card',
        gateway: 'stripe',
        trialDays: 7,
      };
      const app = SubscriptionControllerMapper.toCreateAppDto(dto as never);
      expect(app.plan).toBe('premium');
      expect(app.price).toBe(999);
      expect(app.trialDays).toBe(7);
    });
  });

  describe('toListOptions', () => {
    it('defaults', () => {
      const opts = SubscriptionControllerMapper.toListOptions({});
      expect(opts.page).toBe(1);
      expect(opts.limit).toBe(20);
    });

    it('passes filters', () => {
      const opts = SubscriptionControllerMapper.toListOptions({
        page: 2,
        limit: 10,
        userId: 'u1',
        status: 'active',
        plan: 'premium',
      });
      expect(opts.filter?.userId).toBe('u1');
      expect(opts.filter?.status).toBe('active');
    });
  });

  describe('toHttpResponse', () => {
    it('maps full', () => {
      const app = {
        id: 's1',
        userId: 'u1',
        status: 'active' as never,
        plan: 'premium' as never,
        interval: 'monthly' as never,
        intervalCount: 1,
        price: 999,
        currency: 'BDT',
        startedAt: '2024-01-01',
        currentPeriodStart: '2024-01-01',
        currentPeriodEnd: '2024-02-01',
        trialEndsAt: undefined,
        cancelledAt: undefined,
        cancelAtPeriodEnd: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };
      const http = SubscriptionControllerMapper.toHttpResponse(app);
      expect(http.id).toBe('s1');
      expect(http.plan).toBe('premium');
    });
  });

  describe('toSummaryHttp', () => {
    it('maps summary', () => {
      const app = {
        id: 's1',
        status: 'active' as never,
        plan: 'premium' as never,
        price: 999,
        currency: 'BDT',
        currentPeriodEnd: '2024-02-01',
      };
      const http = SubscriptionControllerMapper.toSummaryHttp(app);
      expect(http.id).toBe('s1');
    });
  });

  describe('toListHttp', () => {
    it('maps list', () => {
      const app = {
        items: [
          {
            id: 's1',
            status: 'active' as never,
            plan: 'premium' as never,
            price: 999,
            currency: 'BDT',
            currentPeriodEnd: '2024-02-01',
          },
        ],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      };
      const http = SubscriptionControllerMapper.toListHttp(app);
      expect(http.items).toHaveLength(1);
    });
  });

  describe('toStatsHttp', () => {
    it('maps stats', () => {
      const app = {
        total: 5,
        active: 3,
        trialing: 1,
        cancelled: 1,
        totalMrr: 4995,
        currency: 'BDT',
        byPlan: { premium: 3 },
      };
      const http = SubscriptionControllerMapper.toStatsHttp(app);
      expect(http.total).toBe(5);
      expect(http.active).toBe(3);
    });
  });
});
