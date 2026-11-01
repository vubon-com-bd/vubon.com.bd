/**
 * TransactionPrismaRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { TransactionPrismaRepository } from '@infrastructure/repos/transaction.prisma.repository';
import { TransactionPrismaMapper } from '@infrastructure/mappers/transaction.prisma.mapper';
import { makeMockPrismaService, type MockPrismaService } from '@test-infra/prisma-mock';
import { makePrismaTransactionRow, TEST_UUIDS } from '@test-infra/entity-makers';

describe('TransactionPrismaRepository', () => {
  let prisma: MockPrismaService;
  let repo: TransactionPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    repo = new TransactionPrismaRepository(prisma as never);
    delegate = prisma.__delegate('transaction');
  });

  it('findById returns entity', async () => {
    delegate.findFirst.mockResolvedValue(makePrismaTransactionRow());
    const entity = await repo.findById(TEST_UUIDS.TXN_ID);
    expect(entity?.id).toBe(TEST_UUIDS.TXN_ID);
  });

  it('findByPayment filters paymentId', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findByPayment('pay-1');
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['paymentId']).toBe('pay-1');
  });

  it('findByGatewayReference filters reference', async () => {
    delegate.findFirst.mockResolvedValue(makePrismaTransactionRow());
    await repo.findByGatewayReference('txn_123');
    const args = delegate.findFirst.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['gatewayReference']).toBe('txn_123');
  });

  it('findByStatus filters status', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findByStatus('success');
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['status']).toBe('success');
  });

  it('save updates when exists', async () => {
    delegate.findUnique.mockResolvedValue({ id: TEST_UUIDS.TXN_ID });
    delegate.update.mockResolvedValue(makePrismaTransactionRow());
    const entity = TransactionPrismaMapper.toDomain(makePrismaTransactionRow());
    await repo.save(entity);
    expect(delegate.update).toHaveBeenCalled();
  });

  it('getStats aggregates byType + byStatus', async () => {
    delegate.findMany.mockResolvedValue([
      { type: 'payment', status: 'success', amount: 1000, currency: 'BDT' },
      { type: 'refund', status: 'success', amount: 200, currency: 'BDT' },
      { type: 'payment', status: 'failed', amount: 500, currency: 'BDT' },
    ]);
    const stats = await repo.getStats();
    expect(stats.total).toBe(3);
    expect(stats.totalAmount).toBe(1700);
    expect(stats.byType['payment']).toBe(2);
    expect(stats.byType['refund']).toBe(1);
    expect(stats.byStatus['success']).toBe(2);
  });

  it('findPendingStale filters pending with cutoff', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findPendingStale(30);
    expect(delegate.findMany).toHaveBeenCalled();
  });

  it('findSettleable filters success', async () => {
    delegate.findMany.mockResolvedValue([]);
    await repo.findSettleable();
    const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
    expect(args.where['status']).toBe('success');
  });
});
