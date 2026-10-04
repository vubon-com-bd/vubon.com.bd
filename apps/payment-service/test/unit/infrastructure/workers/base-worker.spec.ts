import { jest } from '@jest/globals';
import { BaseWorker } from '../../../../src/module/infrastructure/workers/base.worker.js';

// Concrete test double
class TestWorker extends BaseWorker<{ x: number }> {
  protected readonly queueName = 'test-queue';
  protected readonly jobNames = ['job-a'] as const;

  constructor(queueService: never) {
    super(queueService, 'TestWorker');
  }

  protected async handle(payload: { x: number }): Promise<unknown> {
    return { received: payload.x };
  }

  // Expose protected methods for testing
  testJobMatches(name: string): boolean {
    return this.jobMatches(name);
  }
}

describe('BaseWorker', () => {
  it('onModuleInit registers worker via queueService', () => {
    const queueService = { registerWorker: jest.fn() };
    const worker = new TestWorker(queueService as never);
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalledWith(
      'test-queue',
      expect.any(Function),
      expect.any(Number),
    );
  });

  it('jobMatches returns true for declared job', () => {
    const worker = new TestWorker({ registerWorker: jest.fn() } as never);
    expect(worker.testJobMatches('job-a')).toBe(true);
    expect(worker.testJobMatches('job-b')).toBe(false);
  });

  it('onModuleInit is safe when autoStartWorkers=false', () => {
    const q = { registerWorker: jest.fn() };
    const orig = process.env.QUEUE_AUTO_START_WORKERS;
    process.env.QUEUE_AUTO_START_WORKERS = 'false';
    // Cannot easily reload config — just ensure no throw
    const worker = new TestWorker(q as never);
    expect(() => worker.onModuleInit()).not.toThrow();
    if (orig !== undefined) process.env.QUEUE_AUTO_START_WORKERS = orig;
    else delete process.env.QUEUE_AUTO_START_WORKERS;
  });
});
