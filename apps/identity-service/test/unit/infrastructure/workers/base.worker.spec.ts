/**
 * BaseWorker unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { BaseWorker } from '@infrastructure/workers/base.worker.js';
import { makeMockQueueService } from '@fixtures/index.js';

class TestWorker extends BaseWorker<{ value: string }> {
  protected readonly queueName = 'test-queue';
  protected readonly jobNames = ['test-job'] as const;

  constructor(queueService: never) {
    super(queueService, 'TestWorker');
  }

  protected async handle(payload: { value: string }): Promise<unknown> {
    return { handled: payload.value };
  }

  protected concurrency(): number {
    return 2;
  }

  public matches(name: string): boolean {
    return this.jobMatches(name);
  }
}

describe('BaseWorker', () => {
  let queueService: ReturnType<typeof makeMockQueueService>;
  let worker: TestWorker;

  beforeEach(() => {
    queueService = makeMockQueueService();
    worker = new TestWorker(queueService as never);
  });

  it('onModuleInit registers worker with correct queue', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalledWith(
      'test-queue',
      expect.any(Function),
      2,
    );
  });

  it('registered processor calls handle()', async () => {
    worker.onModuleInit();
    const processor = queueService.__registeredWorkers[0].processor as (p: unknown) => Promise<unknown>;
    const result = await processor({ value: 'hello' });
    expect(result).toEqual({ handled: 'hello' });
  });

  it('onModuleInit swallows registration errors', () => {
    queueService.registerWorker.mockImplementationOnce(() => {
      throw new Error('register failed');
    });
    expect(() => worker.onModuleInit()).not.toThrow();
  });

  it('jobMatches true for known job', () => {
    expect(worker.matches('test-job')).toBe(true);
  });

  it('jobMatches false for unknown job', () => {
    expect(worker.matches('other-job')).toBe(false);
  });

  it('default concurrency is 5', () => {
    class DefaultWorker extends BaseWorker<{ x: string }> {
      protected readonly queueName = 'q';
      protected readonly jobNames = [] as const;
      constructor(qs: never) { super(qs, 'DefaultWorker'); }
      protected async handle(_p: { x: string }): Promise<unknown> { return null; }
    }
    const w = new DefaultWorker(queueService as never);
    w.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalledWith('q', expect.any(Function), 5);
  });
});
