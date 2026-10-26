/**
 * BroadcastControllerMapper Tests
 * @module notification-service/test/unit/interfaces/mappers
 */
import { describe, expect, it } from '@jest/globals';
import { BroadcastControllerMapper } from '@interfaces/mappers/broadcast.controller.mapper.js';

describe('BroadcastControllerMapper', () => {
  describe('toCreateRequestDTO', () => {
    it('converts create', () => {
      const http = {
        name: 'Black Friday',
        type: 'segment',
        target: 'all',
        channels: ['email', 'sms'],
        templateId: 't-1',
        recipientIds: ['u-1'],
        scheduledAt: '2026-11-29',
      };
      const app = BroadcastControllerMapper.toCreateRequestDTO(http as never);
      expect(app.name).toBe('Black Friday');
      expect(app.channels).toEqual(['email', 'sms']);
      expect(app.recipientIds).toEqual(['u-1']);
    });

    it('handles undefined optional fields', () => {
      const http = {
        name: 'Test',
        type: 'all_users',
        target: 'all',
        channels: ['email'],
      };
      const app = BroadcastControllerMapper.toCreateRequestDTO(http as never);
      expect(app.recipientIds).toBeUndefined();
      expect(app.templateId).toBeUndefined();
    });
  });

  describe('toStartRequestDTO', () => {
    it('includes broadcastId', () => {
      const app = BroadcastControllerMapper.toStartRequestDTO('b-1', {
        approvedBy: 'a-1',
        testMode: true,
        testRecipientIds: ['u-1'],
      } as never);
      expect(app.broadcastId).toBe('b-1');
      expect(app.testMode).toBe(true);
      expect(app.testRecipientIds).toEqual(['u-1']);
    });

    it('handles undefined testRecipientIds', () => {
      const app = BroadcastControllerMapper.toStartRequestDTO('b-1', {} as never);
      expect(app.testRecipientIds).toBeUndefined();
    });
  });

  describe('toListOptions', () => {
    it('defaults', () => {
      const opts = BroadcastControllerMapper.toListOptions({} as never);
      expect(opts.page).toBe(1);
      expect(opts.limit).toBe(20);
    });
  });

  describe('toHttpResponse', () => {
    it('passes through', () => {
      const app = {
        id: 'b-1', name: 'N', type: 'segment', target: 'all',
        status: 'draft', channels: ['email'], recipientCount: 100,
        sentCount: 0, failedCount: 0, createdBy: 'u-1', createdAt: 'c',
      };
      const http = BroadcastControllerMapper.toHttpResponse(app as never);
      expect(http.id).toBe('b-1');
    });
  });

  describe('toListHttp', () => {
    it('maps', () => {
      const app = {
        items: [{ id: 'b-1', name: 'N', status: 'draft', recipientCount: 100, sentCount: 0, failedCount: 0, createdAt: 'c' }],
        total: 1, page: 1, limit: 20, totalPages: 1,
      };
      const http = BroadcastControllerMapper.toListHttp(app as never);
      expect(http.items).toHaveLength(1);
    });
  });

  describe('toResultHttp', () => {
    it('maps result', () => {
      const app = {
        broadcastId: 'b-1', recipientCount: 100, sentCount: 95,
        deliveredCount: 90, failedCount: 5, openCount: 50,
        clickCount: 10, unsubscribedCount: 2, deliveryRate: 0.95,
        openRate: 0.55, clickRate: 0.2, unsubscribeRate: 0.02,
        durationMs: 1000, throughputPerSecond: 100,
      };
      const http = BroadcastControllerMapper.toResultHttp(app as never);
      expect(http.broadcastId).toBe('b-1');
      expect(http.deliveryRate).toBe(0.95);
    });
  });
});
