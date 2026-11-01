/**
 * InvoicePrismaRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { InvoicePrismaRepository } from '@infrastructure/repos/invoice.prisma.repository';
import { InvoicePrismaMapper } from '@infrastructure/mappers/invoice.prisma.mapper';
import { makeMockPrismaService, type MockPrismaService } from '@test-infra/prisma-mock';

const ROW = {
  id: 'inv-1',
  invoiceNumber: 'INV-2025-000001',
  userId: 'user-1',
  orderId: 'order-1',
  status: 'issued',
  subtotal: 1000,
  taxAmount: 150,
  total: 1150,
  currency: 'BDT',
  issuedAt: new Date('2025-01-15T10:00:00.000Z'),
  dueAt: new Date('2025-02-15T10:00:00.000Z'),
  paidAt: null,
  voidedAt: null,
  refundedAt: null,
  notes: null,
  createdAt: new Date('2025-01-14T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

describe('InvoicePrismaRepository', () => {
  let prisma: MockPrismaService;
  let repo: InvoicePrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    repo = new InvoicePrismaRepository(prisma as never);
    delegate = prisma.__delegate('invoice');
  });

  it('findById returns entity', async () => {
    delegate.findFirst.mockResolvedValue(ROW);
    const entity = await repo.findById('inv-1');
    expect(entity?.invoiceNumber.value).toBe('INV-2025-000001');
  });

  it('findByNumber filters invoiceNumber', async () => {
    delegate.findFirst.mockResolvedValue(ROW);
    const entity = await repo.findByNumber('INV-2025-000001');
    expect(entity?.id).toBe('inv-1');
  });

  it('findByUser filters userId', async () => {
    delegate.findMany.mockResolvedValue([ROW]);
    const list = await repo.findByUser('user-1');
    expect(list).toHaveLength(1);
  });

  it('findByOrder filters orderId', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findByOrder('order-1');
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('findByStatus filters status', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findByStatus('paid');
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('getStats aggregates outstanding', async () => {
    delegate.findMany.mockResolvedValue([
      { status: 'paid', total: 1000, currency: 'BDT' },
      { status: 'issued', total: 1150, currency: 'BDT' },
      { status: 'overdue', total: 500, currency: 'BDT' },
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(3);
    expect(stats.totalAmount).toBe(2650);
    expect(stats.outstandingAmount).toBe(1650);
    expect(stats.byStatus['paid']).toBe(1);
    expect(stats.byStatus['issued']).toBe(1);
    expect(stats.byStatus['overdue']).toBe(1);
  });

  it('findOverdue filters issued with dueAt in past', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findOverdue();
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('findDueSoon filters issued with dueAt in future', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findDueSoon(7);
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('save updates when exists', async () => {
    delegate.findUnique.mockResolvedValue({ id: 'inv-1' });
    delegate.update.mockResolvedValue(ROW);
    const entity = InvoicePrismaMapper.toDomain(ROW);
    await repo.save(entity);
    expect(delegate.update).toHaveBeenCalled();
  });
});
