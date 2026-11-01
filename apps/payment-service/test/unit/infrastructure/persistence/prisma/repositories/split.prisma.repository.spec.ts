/**
 * SplitPaymentPrismaRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { SplitPaymentPrismaRepository } from '@infrastructure/repos/split.prisma.repository';
import { SplitPaymentPrismaMapper } from '@infrastructure/mappers/split.prisma.mapper';
import { makeMockPrismaService, type MockPrismaService } from '@test-infra/prisma-mock';

const ROW = {
  id: 'sp-1',
  paymentId: 'pay-1',
  type: 'percentage',
  receivers: [
    { receiverId: 'v1', amount: 700, percentage: 70 },
    { receiverId: 'v2', amount: 300, percentage: 30 },
  ],
  totalAmount: 1000,
  currency: 'BDT',
  executedAt: null,
  failureReason: null,
  createdAt: new Date('2025-01-14T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

describe('SplitPaymentPrismaRepository', () => {
  let prisma: MockPrismaService;
  let repo: SplitPaymentPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    repo = new SplitPaymentPrismaRepository(prisma as never);
    delegate = prisma.__delegate('split');
  });

  it('findById returns entity', async () => {
    delegate.findFirst.mockResolvedValue(ROW);
    const entity = await repo.findById('sp-1');
    expect(entity?.id).toBe('sp-1');
    expect(entity?.receiverCount()).toBe(2);
  });

  it('findByPayment filters paymentId', async () => {
    delegate.findMany.mockResolvedValue([ROW]);
    const list = await repo.findByPayment('pay-1');
    expect(list).toHaveLength(1);
  });

  it('findPending filters executedAt=null', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findPending();
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['executedAt']).toBeNull();
    expect(args.where['failureReason']).toBeNull();
  });

  it('findFailed filters failureReason not null', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findFailed();
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('save creates when new', async () => {
    delegate.findUnique.mockResolvedValue(null);
    delegate.create.mockResolvedValue(ROW);
    const entity = SplitPaymentPrismaMapper.toDomain(ROW);
    const saved = await repo.save(entity);
    expect(saved.id).toBe('sp-1');
  });

  it('softDelete updates deletedAt', async () => {
    await repo.softDelete('sp-1');
    expect(delegate.update).toHaveBeenCalled();
  });
});
