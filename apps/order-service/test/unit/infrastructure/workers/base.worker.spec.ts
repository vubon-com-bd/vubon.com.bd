/**
 * BaseWorker — direct subclass to test all logging methods
 */
import { BaseWorker } from '../../../../src/module/infrastructure/workers/base.worker.js';

class TestWorker extends BaseWorker {
  start(job: { name: string; id?: string; attemptsMade?: number }) {
    this.logJobStart(job);
  }
  success(job: { name: string; id?: string; attemptsMade?: number }) {
    this.logJobSuccess(job);
  }
  failure(job: { name: string; id?: string; attemptsMade?: number }, err: unknown) {
    this.logJobFailure(job, err);
  }
}

describe('BaseWorker', () => {
  let worker: TestWorker;

  beforeEach(() => { worker = new TestWorker(); });

  it('logJobStart logs job name + attempt', () => {
    expect(() =>
      worker.start({ name: 'process', id: 'job-1', attemptsMade: 0 }),
    ).not.toThrow();
  });

  it('logJobStart without id', () => {
    expect(() => worker.start({ name: 'process' })).not.toThrow();
  });

  it('logJobSuccess logs', () => {
    expect(() => worker.success({ name: 'process', id: 'j1', attemptsMade: 1 })).not.toThrow();
  });

  it('logJobFailure with Error', () => {
    expect(() =>
      worker.failure({ name: 'process', id: 'j1', attemptsMade: 1 }, new Error('boom')),
    ).not.toThrow();
  });

  it('logJobFailure with non-Error', () => {
    expect(() =>
      worker.failure({ name: 'process', id: 'j1' }, 'string-error'),
    ).not.toThrow();
  });

  it('logJobFailure without id', () => {
    expect(() =>
      worker.failure({ name: 'process' }, new Error('x')),
    ).not.toThrow();
  });
});
