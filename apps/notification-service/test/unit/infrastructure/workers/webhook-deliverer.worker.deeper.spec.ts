import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { WebhookDelivererWorker } from '../../../../src/module/infrastructure/workers/webhook-deliverer.worker.js';
import { WebhookEntity } from '../../../../src/module/domain/entities/webhook.entity.js';
import { WebhookMethodVO } from '../../../../src/module/domain/value-objects/primitives/webhook-method.vo.js';
import { WebhookUrlVO } from '../../../../src/module/domain/value-objects/primitives/webhook-url.vo.js';
import { WebhookEventVO } from '../../../../src/module/domain/value-objects/primitives/webhook-event.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';

function makeQueueService() {
  return { registerWorker: jest.fn(), enqueue: jest.fn() } as never;
}
function makeRepo() {
  return {
    findByIdVO: jest.fn().mockResolvedValue(null),
    save: jest.fn().mockImplementation(async (e: unknown) => e),
  } as never;
}
function makeWebhookQueue() {
  return {
    enqueueDeliver: jest.fn(), enqueueRetry: jest.fn(), enqueueDisableFailing: jest.fn(),
  } as never;
}

function build(): WebhookEntity {
  return WebhookEntity.create({
    id: makeUuid(),
    now: new Date().toISOString(),
    props: {
      url: WebhookUrlVO.create('https://example.com/hook'),
      method: WebhookMethodVO.post(),
      events: [WebhookEventVO.orderCreated()],
      createdBy: FIXED_USER_ID,
    },
  });
}

describe('WebhookDelivererWorker deeper', () => {
  let repo: ReturnType<typeof makeRepo>;
  let wq: ReturnType<typeof makeWebhookQueue>;
  let w: WebhookDelivererWorker;
  beforeEach(() => {
    repo = makeRepo();
    wq = makeWebhookQueue();
    w = new WebhookDelivererWorker(makeQueueService(), repo, wq);
  });

  it('skip no broadcastId', async () => {
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({});
    expect((r as { skipped: boolean }).skipped).toBe(true);
  });

  it('skip when not found', async () => {
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({ webhookId: '22222222-2222-2222-2222-222222222222' });
    expect(r).toEqual({ skipped: true, reason: 'not_found' });
  });

  it('disable-failing above threshold', async () => {
    const e = build();
    for (let i = 0; i < 25; i++) e.recordDeliveryFailure('order.created', 1, 'fail');
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(e);
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      webhookId: '22222222-2222-2222-2222-222222222222', failureCount: 25,
    });
    expect((r as { disabled: boolean }).disabled).toBe(true);
  });

  it('disable-failing below threshold', async () => {
    const e = build();
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(e);
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      webhookId: '22222222-2222-2222-2222-222222222222', failureCount: 5,
    });
    expect((r as { skipped: boolean }).skipped).toBe(true);
  });

  it('deliver success path (fetch mocked)', async () => {
    const origFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      ok: true, status: 200,
    }) as never;
    try {
      (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(build());
      const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
        webhookId: '22222222-2222-2222-2222-222222222222', event: 'order.created', payload: {}, attempt: 1,
      });
      expect((r as { delivered: boolean }).delivered).toBe(true);
    } finally {
      global.fetch = origFetch;
    }
  });

  it('deliver failure schedules retry', async () => {
    const origFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      ok: false, status: 500,
    }) as never;
    try {
      (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(build());
      const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
        webhookId: '22222222-2222-2222-2222-222222222222', event: 'order.created', payload: {}, attempt: 1,
      });
      expect((r as { delivered: boolean }).delivered).toBe(false);
      expect((r as { retried: boolean }).retried).toBe(true);
    } finally {
      global.fetch = origFetch;
    }
  });

  it('deliver failure exhausted', async () => {
    const origFetch = global.fetch;
    global.fetch = jest.fn().mockResolvedValue({
      ok: false, status: 500,
    }) as never;
    try {
      (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(build());
      const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
        webhookId: '22222222-2222-2222-2222-222222222222', event: 'order.created', payload: {}, attempt: 5,
      });
      expect((r as { retried: boolean }).retried).toBe(false);
    } finally {
      global.fetch = origFetch;
    }
  });

  it('deliver network exception', async () => {
    const origFetch = global.fetch;
    global.fetch = jest.fn().mockRejectedValue(new Error('connection refused')) as never;
    try {
      (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(build());
      const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
        webhookId: '22222222-2222-2222-2222-222222222222', event: 'order.created', payload: {}, attempt: 1,
      });
      expect((r as { delivered: boolean }).delivered).toBe(false);
    } finally {
      global.fetch = origFetch;
    }
  });

  it('registerWorker', () => {
    const qs = makeQueueService();
    const w2 = new WebhookDelivererWorker(qs, makeRepo(), makeWebhookQueue());
    w2.onModuleInit();
    expect((qs as { registerWorker: jest.Mock }).registerWorker).toHaveBeenCalled();
  });
});
