/**
 * RefundControllerMapper — unit tests
 * @module payment-service/test/unit/interfaces/mappers
 */
import { describe, it, expect } from '@jest/globals';
import { RefundControllerMapper } from '@interfaces/mappers/refund.controller.mapper';

describe('RefundControllerMapper', () => {
  describe('toRequestAppDto', () => {
    it('maps with note as reason', () => {
      const dto = { amount: 100, reason: 'test', note: 'Customer request' };
      const app = RefundControllerMapper.toRequestAppDto('pay-1', dto);
      expect(app.paymentId).toBe('pay-1');
      expect(app.amount).toBe(100);
      expect(app.reason).toBe('Customer request');
    });

    it('falls back to reason when no note', () => {
      const dto = { amount: 100, reason: 'test' };
      const app = RefundControllerMapper.toRequestAppDto('pay-1', dto);
      expect(app.reason).toBe('test');
    });
  });

  describe('toListOptions', () => {
    it('applies defaults', () => {
      const options = RefundControllerMapper.toListOptions({});
      expect(options.page).toBe(1);
      expect(options.limit).toBe(20);
    });

    it('passes filters', () => {
      const options = RefundControllerMapper.toListOptions({
        page: 2,
        limit: 10,
        paymentId: 'pay-1',
        status: 'completed',
      });
      expect(options.page).toBe(2);
      expect(options.filter?.paymentId).toBe('pay-1');
      expect(options.filter?.status).toBe('completed');
    });
  });

  describe('toHttpResponse', () => {
    it('maps refund DTO', () => {
      const app = {
        id: 'r1',
        paymentId: 'p1',
        status: 'completed' as never,
        amount: 100,
        currency: 'BDT',
        reason: 'customer_request' as never,
        note: 'note',
        approvedBy: 'admin',
        completedAt: '2024-01-01',
        failureReason: undefined,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-02',
      };
      const http = RefundControllerMapper.toHttpResponse(app);
      expect(http.id).toBe('r1');
      expect(http.amount).toBe(100);
    });
  });

  describe('toSummaryHttp', () => {
    it('maps summary', () => {
      const app = {
        id: 'r1',
        status: 'completed' as never,
        amount: 100,
        currency: 'BDT',
        createdAt: '2024-01-01',
      };
      const http = RefundControllerMapper.toSummaryHttp(app);
      expect(http.id).toBe('r1');
    });
  });

  describe('toListHttp', () => {
    it('maps list', () => {
      const app = {
        items: [
          { id: 'r1', status: 'completed' as never, amount: 100, currency: 'BDT', createdAt: '2024-01-01' },
        ],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      };
      const http = RefundControllerMapper.toListHttp(app);
      expect(http.items).toHaveLength(1);
    });
  });

  describe('toStatsHttp', () => {
    it('maps stats', () => {
      const app = {
        total: 5,
        totalRefunded: 500,
        currency: 'BDT',
        byStatus: { completed: 3 },
        byReason: { customer_request: 3 },
      };
      const http = RefundControllerMapper.toStatsHttp(app);
      expect(http.total).toBe(5);
      expect(http.totalRefunded).toBe(500);
    });
  });
});
