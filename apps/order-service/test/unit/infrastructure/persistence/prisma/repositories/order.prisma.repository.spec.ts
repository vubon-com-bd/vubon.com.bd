import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderPrismaRepository } from '@infrastructure/repos/order.prisma.repository';
import type { PrismaOrderRow } from '@infrastructure/mappers/order.prisma.mapper';

const makeRow = (overrides: Partial<PrismaOrderRow> = {}): PrismaOrderRow => ({
  id: 'order-1',
  orderNumber: 'ORD-2024-000001',
  customerId: 'cust-1',
  vendorIds: ['vendor-1'],
  type: 'regular',
  status: 'pending',
  priority: 'normal',
  subtotal: 1000,
  discountAmount: 50,
  taxAmount: 150,
  shippingAmount: 100,
  total: 1200,
  currency: 'BDT',
  paymentId: null,
  paymentStatus: null,
  paymentMethod: null,
  shippingMethod: null,
  trackingNumber: null,
  notes: null,
  customerNotes: null,
  confirmedAt: null,
  shippedAt: null,
  deliveredAt: null,
  cancelledAt: null,
  completedAt: null,
  version: 0,
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2024-01-01T10:00:00Z'),
  deletedAt: null,
  ...overrides,
});

describe('OrderPrismaRepository', () => {
  let repo: OrderPrismaRepository;
  let mockDelegate: {
    findFirst: jest.Mock;
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    count: jest.Mock;
  };
  let mockPrisma: { getModel: jest.Mock };

  beforeEach(() => {
    mockDelegate = {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    };
    mockPrisma = {
      getModel: jest.fn(() => mockDelegate),
    };
    repo = new OrderPrismaRepository(mockPrisma as never);
  });

  describe('findById', () => {
    it('returns entity when found', async () => {
      mockDelegate.findFirst.mockResolvedValue(makeRow());
      const result = await repo.findById('order-1');
      expect(result).not.toBeNull();
      expect(result?.id).toBe('order-1');
      expect(mockDelegate.findFirst).toHaveBeenCalledWith({
        where: { id: 'order-1', deletedAt: null },
      });
    });

    it('returns null when not found', async () => {
      mockDelegate.findFirst.mockResolvedValue(null);
      const result = await repo.findById('missing');
      expect(result).toBeNull();
    });
  });

  describe('findByOrderNumber', () => {
    it('returns entity by orderNumber', async () => {
      mockDelegate.findFirst.mockResolvedValue(makeRow());
      const result = await repo.findByOrderNumber('ORD-2024-000001');
      expect(result?.id).toBe('order-1');
      expect(mockDelegate.findFirst).toHaveBeenCalledWith({
        where: { orderNumber: 'ORD-2024-000001', deletedAt: null },
      });
    });

    it('returns null when orderNumber not found', async () => {
      mockDelegate.findFirst.mockResolvedValue(null);
      const result = await repo.findByOrderNumber('MISSING');
      expect(result).toBeNull();
    });
  });

  describe('findByCustomer', () => {
    it('returns list of entities', async () => {
      mockDelegate.findMany.mockResolvedValue([makeRow(), makeRow({ id: 'order-2' })]);
      const result = await repo.findByCustomer('cust-1');
      expect(result.length).toBe(2);
    });
  });

  describe('findByStatus', () => {
    it('filters by status', async () => {
      mockDelegate.findMany.mockResolvedValue([makeRow()]);
      const result = await repo.findByStatus('pending');
      expect(result.length).toBe(1);
      expect(mockDelegate.findMany).toHaveBeenCalledWith({
        where: { status: 'pending', deletedAt: null },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('exists', () => {
    it('returns true when count > 0', async () => {
      mockDelegate.count.mockResolvedValue(1);
      expect(await repo.exists('order-1')).toBe(true);
    });

    it('returns false when count = 0', async () => {
      mockDelegate.count.mockResolvedValue(0);
      expect(await repo.exists('missing')).toBe(false);
    });
  });

  describe('save', () => {
    it('creates new entity when not exists', async () => {
      mockDelegate.findUnique.mockResolvedValue(null);
      mockDelegate.create.mockResolvedValue(makeRow());
      const { OrderPrismaMapper } = await import(
        '@infrastructure/mappers/order.prisma.mapper'
      );
      const entity = OrderPrismaMapper.toDomain(makeRow());
      const saved = await repo.save(entity);
      expect(saved.id).toBe('order-1');
      expect(mockDelegate.create).toHaveBeenCalled();
      expect(mockDelegate.update).not.toHaveBeenCalled();
    });

    it('updates existing entity', async () => {
      mockDelegate.findUnique.mockResolvedValue({ id: 'order-1' });
      mockDelegate.update.mockResolvedValue(makeRow());
      const { OrderPrismaMapper } = await import(
        '@infrastructure/mappers/order.prisma.mapper'
      );
      const entity = OrderPrismaMapper.toDomain(makeRow());
      const saved = await repo.save(entity);
      expect(saved.id).toBe('order-1');
      expect(mockDelegate.update).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('calls delegate delete', async () => {
      mockDelegate.delete.mockResolvedValue(makeRow());
      await repo.delete('order-1');
      expect(mockDelegate.delete).toHaveBeenCalledWith({
        where: { id: 'order-1' },
      });
    });
  });

  describe('softDelete', () => {
    it('calls delegate update with deletedAt', async () => {
      mockDelegate.update.mockResolvedValue(makeRow({ deletedAt: new Date() }));
      await repo.softDelete('order-1');
      expect(mockDelegate.update).toHaveBeenCalledWith({
        where: { id: 'order-1' },
        data: { deletedAt: expect.any(Date) },
      });
    });
  });

  describe('findPaginated', () => {
    it('returns paginated result', async () => {
      mockDelegate.findMany.mockResolvedValue([makeRow()]);
      mockDelegate.count.mockResolvedValue(1);
      const result = await repo.findPaginated({ page: 1, limit: 10 });
      expect(result.items.length).toBe(1);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(1);
    });

    it('applies filter', async () => {
      mockDelegate.findMany.mockResolvedValue([]);
      mockDelegate.count.mockResolvedValue(0);
      await repo.findPaginated({
        page: 1,
        limit: 10,
        filter: { customerId: 'cust-1', status: 'pending' },
      });
      const call = mockDelegate.findMany.mock.calls[0][0] as {
        where: Record<string, unknown>;
      };
      expect(call.where['customerId']).toBe('cust-1');
      expect(call.where['status']).toBe('pending');
    });
  });

  describe('getStats', () => {
    it('aggregates stats from rows', async () => {
      mockDelegate.findMany.mockResolvedValue([
        { status: 'pending', total: 1000, currency: 'BDT' },
        { status: 'completed', total: 2000, currency: 'BDT' },
        { status: 'pending', total: 500, currency: 'BDT' },
      ]);
      const stats = await repo.getStats();
      expect(stats.total).toBe(3);
      expect(stats.totalRevenue).toBe(3500);
      expect(stats.averageOrderValue).toBeCloseTo(1166.67, 1);
      expect(stats.byStatus['pending']).toBe(2);
      expect(stats.byStatus['completed']).toBe(1);
    });
  });
});
