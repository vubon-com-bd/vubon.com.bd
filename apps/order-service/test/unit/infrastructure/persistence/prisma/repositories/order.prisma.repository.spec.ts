import { jest } from '@jest/globals';
import { OrderPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/order.prisma.repository.js';
import { OrderNumberVO } from '../../../../../../src/module/domain/value-objects/primitives/order-number.vo.js';
import { OrderStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/order-status.vo.js';
import { CustomerIdVO } from '../../../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { VendorIdVO } from '../../../../../../src/module/domain/value-objects/primitives/vendor-id.vo.js';
import { mockPrisma, orderRow, UUID_ORDER, UUID_CUSTOMER, UUID_VENDOR, NOW_ISO } from './_prisma-mock.js';

describe('OrderPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: OrderPrismaRepository;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new OrderPrismaRepository(prisma as never);
  });

  describe('findById()', () => {
    it('returns entity when found', async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(orderRow());
      const result = await repo.findById(UUID_ORDER);
      expect(result?.id).toBe(UUID_ORDER);
      expect(result?.orderNumber.value).toBe('ORD-2026-000001');
    });

    it('returns null when not found', async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(null);
      expect(await repo.findById(UUID_ORDER)).toBeNull();
    });

    it('returns null on error', async () => {
      (prisma.order.findUnique as jest.Mock).mockRejectedValue(new Error('DB'));
      expect(await repo.findById(UUID_ORDER)).toBeNull();
    });
  });

  describe('findByIdVO()', () => {
    it('delegates to findById', async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(orderRow());
      const idVO = { value: UUID_ORDER } as { value: string };
      const result = await repo.findByIdVO(idVO as never);
      expect(result?.id).toBe(UUID_ORDER);
    });
  });

  describe('findByNumber()', () => {
    it('returns entity', async () => {
      (prisma.order.findFirst as jest.Mock).mockResolvedValue(orderRow());
      const num = OrderNumberVO.create('ORD-2026-000001');
      const result = await repo.findByNumber(num);
      expect(result?.orderNumber.value).toBe('ORD-2026-000001');
    });

    it('returns null on error', async () => {
      (prisma.order.findFirst as jest.Mock).mockRejectedValue(new Error('DB'));
      const num = OrderNumberVO.create('ORD-2026-000001');
      expect(await repo.findByNumber(num)).toBeNull();
    });
  });

  describe('findByCustomerId()', () => {
    it('returns entities', async () => {
      (prisma.order.findMany as jest.Mock).mockResolvedValue([orderRow()]);
      const cid = CustomerIdVO.create(UUID_CUSTOMER);
      const result = await repo.findByCustomerId(cid);
      expect(result).toHaveLength(1);
    });

    it('returns [] on error', async () => {
      (prisma.order.findMany as jest.Mock).mockRejectedValue(new Error('DB'));
      const cid = CustomerIdVO.create(UUID_CUSTOMER);
      expect(await repo.findByCustomerId(cid)).toEqual([]);
    });
  });

  describe('findByVendorId()', () => {
    it('returns entities', async () => {
      (prisma.order.findMany as jest.Mock).mockResolvedValue([orderRow({ vendorIds: [UUID_VENDOR] })]);
      const vid = VendorIdVO.create(UUID_VENDOR);
      const result = await repo.findByVendorId(vid);
      expect(result).toHaveLength(1);
    });

    it('returns [] on error', async () => {
      (prisma.order.findMany as jest.Mock).mockRejectedValue(new Error('DB'));
      const vid = VendorIdVO.create(UUID_VENDOR);
      expect(await repo.findByVendorId(vid)).toEqual([]);
    });
  });

  describe('findByStatus()', () => {
    it('returns entities', async () => {
      (prisma.order.findMany as jest.Mock).mockResolvedValue([orderRow()]);
      const st = OrderStatusVO.pending();
      expect(await repo.findByStatus(st)).toHaveLength(1);
    });

    it('returns [] on error', async () => {
      (prisma.order.findMany as jest.Mock).mockRejectedValue(new Error('DB'));
      const st = OrderStatusVO.pending();
      expect(await repo.findByStatus(st)).toEqual([]);
    });
  });

  describe('findByCustomerAndStatus()', () => {
    it('returns entities', async () => {
      (prisma.order.findMany as jest.Mock).mockResolvedValue([orderRow()]);
      const cid = CustomerIdVO.create(UUID_CUSTOMER);
      const st = OrderStatusVO.pending();
      expect(await repo.findByCustomerAndStatus(cid, st)).toHaveLength(1);
    });

    it('returns [] on error', async () => {
      (prisma.order.findMany as jest.Mock).mockRejectedValue(new Error('DB'));
      const cid = CustomerIdVO.create(UUID_CUSTOMER);
      const st = OrderStatusVO.pending();
      expect(await repo.findByCustomerAndStatus(cid, st)).toEqual([]);
    });
  });

  describe('findAll()', () => {
    it('returns array', async () => {
      (prisma.order.findMany as jest.Mock).mockResolvedValue([orderRow()]);
      expect(await repo.findAll()).toHaveLength(1);
    });

    it('returns [] on error', async () => {
      (prisma.order.findMany as jest.Mock).mockRejectedValue(new Error('DB'));
      expect(await repo.findAll()).toEqual([]);
    });
  });

  describe('existsByNumber()', () => {
    it('true when count > 0', async () => {
      (prisma.order.count as jest.Mock).mockResolvedValue(1);
      expect(await repo.existsByNumber(OrderNumberVO.create('ORD-2026-000001'))).toBe(true);
    });

    it('false on error', async () => {
      (prisma.order.count as jest.Mock).mockRejectedValue(new Error('DB'));
      expect(await repo.existsByNumber(OrderNumberVO.create('ORD-2026-000001'))).toBe(false);
    });
  });

  describe('exists()', () => {
    it('true when count > 0', async () => {
      (prisma.order.count as jest.Mock).mockResolvedValue(1);
      expect(await repo.exists(UUID_ORDER)).toBe(true);
    });

    it('false on error', async () => {
      (prisma.order.count as jest.Mock).mockRejectedValue(new Error('DB'));
      expect(await repo.exists(UUID_ORDER)).toBe(false);
    });
  });

  describe('findPaginated()', () => {
    it('returns paginated result', async () => {
      (prisma.order.findMany as jest.Mock).mockResolvedValue([orderRow()]);
      (prisma.order.count as jest.Mock).mockResolvedValue(1);
      const result = await repo.findPaginated({ page: 1, limit: 20 });
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.totalPages).toBe(1);
    });

    it('applies filters', async () => {
      (prisma.order.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.order.count as jest.Mock).mockResolvedValue(0);
      await repo.findPaginated({
        page: 1,
        limit: 20,
        filter: {
          customerId: UUID_CUSTOMER,
          status: 'pending',
          priority: 'normal',
          type: 'regular',
          minTotal: 10,
          maxTotal: 1000,
          fromDate: NOW_ISO,
          toDate: NOW_ISO,
          search: 'ORD',
          vendorId: UUID_VENDOR,
        },
      });
      expect(prisma.order.findMany).toHaveBeenCalled();
    });

    it('returns empty on error', async () => {
      (prisma.order.findMany as jest.Mock).mockRejectedValue(new Error('DB'));
      const result = await repo.findPaginated({ page: 1, limit: 20 });
      expect(result.items).toEqual([]);
      expect(result.total).toBe(0);
    });
  });

  describe('countByCustomer()', () => {
    it('returns count', async () => {
      (prisma.order.count as jest.Mock).mockResolvedValue(5);
      const cid = CustomerIdVO.create(UUID_CUSTOMER);
      expect(await repo.countByCustomer(cid)).toBe(5);
    });

    it('returns 0 on error', async () => {
      (prisma.order.count as jest.Mock).mockRejectedValue(new Error('DB'));
      const cid = CustomerIdVO.create(UUID_CUSTOMER);
      expect(await repo.countByCustomer(cid)).toBe(0);
    });
  });

  describe('findPendingOlderThan()', () => {
    it('returns entities', async () => {
      (prisma.order.findMany as jest.Mock).mockResolvedValue([orderRow()]);
      expect(await repo.findPendingOlderThan(24)).toHaveLength(1);
    });

    it('returns [] on error', async () => {
      (prisma.order.findMany as jest.Mock).mockRejectedValue(new Error('DB'));
      expect(await repo.findPendingOlderThan(24)).toEqual([]);
    });
  });

  describe('getStats()', () => {
    it('returns aggregated stats', async () => {
      (prisma.order.count as jest.Mock).mockResolvedValue(10);
      (prisma.order.aggregate as jest.Mock).mockResolvedValue({
        _sum: { total: 1000 },
        _avg: { total: 100 },
      });
      (prisma.order.groupBy as jest.Mock).mockResolvedValue([
        { status: 'pending', _count: { _all: 5 } },
      ]);
      const result = await repo.getStats();
      expect(result.totalOrders).toBe(10);
      expect(result.totalRevenue).toBe(1000);
      expect(result.byStatus.pending).toBe(5);
    });

    it('applies filters', async () => {
      (prisma.order.count as jest.Mock).mockResolvedValue(0);
      (prisma.order.aggregate as jest.Mock).mockResolvedValue({ _sum: { total: null }, _avg: { total: null } });
      (prisma.order.groupBy as jest.Mock).mockResolvedValue([]);
      await repo.getStats(UUID_CUSTOMER, UUID_VENDOR, NOW_ISO, NOW_ISO);
      expect(prisma.order.count).toHaveBeenCalled();
    });

    it('returns empty stats on error', async () => {
      (prisma.order.count as jest.Mock).mockRejectedValue(new Error('DB'));
      const result = await repo.getStats();
      expect(result.totalOrders).toBe(0);
    });
  });

  describe('save()', () => {
    it('creates new when not existing', async () => {
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.order.create as jest.Mock).mockResolvedValue(orderRow());
      (prisma.orderItem.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });
      const entity = {
        id: UUID_ORDER,
        orderNumber: OrderNumberVO.create('ORD-2026-000001'),
        customerId: CustomerIdVO.create(UUID_CUSTOMER),
        vendorIds: [],
        type: { value: 'regular' },
        status: { value: 'pending' },
        priority: { value: 'normal' },
        currency: 'BDT',
        subtotal: 100,
        discountAmount: 0,
        taxAmount: 0,
        shippingAmount: 0,
        total: 100,
        items: [],
        version: 1,
        createdAt: NOW_ISO,
        updatedAt: NOW_ISO,
        paymentId: undefined,
        paymentStatus: undefined,
        paymentMethod: undefined,
        shippingMethod: undefined,
        trackingNumber: undefined,
        notes: undefined,
        customerNotes: undefined,
        confirmedAt: undefined,
        shippedAt: undefined,
        deliveredAt: undefined,
        cancelledAt: undefined,
        completedAt: undefined,
      };
      const result = await repo.save(entity as never);
      expect(result.id).toBe(UUID_ORDER);
    });

    it('updates when existing', async () => {
      (prisma.order.findUnique as jest.Mock)
        .mockResolvedValueOnce(orderRow())
        .mockResolvedValueOnce(orderRow());
      (prisma.order.update as jest.Mock).mockResolvedValue(orderRow());
      (prisma.orderItem.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });
      const entity = {
        id: UUID_ORDER,
        orderNumber: OrderNumberVO.create('ORD-2026-000001'),
        customerId: CustomerIdVO.create(UUID_CUSTOMER),
        vendorIds: [],
        type: { value: 'regular' },
        status: { value: 'pending' },
        priority: { value: 'normal' },
        currency: 'BDT',
        subtotal: 100,
        discountAmount: 0,
        taxAmount: 0,
        shippingAmount: 0,
        total: 100,
        items: [],
        version: 1,
        createdAt: NOW_ISO,
        updatedAt: NOW_ISO,
      };
      await repo.save(entity as never);
      expect(prisma.order.update).toHaveBeenCalled();
    });

    it('throws on error', async () => {
      (prisma.order.findUnique as jest.Mock).mockRejectedValue(new Error('DB'));
      await expect(repo.save({ id: UUID_ORDER } as never)).rejects.toThrow();
    });
  });

  describe('delete() / softDelete()', () => {
    it('delete() calls update', async () => {
      (prisma.order.update as jest.Mock).mockResolvedValue(orderRow());
      await repo.delete(UUID_ORDER);
      expect(prisma.order.update).toHaveBeenCalled();
    });

    it('delete() swallows error', async () => {
      (prisma.order.update as jest.Mock).mockRejectedValue(new Error('DB'));
      await expect(repo.delete(UUID_ORDER)).resolves.toBeUndefined();
    });

    it('softDelete() delegates to delete', async () => {
      (prisma.order.update as jest.Mock).mockResolvedValue(orderRow());
      await repo.softDelete(UUID_ORDER, 'admin');
      expect(prisma.order.update).toHaveBeenCalled();
    });
  });
});
