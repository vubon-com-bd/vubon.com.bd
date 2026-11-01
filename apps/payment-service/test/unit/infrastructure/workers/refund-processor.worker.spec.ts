/**
 * RefundProcessorWorker — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RefundProcessorWorker } from '@infrastructure/workers/refund-processor.worker';
import { RefundPrismaMapper } from '@infrastructure/mappers/refund.prisma.mapper';
import { makePrismaRefundRow } from '@test-infra/entity-makers';
import { makeMockQueueService } from '@test-infra/queue-mock';

const REFUND_ID = '44444444-4444-4444-8444-444444444444';

function makeRefundRepoMock() {
  return {
    findByIdVO: jest.fn(),
    save: jest.fn(),
  };
}

describe('RefundProcessorWorker', () => {
  let worker: RefundProcessorWorker;
  let queue: ReturnType<typeof makeMockQueueService>;
  let repo: ReturnType<typeof makeRefundRepoMock>;

  beforeEach(() => {
    queue = makeMockQueueService();
    repo = makeRefundRepoMock();
    worker = new RefundProcessorWorker(queue as never, repo as never);
  });

  it('registers worker on init', () => {
    worker.onModuleInit();
    expect(queue.registerWorker).toHaveBeenCalled();
  });

  it('skips when refund not found', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    const result = await (worker as unknown as {
      handle: (p: { refundId: string }) => Promise<unknown>;
    }).handle({ refundId: REFUND_ID });
    expect(result).toEqual({ skipped: true });
  });

  it('skips when not approved', async () => {
    const refund = RefundPrismaMapper.toDomain(
      makePrismaRefundRow({ status: 'requested' }),
    );
    repo.findByIdVO.mockResolvedValue(refund);
    const result = await (worker as unknown as {
      handle: (p: { refundId: string }) => Promise<unknown>;
    }).handle({ refundId: REFUND_ID });
    expect(result).toEqual(
      expect.objectContaining({ skipped: true }),
    );
  });

  it('moves approved refund to processing', async () => {
    const refund = RefundPrismaMapper.toDomain(
      makePrismaRefundRow({ status: 'approved', approvedBy: 'admin-1' }),
    );
    repo.findByIdVO.mockResolvedValue(refund);
    repo.save.mockResolvedValue(refund);

    const result = await (worker as unknown as {
      handle: (p: { refundId: string }) => Promise<unknown>;
    }).handle({ refundId: REFUND_ID });

    expect(result).toEqual({ processed: true });
    expect(refund.status.isProcessing()).toBe(true);
    expect(repo.save).toHaveBeenCalled();
  });
});
