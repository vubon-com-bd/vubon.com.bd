import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { WebhookService } from '../../../../src/module/application/services/impl/webhook.service.js';
import { WebhookEntity } from '../../../../src/module/domain/entities/webhook.entity.js';
import { WebhookMethodVO } from '../../../../src/module/domain/value-objects/primitives/webhook-method.vo.js';
import { WebhookUrlVO } from '../../../../src/module/domain/value-objects/primitives/webhook-url.vo.js';
import { WebhookEventVO } from '../../../../src/module/domain/value-objects/primitives/webhook-event.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../helpers/test-factories.js';
import { makeWebhookRepo, makeEventBridge } from '../../../helpers/mock-services.js';

function build(): WebhookEntity {
  return WebhookEntity.create({
    id: makeUuid(), now: new Date().toISOString(),
    props: {
      url: WebhookUrlVO.create('https://example.com/hook'),
      method: WebhookMethodVO.post(),
      events: [WebhookEventVO.orderCreated()],
      createdBy: FIXED_USER_ID,
    },
  });
}

describe('WebhookService branches', () => {
  let repo: ReturnType<typeof makeWebhookRepo>;
  let svc: WebhookService;
  beforeEach(() => {
    repo = makeWebhookRepo();
    svc = new WebhookService(repo as never, makeEventBridge() as never);
  });

  it('create minimal', async () => {
    await svc.create({
      url: 'https://x.com/h', method: 'POST', events: ['order.created'],
    } as never, FIXED_USER_ID);
  });

  it('create with all fields', async () => {
    await svc.create({
      url: 'https://x.com/h', method: 'POST', events: ['order.created'],
      secret: '0123456789abcdef0123456789abcdef',
      description: 'x', metadata: { k: 'v' },
    } as never, FIXED_USER_ID);
  });

  it('create max reached throws', async () => {
    repo.countActive.mockResolvedValueOnce(100);
    await expect(svc.create({
      url: 'https://x.com/h', method: 'POST', events: ['order.created'],
    } as never)).rejects.toThrow();
  });

  it('update not found', async () => {
    await expect(svc.update({ webhookId: makeUuid() } as never, 'a')).rejects.toThrow();
  });

  it('update all fields', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.update({
      webhookId: makeUuid(), url: 'https://new.com/h', method: 'PUT',
      events: ['order.updated'], secret: 'new0123456789abcdef0123456789ab',
      description: 'x',
    } as never, 'a');
  });

  it('update partial', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.update({ webhookId: makeUuid() } as never, 'a');
  });

  it('activate not found', async () => {
    await expect(svc.activate({ webhookId: makeUuid() } as never, 'a')).rejects.toThrow();
  });

  it('activate ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.activate({ webhookId: makeUuid() } as never, 'a');
  });

  it('deactivate not found', async () => {
    await expect(svc.deactivate({ webhookId: makeUuid() } as never, 'a')).rejects.toThrow();
  });

  it('deactivate ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.deactivate({ webhookId: makeUuid() } as never, 'a');
  });

  it('disable not found', async () => {
    await expect(svc.disable({ webhookId: makeUuid(), reason: 'x' } as never, 'a')).rejects.toThrow();
  });

  it('disable ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.disable({ webhookId: makeUuid(), reason: 'x' } as never, 'a');
  });

  it('test not found', async () => {
    await expect(svc.test({ webhookId: makeUuid() } as never, 'a')).rejects.toThrow();
  });

  it('test with 2xx response', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ status: 200, ok: true }) as never;
    repo.findByIdVO.mockResolvedValueOnce(build());
    const r = await svc.test({ webhookId: makeUuid() } as never, 'a');
    expect(r.success).toBe(true);
  });

  it('test with 5xx response', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ status: 500, ok: false }) as never;
    repo.findByIdVO.mockResolvedValueOnce(build());
    const r = await svc.test({ webhookId: makeUuid() } as never, 'a');
    expect(r.success).toBe(false);
  });

  it('test with fetch error', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('network')) as never;
    repo.findByIdVO.mockResolvedValueOnce(build());
    const r = await svc.test({ webhookId: makeUuid() } as never, 'a');
    expect(r.error).toBeDefined();
  });

  it('test with payload', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ status: 200, ok: true }) as never;
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.test({ webhookId: makeUuid(), event: 'order.created', payload: { k: 'v' } } as never, 'a');
  });

  it('getById not found', async () => {
    await expect(svc.getById({ webhookId: makeUuid() } as never)).rejects.toThrow();
  });

  it('getById ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.getById({ webhookId: makeUuid() } as never);
  });

  it('list', async () => {
    await svc.list({ page: 1, limit: 20 } as never);
  });

  it('list with filters', async () => {
    await svc.list({
      page: 1, limit: 20,
      filter: { status: 'active', event: 'order.created', search: 'x' },
    } as never);
  });

  it('listDeliveries not found', async () => {
    await expect(svc.listDeliveries({ webhookId: makeUuid(), page: 1, limit: 20 } as never)).rejects.toThrow();
  });

  it('listDeliveries ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.listDeliveries({ webhookId: makeUuid(), page: 1, limit: 20 } as never);
  });

  it('retryDelivery throws', async () => {
    await expect(svc.retryDelivery({ deliveryId: 'd-1' } as never, 'a')).rejects.toThrow();
  });

  it('triggerWebhooks empty', async () => {
    const r = await svc.triggerWebhooks('order.created', {});
    expect(r).toEqual([]);
  });

  it('triggerWebhooks 2xx', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ status: 200, ok: true }) as never;
    repo.findByEvent.mockResolvedValueOnce([build()]);
    const r = await svc.triggerWebhooks('order.created', { k: 'v' });
    expect(r.length).toBeGreaterThan(0);
  });

  it('triggerWebhooks 5xx', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ status: 500, ok: false }) as never;
    repo.findByEvent.mockResolvedValueOnce([build()]);
    await svc.triggerWebhooks('order.created', {});
  });

  it('triggerWebhooks fetch error', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('fail')) as never;
    repo.findByEvent.mockResolvedValueOnce([build()]);
    const r = await svc.triggerWebhooks('order.created', {});
    expect(r).toEqual([]);
  });

  it('triggerWebhooks skips inactive', async () => {
    const e = build();
    e.disable('test');
    repo.findByEvent.mockResolvedValueOnce([e]);
    const r = await svc.triggerWebhooks('order.created', {});
    expect(r).toEqual([]);
  });
});
