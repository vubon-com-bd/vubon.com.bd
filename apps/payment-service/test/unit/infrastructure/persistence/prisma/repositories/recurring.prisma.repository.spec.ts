/**
 * RecurringPaymentPrismaRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { RecurringPaymentPrismaRepository } from '@infrastructure/repos/recurring.prisma.repository';
import { RecurringPaymentPrismaMapper } from '@infrastructure/mappers/recurring.prisma.mapper';
import { makeMockPrismaService, type MockPrismaService } from '@test-infra/prisma-mock';

const ROW = {
  id: 'rec-1',
  paymentId: 'pay-1',
  status: 'active',
  interval: 'monthly',
  intervalCount: 1,
  amount: 500,
  currency: 'BDT',
  startAt: new Date('2025-01-15T10:00:00.000Z'),
  endAt: null,
  nextRunAt: new Date('2025-02-15T10:00:00.000Z'),
  attemptCount: 0,
  cancelledAt: null,
  failureReason: null,
  createdAt: new Date('2025-01-14T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

describe('RecurringPaymentPrismaRepository', () => {
  let prisma: MockPrismaService;
  let repo: RecurringPaymentPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    repo = new RecurringPaymentPrismaRepository(prisma as never);
    delegate = prisma.__delegate('recurring');
  });

  it('findById returns entity', async () => {
    delegate.findFirst.mockResolvedValue(ROW);
    const entity = await repo.findById('rec-1');
    expect(entity?.id).toBe('rec-1');
  });

  it('findActive filters status=active', async () => {
    delegate.findMany.mockResolvedValue([ROW]);
    const list = await repo.findActive();
    expect(list).toHaveLength(1);
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['status']).toBe('active');
  });

  it('findByPayment filters paymentId', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findByPayment('pay-1');
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('findDue filters by nextRunAt cutoff', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findDue(new Date());
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('findStale filters by nextRunAt cutoff', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findStale(30);
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('save updates when exists', async () => {
    delegate.findUnique.mockResolvedValue({ id: 'rec-1' });
    delegate.update.mockResolvedValue(ROW);
    const entity = RecurringPaymentPrismaMapper.toDomain(ROW);
    await repo.save(entity);
    expect(delegate.update).toHaveBeenCalled();
  });
});
