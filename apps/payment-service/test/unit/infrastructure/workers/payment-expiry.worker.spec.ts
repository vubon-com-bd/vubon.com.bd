/**
 * PaymentExpiryWorker — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { PaymentExpiryWorker } from '@infrastructure/workers/payment-expiry.worker';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import { makePrismaPaymentRow } from '@test-infra/entity-makers';
import { makeMockQueueService } from '@test-infra/queue-mock';
import { makeMockPaymentRepository } from '@app-fixtures/mock-helpers';

const PAYMENT_ID = '11111111-1111-4111-8111-111111111111';

describe('PaymentExpiryWorker', () => {
  let worker: PaymentExpiryWorker;
  let queue: ReturnType<typeof makeMockQueueService>;
  let repo: ReturnType<typeof makeMockPaymentRepository>;

  beforeEach(() => {
    queue = makeMockQueueService();
    repo = makeMockPaymentRepository();
    worker = new PaymentExpiryWorker(queue as never, repo as never);
  });

  it('registers worker on init', () => {
    worker.onModuleInit();
    expect(queue.registerWorker).toHaveBeenCalled();
  });

  it('skips when payment not found', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    const result = await (worker as unknown as {
      handle: (p: { paymentId: string }) => Promise<unknown>;
    }).handle({ paymentId: PAYMENT_ID });
    expect(result).toEqual({ skipped: true });
  });

  it('skips when already final', async () => {
    const payment = PaymentPrismaMapper.toDomain(
      makePrismaPaymentRow({
        status: 'paid',
        paidAt: new Date(),
        capturedAt: new Date(),
      }),
    );
    repo.findByIdVO.mockResolvedValue(payment);
    const result = await (worker as unknown as {
      handle: (p: { paymentId: string }) => Promise<unknown>;
    }).handle({ paymentId: PAYMENT_ID });
    expect(result).toEqual(
      expect.objectContaining({ skipped: true, reason: 'already_final' }),
    );
  });

  it('expires a pending payment', async () => {
    const payment = PaymentPrismaMapper.toDomain(
      makePrismaPaymentRow({ status: 'pending' }),
    );
    repo.findByIdVO.mockResolvedValue(payment);
    repo.save.mockResolvedValue(payment);

    const result = await (worker as unknown as {
      handle: (p: { paymentId: string }) => Promise<unknown>;
    }).handle({ paymentId: PAYMENT_ID });

    expect(result).toEqual({ expired: true });
    expect(repo.save).toHaveBeenCalled();
    expect(payment.isFailed()).toBe(true);
  });
});
