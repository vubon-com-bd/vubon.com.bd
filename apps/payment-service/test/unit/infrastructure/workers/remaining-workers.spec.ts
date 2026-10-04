import { jest } from '@jest/globals';
import { RefundProcessorWorker } from '../../../../src/module/infrastructure/workers/refund-processor.worker.js';
import { WebhookProcessorWorker } from '../../../../src/module/infrastructure/workers/webhook-processor.worker.js';
import { ReconciliationWorker } from '../../../../src/module/infrastructure/workers/reconciliation.worker.js';
import { RefundEntity } from '../../../../src/module/domain/entities/refund.entity.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { RefundReasonVO } from '../../../../src/module/domain/value-objects/primitives/refund-reason.vo.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { GatewayPaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeRefund(): RefundEntity {
  return RefundEntity.request({
    id: UUID,
    now: NOW,
    props: {
      paymentId: PaymentIdVO.create(UUID),
      amount: 500,
      currency: 'BDT',
      reason: RefundReasonVO.create('test'),
    },
  });
}

function makePendingPayment(): PaymentEntity {
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

function makeCapturedPayment(): PaymentEntity {
  const p = makePendingPayment();
  p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
  p.authorize(GatewayPaymentIdVO.create('gw_1'));
  p.capture();
  return p;
}

// ═══ RefundProcessorWorker ═══
describe('RefundProcessorWorker', () => {
  let worker: RefundProcessorWorker;
  let queueService: { registerWorker: jest.Mock };
  let refundRepo: { findByIdVO: jest.Mock; save: jest.Mock };
  let paymentRepo: { findByIdVO: jest.Mock; save: jest.Mock };
  let txRepo: { save: jest.Mock };
  let gatewayResolver: { resolve: jest.Mock };
  let refundQueue: { enqueueRetry: jest.Mock };

  beforeEach(() => {
    queueService = { registerWorker: jest.fn() };
    refundRepo = { findByIdVO: jest.fn(), save: jest.fn(async (e: unknown) => e) };
    paymentRepo = { findByIdVO: jest.fn(), save: jest.fn(async (e: unknown) => e) };
    txRepo = { save: jest.fn(async (e: unknown) => e) };
    gatewayResolver = {
      resolve: jest.fn(() => ({
        isEnabled: () => true,
        refund: jest.fn(async () => ({
          success: true,
          gatewayRefundId: 'gw_rf_1',
          processedAt: NOW,
        })),
      })),
    };
    refundQueue = { enqueueRetry: jest.fn(async () => 'job') };
    worker = new RefundProcessorWorker(
      queueService as never,
      refundRepo as never,
      paymentRepo as never,
      txRepo as never,
      gatewayResolver as never,
      refundQueue as never,
    );
  });

  const handle = (payload: unknown) =>
    (worker as never as { handle: (p: unknown) => Promise<unknown> }).handle(payload);

  it('skips when refund not found', async () => {
    refundRepo.findByIdVO.mockResolvedValue(null);
    expect(await handle({ refundId: UUID })).toMatchObject({ skipped: true });
  });

  it('skips when refund already final', async () => {
    const r = makeRefund();
    r.startProcessing();
    r.succeed('gw', NOW);
    refundRepo.findByIdVO.mockResolvedValue(r);
    expect(await handle({ refundId: UUID })).toMatchObject({ skipped: true });
  });

  it('fails when payment not found', async () => {
    refundRepo.findByIdVO.mockResolvedValue(makeRefund());
    paymentRepo.findByIdVO.mockResolvedValue(null);
    const out = await handle({ refundId: UUID });
    expect(out).toMatchObject({ failed: true });
  });

  it('completes refund via gateway', async () => {
    refundRepo.findByIdVO.mockResolvedValue(makeRefund());
    paymentRepo.findByIdVO.mockResolvedValue(makeCapturedPayment());
    const out = await handle({ refundId: UUID });
    expect(out).toMatchObject({ refunded: true });
    expect(txRepo.save).toHaveBeenCalled();
  });

  it('handles gateway refund failure', async () => {
    gatewayResolver.resolve.mockReturnValue({
      isEnabled: () => true,
      refund: jest.fn(async () => ({ success: false, error: 'gw fail' })),
    });
    refundRepo.findByIdVO.mockResolvedValue(makeRefund());
    paymentRepo.findByIdVO.mockResolvedValue(makeCapturedPayment());
    const out = await handle({ refundId: UUID });
    expect(out).toMatchObject({ failed: true });
  });

  it('handles disabled gateway → uses manual fallback', async () => {
    gatewayResolver.resolve.mockReturnValue({
      isEnabled: () => false,
      refund: jest.fn(),
    });
    refundRepo.findByIdVO.mockResolvedValue(makeRefund());
    paymentRepo.findByIdVO.mockResolvedValue(makeCapturedPayment());
    const out = await handle({ refundId: UUID });
    expect(out).toMatchObject({ refunded: true });
  });
});

// ═══ WebhookProcessorWorker ═══
describe('WebhookProcessorWorker', () => {
  let worker: WebhookProcessorWorker;
  let queueService: { registerWorker: jest.Mock };
  let webhookService: { getById: jest.Mock; process: jest.Mock };

  beforeEach(() => {
    queueService = { registerWorker: jest.fn() };
    webhookService = {
      getById: jest.fn(),
      process: jest.fn(async () => ({ success: true, webhookId: UUID, processed: true })),
    };
    worker = new WebhookProcessorWorker(queueService as never, webhookService as never);
  });

  const handle = (payload: unknown) =>
    (worker as never as { handle: (p: unknown) => Promise<unknown> }).handle(payload);

  it('skips when webhook not found', async () => {
    webhookService.getById.mockResolvedValue(null);
    expect(await handle({ webhookId: UUID })).toMatchObject({ skipped: true });
  });

  it('skips when already processed', async () => {
    webhookService.getById.mockResolvedValue({
      processed: true,
      gateway: 'bkash',
      gatewayEventId: 'e',
      eventType: 'payment.succeeded',
    });
    expect(await handle({ webhookId: UUID })).toMatchObject({ skipped: true });
  });

  it('re-processes unprocessed webhook', async () => {
    webhookService.getById.mockResolvedValue({
      processed: false,
      gateway: 'bkash',
      gatewayEventId: 'e',
      eventType: 'payment.succeeded',
    });
    const out = await handle({ webhookId: UUID });
    expect(out).toMatchObject({ success: true });
  });
});

// ═══ ReconciliationWorker ═══
describe('ReconciliationWorker', () => {
  let worker: ReconciliationWorker;
  let paymentRepo: {
    findExpiredAuthorizations: jest.Mock;
    findStalePending: jest.Mock;
    findRetryable: jest.Mock;
    save: jest.Mock;
  };
  let paymentQueue: { enqueueRetry: jest.Mock };

  beforeEach(() => {
    paymentRepo = {
      findExpiredAuthorizations: jest.fn(async () => []),
      findStalePending: jest.fn(async () => []),
      findRetryable: jest.fn(async () => []),
      save: jest.fn(async (e: unknown) => e),
    };
    paymentQueue = { enqueueRetry: jest.fn(async () => 'job') };
    worker = new ReconciliationWorker(paymentRepo as never, paymentQueue as never);
  });

  it('runs with no stale records', async () => {
    const out = await worker.run();
    expect(out).toEqual({ expired: 0, staleFailed: 0, retryEnqueued: 0 });
  });

  it('expires stale authorizations', async () => {
    const p = makePendingPayment();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    paymentRepo.findExpiredAuthorizations.mockResolvedValue([p]);
    const out = await worker.run();
    expect(out.expired).toBe(1);
  });

  it('fails stale pendings', async () => {
    paymentRepo.findStalePending.mockResolvedValue([makePendingPayment()]);
    const out = await worker.run();
    expect(out.staleFailed).toBe(1);
  });

  it('enqueues retryable payments', async () => {
    paymentRepo.findRetryable.mockResolvedValue([makePendingPayment()]);
    const out = await worker.run();
    expect(out.retryEnqueued).toBe(1);
  });

  it('handles save failure during expiry', async () => {
    const p = makePendingPayment();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    paymentRepo.findExpiredAuthorizations.mockResolvedValue([p]);
    paymentRepo.save.mockRejectedValueOnce(new Error('save err'));
    const out = await worker.run();
    expect(out.expired).toBe(0);
  });

  it('handles enqueue failure', async () => {
    paymentRepo.findRetryable.mockResolvedValue([makePendingPayment()]);
    paymentQueue.enqueueRetry.mockRejectedValue(new Error('q err'));
    const out = await worker.run();
    expect(out.retryEnqueued).toBe(0);
  });
});
