import { OrderService } from '../../../../src/module/application/services/impl/order.service.js';
import { OrderNotFoundApplicationError } from '../../../../src/module/application/errors/order.errors.js';
import {
  makeOrder,
  makeMockOrderRepo,
  UUID_ORDER,
  UUID_CUSTOMER,
} from './_helpers.js';

describe('OrderService', () => {
  let repo: ReturnType<typeof makeMockOrderRepo>;
  let service: OrderService;

  beforeEach(() => {
    repo = makeMockOrderRepo();
    service = new OrderService(repo as never);
  });

  describe('create()', () => {
    it('creates order, calls repo.save, returns DTO', async () => {
      const dto = {
        customerId: UUID_CUSTOMER,
        items: [
          {
            productId: '33333333-3333-4333-8333-333333333333',
            quantity: 2,
            unitPrice: 100,
          },
        ],
        shippingAddress: {
          fullName: 'John', phone: '017', line1: '123 Main',
          city: 'Dhaka', country: 'BD',
        },
        currency: 'BDT',
      };
      const result = await service.create(dto as never);
      expect(repo.save).toHaveBeenCalledTimes(1);
      expect(result.customerId).toBe(UUID_CUSTOMER);
      expect(result.currency).toBe('BDT');
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(200);
    });

    it('uses default currency BDT when not provided', async () => {
      const dto = {
        customerId: UUID_CUSTOMER,
        items: [{ productId: '33333333-3333-4333-8333-333333333333', quantity: 1, unitPrice: 50 }],
        shippingAddress: { fullName: 'J', phone: '0', line1: 'x', city: 'y', country: 'BD' },
      };
      const result = await service.create(dto as never);
      expect(result.currency).toBe('BDT');
    });
  });

  describe('update()', () => {
    it('updates notes when provided', async () => {
      repo.findById.mockResolvedValue(makeOrder());
      const result = await service.update({
        orderId: UUID_ORDER,
        notes: 'updated',
      } as never);
      expect(repo.save).toHaveBeenCalled();
      expect(result.id).toBe(UUID_ORDER);
    });

    it('throws OrderNotFound when order missing', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.update({ orderId: 'missing' } as never)).rejects.toThrow(
        OrderNotFoundApplicationError,
      );
    });
  });

  describe('delete()', () => {
    it('calls softDelete', async () => {
      repo.findById.mockResolvedValue(makeOrder());
      await service.delete(UUID_ORDER, 'admin');
      expect(repo.softDelete).toHaveBeenCalledWith(UUID_ORDER, 'admin');
    });

    it('throws when order missing', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.delete('missing')).rejects.toThrow(
        OrderNotFoundApplicationError,
      );
    });
  });

  describe('confirm()', () => {
    it('confirms pending order', async () => {
      repo.findById.mockResolvedValue(makeOrder());
      const result = await service.confirm({ orderId: UUID_ORDER, paymentId: '55555555-5555-4555-8555-555555555555' } as never);
      expect(result.id).toBe(UUID_ORDER);
      expect(repo.save).toHaveBeenCalled();
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.confirm({ orderId: 'x' } as never)).rejects.toThrow(
        OrderNotFoundApplicationError,
      );
    });
  });

  describe('hold() / release()', () => {
    it('hold() puts on hold', async () => {
      repo.findById.mockResolvedValue(makeOrder());
      const result = await service.hold({ orderId: UUID_ORDER, reason: 'waiting' } as never);
      expect(result.id).toBe(UUID_ORDER);
    });

    it('release() fails when not on hold', async () => {
      repo.findById.mockResolvedValue(makeOrder());
      await expect(
        service.release({ orderId: UUID_ORDER } as never),
      ).rejects.toThrow();
    });
  });

  describe('ship() / deliver() / complete()', () => {
    it('ship() from packed order', async () => {
      const order = makeOrder();
      order.confirm(undefined, NOW_STR());
      order.startProcessing(NOW_STR());
      order.pack(NOW_STR());
      repo.findById.mockResolvedValue(order);
      const result = await service.ship(UUID_ORDER, 'TRK-AAAA1111', 'c1');
      expect(result.id).toBe(UUID_ORDER);
    });

    it('deliver() from shipped', async () => {
      const order = makeOrder();
      order.confirm(undefined, NOW_STR());
      order.startProcessing(NOW_STR());
      order.pack(NOW_STR());
      order.ship(undefined, undefined, NOW_STR());
      order.markOutForDelivery(NOW_STR());
      repo.findById.mockResolvedValue(order);
      const result = await service.deliver(UUID_ORDER, 'John');
      expect(result.id).toBe(UUID_ORDER);
    });

    it('complete() from delivered', async () => {
      const order = makeOrder();
      order.confirm(undefined, NOW_STR());
      order.startProcessing(NOW_STR());
      order.pack(NOW_STR());
      order.ship(undefined, undefined, NOW_STR());
      order.markOutForDelivery(NOW_STR());
      order.deliver(undefined, NOW_STR());
      repo.findById.mockResolvedValue(order);
      const result = await service.complete(UUID_ORDER);
      expect(result.id).toBe(UUID_ORDER);
    });
  });

  describe('getById()', () => {
    it('returns mapped DTO', async () => {
      repo.findById.mockResolvedValue(makeOrder());
      const result = await service.getById(UUID_ORDER);
      expect(result.id).toBe(UUID_ORDER);
      expect(result.orderNumber).toBe('ORD-2026-000001');
      expect(result.items).toHaveLength(1);
    });

    it('throws when missing', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.getById('x')).rejects.toThrow(OrderNotFoundApplicationError);
    });
  });

  describe('getByNumber()', () => {
    it('returns order via findByNumber', async () => {
      repo.findByNumber.mockResolvedValue(makeOrder());
      const result = await service.getByNumber('ORD-2026-000001');
      expect(result.orderNumber).toBe('ORD-2026-000001');
    });

    it('throws when not found', async () => {
      repo.findByNumber.mockResolvedValue(null);
      await expect(service.getByNumber('ORD-2026-999999')).rejects.toThrow(
        OrderNotFoundApplicationError,
      );
    });
  });

  describe('getPublic()', () => {
    it('returns public DTO without sensitive fields', async () => {
      repo.findById.mockResolvedValue(makeOrder());
      const result = await service.getPublic(UUID_ORDER);
      expect(result.id).toBe(UUID_ORDER);
      expect((result as Record<string, unknown>).customerId).toBeUndefined();
      expect((result as Record<string, unknown>).paymentId).toBeUndefined();
    });
  });

  describe('getDetail()', () => {
    it('returns detail wrapper', async () => {
      repo.findById.mockResolvedValue(makeOrder());
      const result = await service.getDetail(UUID_ORDER);
      expect(result.order.id).toBe(UUID_ORDER);
      expect(result.items).toBeDefined();
      expect(result.statusHistory).toEqual([]);
    });
  });

  describe('list() / listByCustomer() / listByVendor()', () => {
    it('list() uses paginated', async () => {
      repo.findPaginated.mockResolvedValue({
        items: [makeOrder()], total: 1, page: 1, limit: 20, totalPages: 1,
      });
      const result = await service.list({ page: 1, limit: 20 });
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('listByCustomer() adds filter', async () => {
      repo.findPaginated.mockResolvedValue({
        items: [], total: 0, page: 1, limit: 20, totalPages: 0,
      });
      await service.listByCustomer(UUID_CUSTOMER, { page: 1, limit: 20 });
      expect(repo.findPaginated).toHaveBeenCalledWith(
        expect.objectContaining({ filter: expect.objectContaining({ customerId: UUID_CUSTOMER }) }),
      );
    });
  });

  describe('getStats()', () => {
    it('delegates to repo', async () => {
      repo.getStats.mockResolvedValue({
        totalOrders: 5, totalRevenue: 1000, averageOrderValue: 200,
        currency: 'BDT', byStatus: { pending: 5 },
      });
      const stats = await service.getStats();
      expect(stats.totalOrders).toBe(5);
    });
  });
});

function NOW_STR(): string {
  return new Date().toISOString();
}
