import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { WebhookDelivererWorker } from '../../../../src/module/infrastructure/workers/webhook-deliverer.worker.js';
import { WebhookEntity } from '../../../../src/module/domain/entities/webhook.entity.js';
import { WebhookMethodVO } from '../../../../src/module/domain/value-objects/primitives/webhook-method.vo.js';
import { WebhookUrlVO } from '../../../../src/module/domain/value-objects/primitives/webhook-url.vo.js';
import { WebhookEventVO } from '../../../../src/module/domain/value-objects/primitives/webhook-event.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../helpers/test-factories.js';

function makeQS() { return { registerWorker: jest.fn(), enqueue: jest.fn() } as never; }
function makeRepo() {
  return {
    findByIdVO: jest.fn().mockResolvedValue(null),
    save: jest.fn().mockImplementation(async (e: unknown) => e),
  } as never;
}
function makeWQ() {
  return { enqueueDeliver: jest.fn(), enqueueRetry: jest.fn(), enqueueDisableFailing: jest.fn() } as never;
}
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
type H = (p: unknown) => Promise<unknown>;
const h = (w: WebhookDelivererWorker) => w as unknown as { handle: H };

describe('WebhookDelivererWorker — full branch', () => {
  let repo: ReturnType<typeof makeRepo>;
  let wq: ReturnType<typeof makeWQ>;
  let w: WebhookDelivererWorker;
  let origFetch: typeof global.fetch;
  beforeEach(() => {
    repo = makeRepo();
    wq = makeWQ();
    w = new WebhookDelivererWorker(makeQS(), repo, wq);
    origFetch = global.fetch;
  });

  afterEach(() => { global.fetch = origFetch; });

  it('registerWorker', () => {
    const qs = makeQS();
    const w2 = new WebhookDelivererWorker(qs, makeRepo(), makeWQ());
    w2.onModuleInit();
    expect((qs as { registerWorker: jest.Mock }).registerWorker).toHaveBeenCalled();
  });

  it('skip no webhookId', async () => {
    expect(await h(w).handle({})).toEqual({ skipped: true, reason: 'no_id' });
  });

  it('skip when not found', async () => {
    expect(await h(w).handle({ webhookId: '22222222-2222-2222-2222-222222222222' })).toEqual({ skipped: true, reason: 'not_found' });
  });

  it('disable path — above threshold', async () => {
    const e = build();
    for (let i = 0; i < 25; i++) e.recordDeliveryFailure('order.created', 1, 'x');
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(e);
    const r = await h(w).handle({ webhookId: '22222222-2222-2222-2222-222222222222', failureCount: 25 });
    expect((r as { disabled: boolean }).disabled).toBe(true);
  });

  it('disable path — below threshold', async () => {
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(build());
    const r = await h(w).handle({ webhookId: '22222222-2222-2222-2222-222222222222', failureCount: 5 });
    expect((r as { skipped: boolean }).skipped).toBe(true);
  });

  it('deliver success (fetch ok)', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 200 }) as never;
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(build());
    const r = await h(w).handle({ webhookId: '22222222-2222-2222-2222-222222222222', event: 'order.created', payload: {}, attempt: 1 });
    expect((r as { delivered: boolean }).delivered).toBe(true);
  });

  it('deliver failure → retry', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 }) as never;
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(build());
    const r = await h(w).handle({ webhookId: '22222222-2222-2222-2222-222222222222', event: 'order.created', payload: {}, attempt: 1 });
    expect((r as { delivered: boolean }).delivered).toBe(false);
    expect((r as { retried: boolean }).retried).toBe(true);
  });

  it('deliver failure — exhausted', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 }) as never;
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(build());
    const r = await h(w).handle({ webhookId: '22222222-2222-2222-2222-222222222222', event: 'order.created', payload: {}, attempt: 5 });
    expect((r as { retried: boolean }).retried).toBe(false);
  });

  it('deliver network error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('refused')) as never;
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(build());
    const r = await h(w).handle({ webhookId: '22222222-2222-2222-2222-222222222222', event: 'order.created', payload: {}, attempt: 1 });
    expect((r as { delivered: boolean }).delivered).toBe(false);
  });
});
