/**
 * Worker Pipeline E2E
 * @module payment-service/test/e2e/infrastructure
 *
 * Verifies:
 *  - Queue enqueue → worker processing
 *  - Worker updates repo (via findUnique → update path)
 *  - Multiple workers on same queue
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PaymentProcessorWorker } from '@infrastructure/workers/payment-processor.worker';
import { PaymentExpiryWorker } from '@infrastructure/workers/payment-expiry.worker';
import { PaymentRetryWorker } from '@infrastructure/workers/payment-retry.worker';
import { PaymentPrismaRepository } from '@infrastructure/repos/payment.prisma.repository';
import {
  makePrismaMock,
  makeQueueMock,
  type PrismaMock,
  type QueueMock,
  UUID,
  NOW,
} from './setup/infra-e2e-fixtures';

function makePaymentRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID.PAYMENT,
    orderId: UUID.ORDER,
    userId: UUID.USER,
    status: 'pending',
    method: 'card',
    methodType: 'online',
    provider: 'stripe',
    providerEnv: 'sandbox',
    amount: 1000,
    currency: 'BDT',
    gatewayReference: null,
    authorizedAt: null,
    capturedAt: null,
    paidAt: null,
    refundedAmount: null,
    failureReason: null,
    failureCode: null,
    metadata: null,
    version: 0,
    createdAt: new Date(NOW),
    updatedAt: new Date(NOW),
    deletedAt: null,
    ...overrides,
  };
}

describe('E2E: Worker Pipeline', () => {
  let prisma: PrismaMock;
  let repo: PaymentPrismaRepository;
  let queue: QueueMock;
  let delegate: ReturnType<PrismaMock['__delegate']>;

  beforeEach(() => {
    prisma = makePrismaMock();
    repo = new PaymentPrismaRepository(prisma as never);
    queue = makeQueueMock();
    delegate = prisma.__delegate('payment');
  });

  describe('PaymentProcessorWorker', () => {
    it('pending → processing on init', async () => {
      const worker = new PaymentProcessorWorker(queue as never, repo as never);
      worker.onModuleInit();
      expect(queue.registerWorker).toHaveBeenCalled();

      const row = makePaymentRow({ status: 'pending' });
      const updatedRow = { ...row, status: 'processing' };

      delegate.findFirst.mockResolvedValue(row);
      delegate.findUnique.mockResolvedValue({ id: UUID.PAYMENT }); // exists
      delegate.update.mockResolvedValue(updatedRow);

      await queue.__runWorker('payment_processing', { paymentId: UUID.PAYMENT });

      expect(delegate.update).toHaveBeenCalled();
    });
  });

  describe('PaymentExpiryWorker', () => {
    it('expires pending payment', async () => {
      const worker = new PaymentExpiryWorker(queue as never, repo as never);
      worker.onModuleInit();

      const row = makePaymentRow({ status: 'pending' });
      delegate.findFirst.mockResolvedValue(row);
      delegate.findUnique.mockResolvedValue({ id: UUID.PAYMENT });
      delegate.update.mockResolvedValue({ ...row, status: 'failed', failureReason: 'expired' });

      await queue.__runWorker('payment_processing', { paymentId: UUID.PAYMENT });

      expect(delegate.update).toHaveBeenCalled();
    });
  });

  describe('PaymentRetryWorker', () => {
    it('skips when max attempts reached', async () => {
      const worker = new PaymentRetryWorker(queue as never, repo as never);
      worker.onModuleInit();

      const result = await queue.__runWorker('payment_processing', {
        paymentId: UUID.PAYMENT,
        attempt: 99,
      });

      expect(result).toEqual(
        expect.objectContaining({ skipped: true, reason: 'max_attempts' }),
      );
    });

    it('retries a failed payment', async () => {
      const worker = new PaymentRetryWorker(queue as never, repo as never);
      worker.onModuleInit();

      const row = makePaymentRow({ status: 'failed', failureReason: 'declined' });
      delegate.findFirst.mockResolvedValue(row);
      delegate.findUnique.mockResolvedValue({ id: UUID.PAYMENT });
      delegate.update.mockResolvedValue({ ...row, status: 'pending' });

      const result = await queue.__runWorker('payment_processing', {
        paymentId: UUID.PAYMENT,
        attempt: 1,
      });

      expect(result).toEqual(
        expect.objectContaining({ processed: true, attempt: 1 }),
      );
    });
  });

  describe('Full worker pipeline: enqueue → process → persist', () => {
    it('end-to-end: pending payment processed and persisted', async () => {
      // 1. Enqueue
      await queue.enqueue('payment_processing', 'process-payment', {
        paymentId: UUID.PAYMENT,
      });
      expect(queue.__jobs).toHaveLength(1);

      // 2. Register worker
      const worker = new PaymentProcessorWorker(queue as never, repo as never);
      worker.onModuleInit();

      // 3. Worker processes
      const row = makePaymentRow({ status: 'pending' });
      delegate.findFirst.mockResolvedValue(row);
      delegate.findUnique.mockResolvedValue({ id: UUID.PAYMENT });
      delegate.update.mockResolvedValue({ ...row, status: 'processing' });

      await queue.__runWorker('payment_processing', { paymentId: UUID.PAYMENT });

      // 4. Verify persistence
      expect(delegate.update).toHaveBeenCalled();
    });
  });
});
