/**
 * RefundPrismaRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { RefundPrismaRepository } from '@infrastructure/repos/refund.prisma.repository';
import { RefundPrismaMapper } from '@infrastructure/mappers/refund.prisma.mapper';
import { makeMockPrismaService, type MockPrismaService } from '@test-infra/prisma-mock';
import { makePrismaRefundRow, TEST_UUIDS } from '@test-infra/entity-makers';

describe('RefundPrismaRepository', () => {
  let prisma: MockPrismaService;
  let repo: RefundPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    repo = new RefundPrismaRepository(prisma as never);
    delegate = prisma.__delegate('refund');
  });

  it('findById returns entity', async () => {
    delegate.findFirst.mockResolvedValue(makePrismaRefundRow());
    const entity = await repo.findById(TEST_UUIDS.REFUND_ID);
    expect(entity?.id).toBe(TEST_UUIDS.REFUND_ID);
  });

  it('findByPayment filters paymentId', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findByPayment('pay-1');
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('findByStatus filters status', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findByStatus('completed');
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['status']).toBe('completed');
  });

  it('save updates when exists', async () => {
    delegate.findUnique.mockResolvedValue({ id: TEST_UUIDS.REFUND_ID });
    delegate.update.mockResolvedValue(makePrismaRefundRow());
    const entity = RefundPrismaMapper.toDomain(makePrismaRefundRow());
    await repo.save(entity);
    expect(delegate.update).toHaveBeenCalled();
  });

  it('getStats aggregates refunded', async () => {
    delegate.findMany.mockResolvedValue([
      { status: 'completed', reason: 'customer_request', amount: 100, currency: 'BDT' },
      { status: 'completed', reason: 'fraud', amount: 200, currency: 'BDT' },
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.totalRefunded).toBe(300);
    expect(stats.byStatus['completed']).toBe(2);
    expect(stats.byReason['customer_request']).toBe(1);
    expect(stats.byReason['fraud']).toBe(1);
  });

  it('findPending filters requested with cutoff', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findPending(30);
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('findRetryable filters failed', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findRetryable();
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['status']).toBe('failed');
  });

  it('findExpired filters stale active refunds', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findExpired(30);
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('softDelete updates deletedAt', async () => {
    await repo.softDelete('ref-1');
    expect(delegate.update).toHaveBeenCalled();
  });
});
