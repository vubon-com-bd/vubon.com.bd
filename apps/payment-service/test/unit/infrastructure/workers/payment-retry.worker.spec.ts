/**
 * PaymentRetryWorker — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { PaymentRetryWorker } from '@infrastructure/workers/payment-retry.worker';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import { makePrismaPaymentRow } from '@test-infra/entity-makers';
import { makeMockQueueService } from '@test-infra/queue-mock';
import { makeMockPaymentRepository } from '@app-fixtures/mock-helpers';

const PAYMENT_ID = '11111111-1111-4111-8111-111111111111';

describe('PaymentRetryWorker', () => {
  let worker: PaymentRetryWorker;
  let queue: ReturnType<typeof makeMockQueueService>;
  let repo: ReturnType<typeof makeMockPaymentRepository>;

  beforeEach(() => {
    queue = makeMockQueueService();
    repo = makeMockPaymentRepository();
    worker = new PaymentRetryWorker(queue as never, repo as never);
  });

  it('registers worker on init', () => {
    worker.onModuleInit();
    expect(queue.registerWorker).toHaveBeenCalled();
  });

  it('skips when attempt > max attempts', async () => {
    const result = await (worker as unknown as {
      handle: (p: { paymentId: string; attempt: number }) => Promise<unknown>;
    }).handle({ paymentId: PAYMENT_ID, attempt: 99 });
    expect(result).toEqual(
      expect.objectContaining({ skipped: true, reason: 'max_attempts' }),
    );
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('skips when payment not found', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    const result = await (worker as unknown as {
      handle: (p: { paymentId: string; attempt: number }) => Promise<unknown>;
    }).handle({ paymentId: PAYMENT_ID, attempt: 1 });
    expect(result).toEqual({ skipped: true });
  });

  it('skips when not retryable', async () => {
    const payment = PaymentPrismaMapper.toDomain(
      makePrismaPaymentRow({ status: 'paid' }),
    );
    repo.findByIdVO.mockResolvedValue(payment);
    const result = await (worker as unknown as {
      handle: (p: { paymentId: string; attempt: number }) => Promise<unknown>;
    }).handle({ paymentId: PAYMENT_ID, attempt: 1 });
    expect(result).toEqual(
      expect.objectContaining({ skipped: true }),
    );
  });

  it('retries a failed payment (failed → pending)', async () => {
    const payment = PaymentPrismaMapper.toDomain(
      makePrismaPaymentRow({ status: 'failed', failureReason: 'card_declined' }),
    );
    repo.findByIdVO.mockResolvedValue(payment);
    repo.save.mockResolvedValue(payment);

    const result = await (worker as unknown as {
      handle: (p: { paymentId: string; attempt: number }) => Promise<unknown>;
    }).handle({ paymentId: PAYMENT_ID, attempt: 1 });

    expect(result).toEqual({ processed: true, attempt: 1 });
    expect(payment.isPending()).toBe(true);
    expect(repo.save).toHaveBeenCalled();
  });
});
