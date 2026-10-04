import { jest } from '@jest/globals';
import { PaymentQueue } from '../../src/module/infrastructure/queues/payment.queue.js';
import { RefundQueue } from '../../src/module/infrastructure/queues/refund.queue.js';
import { WebhookQueue } from '../../src/module/infrastructure/queues/webhook.queue.js';
import { PaymentRetryWorker } from '../../src/module/infrastructure/workers/payment-retry.worker.js';
import { PaymentExpiryWorker } from '../../src/module/infrastructure/workers/payment-expiry.worker.js';
import { PaymentNotificationService } from '../../src/module/infrastructure/services/external/payment-notification.service.js';
import { ReconciliationWorker } from '../../src/module/infrastructure/workers/reconciliation.worker.js';
import { PaymentEntity } from '../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { FailureReasonVO } from '../../src/module/domain/value-objects/primitives/failure-reason.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function make() {
  return PaymentEntity.create({
    id: UUID,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID),
      userId: UserIdVO.create(UUID),
      type: PaymentTypeVO.oneTime(),
      method: PaymentMethodVO.create('mobile_banking'),
      gateway: PaymentGatewayVO.create('bkash'),
      amount: 1000,
      currency: 'BDT',
    },
  });
}

describe('Queue default arg branches', () => {
  it('PaymentQueue.enqueueReconcile() no args', async () => {
    const q = { enqueue: jest.fn(async () => 'j') };
    await new PaymentQueue(q as never).enqueueReconcile();
    expect(q.enqueue).toHaveBeenCalled();
  });

  it('RefundQueue.enqueueRetry() default delay', async () => {
    const q = { enqueue: jest.fn(async () => 'j') };
    await new RefundQueue(q as never).enqueueRetry({ refundId: 'r', attempt: 1 });
    expect(q.enqueue).toHaveBeenCalled();
  });

  it('WebhookQueue.enqueueCleanupStale() default delay', async () => {
    const q = { enqueue: jest.fn(async () => 'j') };
    await new WebhookQueue(q as never).enqueueCleanupStale();
    expect(q.enqueue).toHaveBeenCalled();
  });
});

describe('Worker default concurrency / jobMatches', () => {
  it('PaymentRetryWorker onModuleInit registers', () => {
    const qs = { registerWorker: jest.fn() };
    const pr = { findByIdVO: jest.fn(), save: jest.fn() };
    const pq = { enqueueRetry: jest.fn() };
    const w = new PaymentRetryWorker(qs as never, pr as never, pq as never);
    w.onModuleInit();
    expect(qs.registerWorker).toHaveBeenCalled();
  });

  it('PaymentExpiryWorker onModuleInit registers (custom concurrency)', () => {
    const qs = { registerWorker: jest.fn() };
    const pr = { findByIdVO: jest.fn(), save: jest.fn() };
    const w = new PaymentExpiryWorker(qs as never, pr as never);
    w.onModuleInit();
    expect(qs.registerWorker).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function),
      2,
    );
  });

  it('ReconciliationWorker onModuleInit', () => {
    const w = new ReconciliationWorker(
      { findExpiredAuthorizations: jest.fn(), findStalePending: jest.fn(), findRetryable: jest.fn(), save: jest.fn() } as never,
      { enqueueRetry: jest.fn() } as never,
    );
    expect(() => w.onModuleInit()).not.toThrow();
  });
});

describe('PaymentNotificationService — exhaustive template coverage', () => {
  let svc: PaymentNotificationService;
  const email = { send: jest.fn(async () => ({ success: true })) };
  const sms = { send: jest.fn() };
  const push = { send: jest.fn(async () => ({ success: true })) };

  beforeEach(() => {
    svc = new PaymentNotificationService(email as never, sms as never, push as never);
  });

  const templates = [
    'payment_initiated', 'payment_captured', 'payment_paid',
    'payment_failed', 'payment_declined', 'payment_refunded',
    'payment_chargeback', 'refund_requested', 'refund_succeeded',
    'refund_failed', 'custom_unknown',
  ];

  for (const t of templates) {
    it(`customer + vendor template=${t}`, async () => {
      await svc.notifyCustomer({ userId: 'u', paymentId: 'p', template: t, data: { amount: 1, currency: 'BDT' } });
      await svc.notifyVendor({ userId: 'u', paymentId: 'p', template: t, data: { amount: 1, currency: 'BDT' } });
      expect(push.send).toHaveBeenCalled();
    });
  }
});

describe('ReconciliationWorker — extra branch coverage', () => {
  it('stale fail path', async () => {
    const pr = {
      findExpiredAuthorizations: jest.fn(async () => []),
      findStalePending: jest.fn(async () => [make()]),
      findRetryable: jest.fn(async () => []),
      save: jest.fn(async () => make()),
    };
    const q = { enqueueRetry: jest.fn(async () => 'j') };
    const w = new ReconciliationWorker(pr as never, q as never);
    const out = await w.run();
    expect(out.staleFailed).toBe(1);
  });

  it('expired authorization caught error path', async () => {
    const p = make();
    p.fail(FailureReasonVO.create('x'));
    const pr = {
      findExpiredAuthorizations: jest.fn(async () => [p]),
      findStalePending: jest.fn(async () => []),
      findRetryable: jest.fn(async () => []),
      save: jest.fn(async () => p),
    };
    const q = { enqueueRetry: jest.fn(async () => 'j') };
    const w = new ReconciliationWorker(pr as never, q as never);
    const out = await w.run();
    expect(out.expired).toBe(0); // failed payment cannot be expired
  });
});
