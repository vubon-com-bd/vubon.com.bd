/**
 * WebhookControllerMapper Tests
 * @module notification-service/test/unit/interfaces/mappers
 */
import { describe, expect, it } from '@jest/globals';
import { WebhookControllerMapper } from '@interfaces/mappers/webhook.controller.mapper.js';

describe('WebhookControllerMapper', () => {
  describe('toCreateRequestDTO', () => {
    it('converts create DTO', () => {
      const http = {
        name: 'My Webhook',
        url: 'https://example.com/hook',
        events: ['order.created', 'payment.succeeded'],
        headers: { 'X-Custom': 'value' },
        secret: 'super-secret-16chars',
      };
      const app = WebhookControllerMapper.toCreateRequestDTO(http as never);
      expect(app.name).toBe('My Webhook');
      expect(app.events).toHaveLength(2);
    });
  });

  describe('toUpdateRequestDTO', () => {
    it('includes webhookId', () => {
      const app = WebhookControllerMapper.toUpdateRequestDTO('w-1', {
        name: 'Updated',
        events: ['order.created'],
      } as never);
      expect(app.webhookId).toBe('w-1');
      expect(app.events).toHaveLength(1);
    });

    it('handles undefined events', () => {
      const app = WebhookControllerMapper.toUpdateRequestDTO('w-1', {
        name: 'Updated',
      } as never);
      expect(app.events).toBeUndefined();
    });
  });

  describe('toTestRequestDTO', () => {
    it('includes webhookId + event', () => {
      const app = WebhookControllerMapper.toTestRequestDTO('w-1', {
        event: 'order.created',
        payload: { orderId: 'o-1' },
      } as never);
      expect(app.webhookId).toBe('w-1');
      expect(app.event).toBe('order.created');
    });
  });

  describe('toListOptions', () => {
    it('defaults', () => {
      const opts = WebhookControllerMapper.toListOptions({} as never);
      expect(opts.page).toBe(1);
      expect(opts.limit).toBe(20);
    });
  });

  describe('toHttpResponse', () => {
    it('passes through', () => {
      const app = {
        id: 'w-1', name: 'N', type: 'outgoing', status: 'active',
        url: 'https://x', events: ['order.created'], hasSecret: true,
        createdAt: 'c', updatedAt: 'u',
      };
      const http = WebhookControllerMapper.toHttpResponse(app as never);
      expect(http.id).toBe('w-1');
      expect(http.hasSecret).toBe(true);
    });
  });

  describe('toListHttp', () => {
    it('maps items', () => {
      const app = {
        items: [{ id: 'w-1', name: 'N', status: 'active', url: 'x', eventCount: 1 }],
        total: 1, page: 1, limit: 20, totalPages: 1,
      };
      const http = WebhookControllerMapper.toListHttp(app as never);
      expect(http.items).toHaveLength(1);
    });
  });

  describe('toDeliveryHttp', () => {
    it('maps delivery', () => {
      const app = {
        id: 'd-1', webhookId: 'w-1', event: 'order.created',
        status: 'delivered', attemptCount: 1, createdAt: 'c',
      };
      const http = WebhookControllerMapper.toDeliveryHttp(app as never);
      expect(http.id).toBe('d-1');
    });
  });
});
