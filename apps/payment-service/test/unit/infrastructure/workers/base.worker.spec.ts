/**
 * BaseWorker — Unit Tests
 * @module payment-service/test/unit/infrastructure/workers
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { BaseWorker } from '@infrastructure/workers/base.worker';
import { makeMockQueueService } from '@test-infra/queue-mock';

jest.mock('@vubon/shared-config/infrastructure', () => ({
  QUEUE_CONFIG: {
    autoStartWorkers: true,
    workerConcurrency: 5,
  },
}));

class TestWorker extends BaseWorker<{ foo: string }> {
  protected readonly queueName = 'test-queue';
  public handledPayloads: { foo: string }[] = [];

  protected async handle(payload: { foo: string }): Promise<unknown> {
    this.handledPayloads.push(payload);
    return { ok: true };
  }

  public testConcurrency(): number {
    return this.concurrency();
  }
}

describe('BaseWorker', () => {
  let queue: ReturnType<typeof makeMockQueueService>;
  let worker: TestWorker;

  beforeEach(() => {
    queue = makeMockQueueService();
    worker = new TestWorker(queue as never, 'TestWorker');
  });

  it('registers worker on init with concurrency', () => {
    worker.onModuleInit();
    expect(queue.registerWorker).toHaveBeenCalledWith(
      'test-queue',
      expect.any(Function),
      5,
    );
  });

  it('concurrency() returns QUEUE_CONFIG.workerConcurrency', () => {
    expect(worker.testConcurrency()).toBe(5);
  });

  it('handle is invoked by the registered processor', async () => {
    worker.onModuleInit();
    const [, processor] = queue.registerWorker.mock.calls[0] as [
      string,
      (payload: { foo: string }) => Promise<unknown>,
      number,
    ];
    const result = await processor({ foo: 'bar' });
    expect(result).toEqual({ ok: true });
    expect(worker.handledPayloads).toHaveLength(1);
    expect(worker.handledPayloads[0]).toEqual({ foo: 'bar' });
  });
});
