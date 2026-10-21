/**
 * WebhookProcessorWorker — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { WebhookProcessorWorker } from '@infrastructure/workers/webhook-processor.worker';
import { makeMockQueueService } from '@test-infra/queue-mock';

describe('WebhookProcessorWorker', () => {
  let worker: WebhookProcessorWorker;
  let queue: ReturnType<typeof makeMockQueueService>;

  beforeEach(() => {
    queue = makeMockQueueService();
    worker = new WebhookProcessorWorker(queue as never);
  });

  it('registers worker on init', () => {
    worker.onModuleInit();
    expect(queue.registerWorker).toHaveBeenCalled();
  });

  it('processes webhook payload', async () => {
    const result = await (worker as unknown as {
      handle: (p: { provider: string; eventId: string; paymentId?: string }) => Promise<unknown>;
    }).handle({
      provider: 'stripe',
      eventId: 'evt_123',
      paymentId: 'pay-1',
    });
    expect(result).toEqual({ processed: true });
  });

  it('processes webhook without paymentId', async () => {
    const result = await (worker as unknown as {
      handle: (p: { provider: string; eventId: string; paymentId?: string }) => Promise<unknown>;
    }).handle({
      provider: 'bkash',
      eventId: 'evt_456',
    });
    expect(result).toEqual({ processed: true });
  });
});
