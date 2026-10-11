import { describe, it, expect, beforeEach } from '@jest/globals';
import { WebhookService } from '../../../../src/module/application/services/impl/webhook.service.js';
import { WebhookEntity } from '../../../../src/module/domain/entities/webhook.entity.js';
import { WebhookMethodVO } from '../../../../src/module/domain/value-objects/primitives/webhook-method.vo.js';
import { WebhookUrlVO } from '../../../../src/module/domain/value-objects/primitives/webhook-url.vo.js';
import { WebhookEventVO } from '../../../../src/module/domain/value-objects/primitives/webhook-event.vo.js';
import { WebhookSecretVO } from '../../../../src/module/domain/value-objects/primitives/webhook-secret.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';
import { makeWebhookRepo, makeEventBridge } from '../../../../helpers/mock-services.js';

function build(): WebhookEntity {
  return WebhookEntity.create({
    id: makeUuid(),
    now: new Date().toISOString(),
    props: {
      url: WebhookUrlVO.create('https://example.com/hook'),
      method: WebhookMethodVO.post(),
      events: [WebhookEventVO.orderCreated()],
      secret: WebhookSecretVO.create('0123456789abcdef0123456789abcdef'),
      createdBy: FIXED_USER_ID,
    },
  });
}

function makeService() {
  const repo = makeWebhookRepo();
  const events = makeEventBridge();
  const svc = new WebhookService(repo as never, events as never);
  return { svc, repo, events };
}

describe('WebhookService', () => {
  let ctx: ReturnType<typeof makeService>;
  beforeEach(() => { ctx = makeService(); });

  describe('create', () => {
    it('creates webhook', async () => {
      const r = await ctx.svc.create({
        url: 'https://example.com/hook',
        method: 'POST',
        events: ['order.created'],
        secret: '0123456789abcdef0123456789abcdef',
      } as never, FIXED_USER_ID);
      expect(r.url).toBe('https://example.com/hook');
    });

    it('rejects when max active reached', async () => {
      ctx.repo.countActive.mockResolvedValueOnce(100);
      await expect(ctx.svc.create({
        url: 'https://x.com/h', method: 'POST', events: ['order.created'],
      } as never)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.update({ webhookId: '44444444-4444-4444-4444-444444444444' } as never, 'actor')).rejects.toThrow();
    });

    it('updates all fields', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.update({
        webhookId: '44444444-4444-4444-4444-444444444444',
        url: 'https://new.com/hook',
        method: 'PUT',
        events: ['order.updated'],
        secret: 'newsecret0123456789abcdef',
        description: 'new',
      } as never, 'actor');
      expect(r).toBeDefined();
    });
  });

  describe('activate', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.activate({ webhookId: '44444444-4444-4444-4444-444444444444' } as never, 'actor')).rejects.toThrow();
    });

    it('activates', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.activate({ webhookId: '44444444-4444-4444-4444-444444444444' } as never, 'actor');
      expect(r).toBeDefined();
    });
  });

  describe('deactivate', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.deactivate({ webhookId: '44444444-4444-4444-4444-444444444444', reason: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' } as never, 'actor')).rejects.toThrow();
    });

    it('deactivates', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.deactivate({ webhookId: '44444444-4444-4444-4444-444444444444' } as never, 'actor');
      expect(r).toBeDefined();
    });
  });

  describe('disable', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.disable({ webhookId: '44444444-4444-4444-4444-444444444444', reason: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' } as never, 'actor')).rejects.toThrow();
    });

    it('disables', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.disable({ webhookId: '44444444-4444-4444-4444-444444444444', reason: 'too many' } as never, 'actor');
      expect(r.status).toBe('disabled');
    });
  });

  describe('test', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.test({ webhookId: '44444444-4444-4444-4444-444444444444' } as never, 'actor')).rejects.toThrow();
    });

    it('handles fetch failure gracefully', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.test({ webhookId: '44444444-4444-4444-4444-444444444444' } as never, 'actor');
      expect(typeof r.success).toBe('boolean');
    });
  });

  describe('getById', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getById({ webhookId: '44444444-4444-4444-4444-444444444444' } as never)).rejects.toThrow();
    });

    it('returns DTO', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.getById({ webhookId: '44444444-4444-4444-4444-444444444444' } as never);
      expect(r.url).toBe('https://example.com/hook');
    });
  });

  describe('list', () => {
    it('returns paginated', async () => {
      const r = await ctx.svc.list({ page: 1, limit: 20 });
      expect(r.total).toBe(0);
    });

    it('with filters', async () => {
      const r = await ctx.svc.list({
        page: 1, limit: 20, sortBy: 'lastSuccessAt', sortDir: 'asc',
        filter: { status: 'active', event: 'order.created', search: 'example' },
      } as never);
      expect(r).toBeDefined();
    });
  });

  describe('listDeliveries', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.listDeliveries({ webhookId: '44444444-4444-4444-4444-444444444444', page: 1, limit: 20 } as never)).rejects.toThrow();
    });

    it('returns empty deliveries', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.listDeliveries({ webhookId: '44444444-4444-4444-4444-444444444444', page: 1, limit: 20 } as never);
      expect(r.total).toBe(0);
    });
  });

  describe('retryDelivery', () => {
    it('throws not found', async () => {
      await expect(ctx.svc.retryDelivery({ deliveryId: '33333333-3333-3333-3333-333333333333' } as never, 'actor')).rejects.toThrow();
    });
  });

  describe('triggerWebhooks', () => {
    it('returns empty when no hooks', async () => {
      const r = await ctx.svc.triggerWebhooks('order.created', { k: 'v' });
      expect(r).toEqual([]);
    });

    it('delivers to active hooks', async () => {
      const e = build();
      ctx.repo.findByEvent.mockResolvedValueOnce([e]);
      const r = await ctx.svc.triggerWebhooks('order.created', { k: 'v' });
      expect(Array.isArray(r)).toBe(true);
    });
  });
});
