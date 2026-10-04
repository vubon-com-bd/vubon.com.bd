import { jest } from '@jest/globals';
import { PaymentQueue } from '../../../../src/module/infrastructure/queues/payment.queue.js';
import { PAYMENT_JOB_NAME } from '../../../../src/module/infrastructure/queues/queue.constants.js';

describe('PaymentQueue — job names', () => {
  it('enqueueRetry uses RETRY_PAYMENT job', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    const pq = new PaymentQueue(q as never);
    await pq.enqueueRetry({ paymentId: 'p', attempt: 1 });
    expect(q.enqueue).toHaveBeenCalledWith(
      expect.any(String),
      PAYMENT_JOB_NAME.RETRY_PAYMENT,
      expect.any(Object),
      expect.any(Object),
    );
  });

  it('enqueueExpire uses EXPIRE_PAYMENT job', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    const pq = new PaymentQueue(q as never);
    await pq.enqueueExpire({ paymentId: 'p' });
    expect(q.enqueue).toHaveBeenCalledWith(
      expect.any(String),
      PAYMENT_JOB_NAME.EXPIRE_PAYMENT,
      expect.any(Object),
      expect.any(Object),
    );
  });

  it('enqueueReconcile uses RECONCILE_PAYMENT job', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    const pq = new PaymentQueue(q as never);
    await pq.enqueueReconcile({ paymentId: 'p', fromDate: '2026-01-01' });
    expect(q.enqueue).toHaveBeenCalledWith(
      expect.any(String),
      PAYMENT_JOB_NAME.RECONCILE_PAYMENT,
      expect.any(Object),
      expect.any(Object),
    );
  });
});
