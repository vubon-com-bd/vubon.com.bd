import { jest } from '@jest/globals';
import { RefundQueue } from '../../../../src/module/infrastructure/queues/refund.queue.js';
import { WebhookQueue } from '../../../../src/module/infrastructure/queues/webhook.queue.js';
import { PAYMENT_JOB_NAME } from '../../../../src/module/infrastructure/queues/queue.constants.js';

describe('RefundQueue — full', () => {
  it('enqueueProcess uses PROCESS_REFUND job', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    const rq = new RefundQueue(q as never);
    const id = await rq.enqueueProcess({ refundId: 'r1' });
    expect(id).toBe('id');
    expect(q.enqueue).toHaveBeenCalledWith(
      expect.any(String),
      PAYMENT_JOB_NAME.PROCESS_REFUND,
      expect.objectContaining({ refundId: 'r1' }),
      expect.any(Object),
    );
  });

  it('enqueueRetry uses RETRY_REFUND job', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    const rq = new RefundQueue(q as never);
    await rq.enqueueRetry({ refundId: 'r1', attempt: 2 });
    expect(q.enqueue).toHaveBeenCalledWith(
      expect.any(String),
      PAYMENT_JOB_NAME.RETRY_REFUND,
      expect.objectContaining({ refundId: 'r1', attempt: 2 }),
      expect.any(Object),
    );
  });

  it('enqueueRetry uses custom delay', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    const rq = new RefundQueue(q as never);
    await rq.enqueueRetry({ refundId: 'r1', attempt: 1 }, 99_000);
    expect(q.enqueue).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(Object),
      expect.objectContaining({ delayMs: 99_000 }),
    );
  });
});

describe('WebhookQueue — full', () => {
  it('enqueueProcess uses PROCESS_WEBHOOK job', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    const wq = new WebhookQueue(q as never);
    await wq.enqueueProcess({ webhookId: 'w1' });
    expect(q.enqueue).toHaveBeenCalledWith(
      expect.any(String),
      PAYMENT_JOB_NAME.PROCESS_WEBHOOK,
      expect.objectContaining({ webhookId: 'w1' }),
      expect.any(Object),
    );
  });

  it('enqueueRetry uses RETRY_WEBHOOK job', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    const wq = new WebhookQueue(q as never);
    await wq.enqueueRetry({ webhookId: 'w1', attempt: 2 });
    expect(q.enqueue).toHaveBeenCalledWith(
      expect.any(String),
      PAYMENT_JOB_NAME.RETRY_WEBHOOK,
      expect.any(Object),
      expect.any(Object),
    );
  });

  it('enqueueCleanupStale uses CLEANUP_STALE_WEBHOOKS job', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    const wq = new WebhookQueue(q as never);
    await wq.enqueueCleanupStale();
    expect(q.enqueue).toHaveBeenCalledWith(
      expect.any(String),
      PAYMENT_JOB_NAME.CLEANUP_STALE_WEBHOOKS,
      expect.any(Object),
      expect.any(Object),
    );
  });

  it('enqueueCleanupStale custom delay', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    const wq = new WebhookQueue(q as never);
    await wq.enqueueCleanupStale(5000);
    expect(q.enqueue).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(Object),
      expect.objectContaining({ delayMs: 5000 }),
    );
  });
});
