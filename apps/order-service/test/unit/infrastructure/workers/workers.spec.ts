/**
 * Worker smoke tests — each worker should expose `process()` that returns data
 */
import { OrderProcessorWorker } from '../../../../src/module/infrastructure/workers/order-processor.worker.js';
import { CheckoutCleanupWorker } from '../../../../src/module/infrastructure/workers/checkout-cleanup.worker.js';
import { DeliveryTrackerWorker } from '../../../../src/module/infrastructure/workers/delivery-tracker.worker.js';
import { OrderTimeoutWorker } from '../../../../src/module/infrastructure/workers/order-timeout.worker.js';
import { ReturnProcessorWorker } from '../../../../src/module/infrastructure/workers/return-processor.worker.js';
import { AnalyticsProcessorWorker } from '../../../../src/module/infrastructure/workers/analytics-processor.worker.js';
import { ORDER_JOB_NAME } from '../../../../src/module/infrastructure/queues/queue.constants.js';

function fakeJob(name: string): { name: string; id: string; attemptsMade: number } {
  return { name, id: 'job-1', attemptsMade: 0 };
}

describe('OrderProcessorWorker', () => {
  let worker: OrderProcessorWorker;
  beforeEach(() => { worker = new OrderProcessorWorker(); });

  it('processes PROCESS_ORDER job', async () => {
    const result = await worker.process(fakeJob(ORDER_JOB_NAME.PROCESS_ORDER));
    expect(result).toEqual({ ok: true });
  });

  it('processes TIMEOUT_ORDER job', async () => {
    const result = await worker.process(fakeJob(ORDER_JOB_NAME.TIMEOUT_ORDER));
    expect(result).toEqual({ ok: true });
  });

  it('skips unknown job', async () => {
    const result = await worker.process(fakeJob('unknown-job'));
    expect(result).toEqual({ skipped: true });
  });
});

describe('CheckoutCleanupWorker', () => {
  it('processes CLEANUP_CHECKOUT', async () => {
    const worker = new CheckoutCleanupWorker();
    const result = await worker.process(fakeJob(ORDER_JOB_NAME.CLEANUP_CHECKOUT));
    expect(result).toEqual({ cleaned: 0 });
  });

  it('skips unknown', async () => {
    const worker = new CheckoutCleanupWorker();
    expect(await worker.process(fakeJob('x'))).toEqual({ skipped: true });
  });
});

describe('DeliveryTrackerWorker', () => {
  it('processes TRACK_DELIVERY', async () => {
    const worker = new DeliveryTrackerWorker();
    const result = await worker.process(fakeJob(ORDER_JOB_NAME.TRACK_DELIVERY));
    expect(result).toEqual({ status: 'unknown' });
  });

  it('skips unknown', async () => {
    const worker = new DeliveryTrackerWorker();
    expect(await worker.process(fakeJob('x'))).toEqual({ skipped: true });
  });
});

describe('OrderTimeoutWorker', () => {
  it('processes TIMEOUT_ORDER', async () => {
    const worker = new OrderTimeoutWorker();
    const result = await worker.process(fakeJob(ORDER_JOB_NAME.TIMEOUT_ORDER));
    expect(result).toEqual({ cancelled: true });
  });

  it('skips unknown', async () => {
    const worker = new OrderTimeoutWorker();
    expect(await worker.process(fakeJob('x'))).toEqual({ skipped: true });
  });
});

describe('ReturnProcessorWorker', () => {
  it('processes PROCESS_RETURN', async () => {
    const worker = new ReturnProcessorWorker();
    const result = await worker.process(fakeJob(ORDER_JOB_NAME.PROCESS_RETURN));
    expect(result).toEqual({ processed: true });
  });

  it('skips unknown', async () => {
    const worker = new ReturnProcessorWorker();
    expect(await worker.process(fakeJob('x'))).toEqual({ skipped: true });
  });
});

describe('AnalyticsProcessorWorker', () => {
  it('processes PROCESS_ANALYTICS', async () => {
    const worker = new AnalyticsProcessorWorker();
    const result = await worker.process(fakeJob(ORDER_JOB_NAME.PROCESS_ANALYTICS));
    expect(result).toEqual({ tracked: true });
  });

  it('skips unknown', async () => {
    const worker = new AnalyticsProcessorWorker();
    expect(await worker.process(fakeJob('x'))).toEqual({ skipped: true });
  });
});
