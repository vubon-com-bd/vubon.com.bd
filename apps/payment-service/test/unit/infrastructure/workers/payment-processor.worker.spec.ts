/**
 * PaymentProcessorWorker — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PaymentProcessorWorker } from '@infrastructure/workers/payment-processor.worker';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import { makePrismaPaymentRow } from '@test-infra/entity-makers';
import { makeMockQueueService } from '@test-infra/queue-mock';
import { makeMockPaymentRepository } from '@app-fixtures/mock-helpers';
import type { PaymentEntity } from '@domain/entities/payment.entity';

const PAYMENT_ID = '11111111-1111-4111-8111-111111111111';

function makeRepoMock() {
  const m = makeMockPaymentRepository();
  return m;
}

describe('PaymentProcessorWorker', () => {
  let worker: PaymentProcessorWorker;
  let queue: ReturnType<typeof makeMockQueueService>;
  let repo: ReturnType<typeof makeRepoMock>;

  beforeEach(() => {
    queue = makeMockQueueService();
    repo = makeRepoMock();
    worker = new PaymentProcessorWorker(
      queue as never,
      repo as never,
    );
  });

  it('registers itself on module init', () => {
    worker.onModuleInit();
    expect(queue.registerWorker).toHaveBeenCalledWith(
      expect.stringContaining('payment_processing'),
      expect.any(Function),
      expect.any(Number),
    );
  });

  it('moves pending payment to processing', async () => {
    const payment = PaymentPrismaMapper.toDomain(
      makePrismaPaymentRow({ id: PAYMENT_ID, status: 'pending' }),
    );
    repo.findByIdVO.mockResolvedValue(payment);
    repo.save.mockImplementation(async (p: PaymentEntity) => p);

    const result = await (worker as unknown as {
      handle: (p: { paymentId: string }) => Promise<unknown>;
    }).handle({ paymentId: PAYMENT_ID });

    expect(result).toEqual({ processed: true });
    expect(payment.isProcessing()).toBe(true);
    expect(repo.save).toHaveBeenCalled();
  });

  it('skips when payment not found', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    const result = await (worker as unknown as {
      handle: (p: { paymentId: string }) => Promise<unknown>;
    }).handle({ paymentId: PAYMENT_ID });
    expect(result).toEqual({ skipped: true });
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('skips when payment already processing', async () => {
    const payment = PaymentPrismaMapper.toDomain(
      makePrismaPaymentRow({ id: PAYMENT_ID, status: 'processing' }),
    );
    repo.findByIdVO.mockResolvedValue(payment);
    const result = await (worker as unknown as {
      handle: (p: { paymentId: string }) => Promise<unknown>;
    }).handle({ paymentId: PAYMENT_ID });
    expect(result).toEqual(
      expect.objectContaining({ skipped: true }),
    );
    expect(repo.save).not.toHaveBeenCalled();
  });
});
