/**
 * PaymentPrismaRepository — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PaymentPrismaRepository } from '@infrastructure/repos/payment.prisma.repository';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import {
  makeMockPrismaService,
  type MockPrismaService,
} from '@test-infra/prisma-mock';
import {
  makePrismaPaymentRow,
  TEST_UUIDS,
} from '@test-infra/entity-makers';

describe('PaymentPrismaRepository', () => {
  let prisma: MockPrismaService;
  let repo: PaymentPrismaRepository;
  let delegate: ReturnType<MockPrismaService['__delegate']>;

  beforeEach(() => {
    prisma = makeMockPrismaService();
    repo = new PaymentPrismaRepository(prisma as never);
    delegate = prisma.__delegate('payment');
  });

  describe('findById()', () => {
    it('returns entity for existing row', async () => {
      const row = makePrismaPaymentRow();
      delegate.findFirst.mockResolvedValue(row);
      const entity = await repo.findById(TEST_UUIDS.PAYMENT_ID);
      expect(entity).not.toBeNull();
      expect(entity?.id).toBe(TEST_UUIDS.PAYMENT_ID);
      expect(delegate.findFirst).toHaveBeenCalledWith({
        where: { id: TEST_UUIDS.PAYMENT_ID, deletedAt: null },
      });
    });

    it('returns null for missing row', async () => {
      delegate.findFirst.mockResolvedValue(null);
      expect(await repo.findById('nope')).toBeNull();
    });
  });

  describe('findByIdVO()', () => {
    it('delegates to id.value', async () => {
      delegate.findFirst.mockResolvedValue(makePrismaPaymentRow());
      const vo = { value: TEST_UUIDS.PAYMENT_ID } as never;
      const entity = await repo.findByIdVO(vo);
      expect(entity?.id).toBe(TEST_UUIDS.PAYMENT_ID);
    });
  });

  describe('findAll()', () => {
    it('returns empty array when no rows', async () => {
      delegate.findMany.mockResolvedValue([]);
      expect(await repo.findAll()).toEqual([]);
    });

    it('maps each row', async () => {
      delegate.findMany.mockResolvedValue([
        makePrismaPaymentRow(),
        makePrismaPaymentRow({ id: 'x' }),
      ]);
      const list = await repo.findAll();
      expect(list).toHaveLength(2);
    });
  });

  describe('exists()', () => {
    it('true when count > 0', async () => {
      delegate.count.mockResolvedValue(1);
      expect(await repo.exists('id')).toBe(true);
    });

    it('false when count = 0', async () => {
      delegate.count.mockResolvedValue(0);
      expect(await repo.exists('id')).toBe(false);
    });
  });

  describe('save()', () => {
    it('creates when not exists', async () => {
      const row = makePrismaPaymentRow();
      delegate.findUnique.mockResolvedValue(null);
      delegate.create.mockResolvedValue(row);
      const entity = PaymentPrismaMapper.toDomain(row);
      const result = await repo.save(entity);
      expect(delegate.create).toHaveBeenCalled();
      expect(result.id).toBe(row.id);
    });

    it('updates when exists', async () => {
      const row = makePrismaPaymentRow();
      delegate.findUnique.mockResolvedValue({ id: row.id });
      delegate.update.mockResolvedValue(row);
      const entity = PaymentPrismaMapper.toDomain(row);
      const result = await repo.save(entity);
      expect(delegate.update).toHaveBeenCalled();
      expect(result.id).toBe(row.id);
    });
  });

  describe('delete()', () => {
    it('calls delegate.delete', async () => {
      await repo.delete('id');
      expect(delegate.delete).toHaveBeenCalledWith({ where: { id: 'id' } });
    });
  });

  describe('softDelete()', () => {
    it('updates deletedAt', async () => {
      await repo.softDelete('id');
      expect(delegate.update).toHaveBeenCalled();
      const args = delegate.update.mock.calls[0][0] as { data: { deletedAt: unknown } };
      expect(args.data.deletedAt).toBeInstanceOf(Date);
    });
  });

  describe('findByOrder()', () => {
    it('filters by orderId', async () => {
      delegate.findMany.mockResolvedValue([]);
      await repo.findByOrder('order-1');
      expect(delegate.findMany).toHaveBeenCalledWith({
        where: { orderId: 'order-1', deletedAt: null },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('findByUser()', () => {
    it('filters by userId', async () => {
      delegate.findMany.mockResolvedValue([]);
      await repo.findByUser('user-1');
      expect(delegate.findMany).toHaveBeenCalled();
    });
  });

  describe('findByStatus()', () => {
    it('filters by status', async () => {
      delegate.findMany.mockResolvedValue([]);
      await repo.findByStatus('pending');
      expect(delegate.findMany).toHaveBeenCalled();
    });
  });

  describe('findByGatewayReference()', () => {
    it('returns row when found', async () => {
      const row = makePrismaPaymentRow({ gatewayReference: 'pi_123' });
      delegate.findFirst.mockResolvedValue(row);
      const result = await repo.findByGatewayReference('pi_123');
      expect(result?.id).toBe(row.id);
    });

    it('returns null when not found', async () => {
      delegate.findFirst.mockResolvedValue(null);
      expect(await repo.findByGatewayReference('missing')).toBeNull();
    });
  });

  describe('findPaginated()', () => {
    it('returns paginated items with total', async () => {
      delegate.findMany.mockResolvedValue([makePrismaPaymentRow()]);
      delegate.count.mockResolvedValue(1);
      const result = await repo.findPaginated({ page: 1, limit: 10 });
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(1);
    });

    it('applies filter', async () => {
      delegate.findMany.mockResolvedValue([]);
      delegate.count.mockResolvedValue(0);
      await repo.findPaginated({
        page: 1,
        limit: 10,
        filter: { status: 'pending', userId: 'u1' },
      });
      const args = delegate.findMany.mock.calls[0][0] as { where: Record<string, unknown> };
      expect(args.where['status']).toBe('pending');
      expect(args.where['userId']).toBe('u1');
    });

    it('applies sortBy', async () => {
      delegate.findMany.mockResolvedValue([]);
      delegate.count.mockResolvedValue(0);
      await repo.findPaginated({ page: 1, limit: 10, sortBy: 'amount', sortDir: 'asc' });
      const args = delegate.findMany.mock.calls[0][0] as { orderBy: Record<string, string> };
      expect(args.orderBy['amount']).toBe('asc');
    });
  });

  describe('getStats()', () => {
    it('aggregates byStatus + byMethod', async () => {
      delegate.findMany.mockResolvedValue([
        { status: 'paid', method: 'card', amount: 1000, currency: 'BDT' },
        { status: 'paid', method: 'card', amount: 500, currency: 'BDT' },
        { status: 'failed', method: 'cod', amount: 300, currency: 'BDT' },
      ]);
      const stats = await repo.getStats();
      expect(stats.total).toBe(3);
      expect(stats.totalAmount).toBe(1800);
      expect(stats.byStatus['paid']).toBe(2);
      expect(stats.byStatus['failed']).toBe(1);
      expect(stats.byMethod['card']).toBe(2);
      expect(stats.byMethod['cod']).toBe(1);
    });
  });

  describe('cron methods', () => {
    it('findStalePending uses cutoff', async () => {
      delegate.findMany.mockResolvedValue([]);
      await repo.findStalePending(30);
      const args = delegate.findMany.mock.calls[0][0] as { where: { createdAt: { lt: Date } } };
      expect(args.where.createdAt.lt).toBeInstanceOf(Date);
    });

    it('findExpiredAuthorizations uses cutoff', async () => {
      delegate.findMany.mockResolvedValue([]);
      await repo.findExpiredAuthorizations(168);
      expect(delegate.findMany).toHaveBeenCalled();
    });

    it('findRetryable filters failed/declined', async () => {
      delegate.findMany.mockResolvedValue([]);
      await repo.findRetryable();
      expect(delegate.findMany).toHaveBeenCalled();
    });
  });
});
