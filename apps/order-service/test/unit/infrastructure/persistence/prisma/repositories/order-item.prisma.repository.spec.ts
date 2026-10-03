import { jest } from '@jest/globals';
import { OrderItemPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/order-item.prisma.repository.js';
import { OrderItemIdVO } from '../../../../../../src/module/domain/value-objects/primitives/order-item-id.vo.js';
import { OrderIdVO } from '../../../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { OrderItemStatusVO } from '../../../../../../src/module/domain/value-objects/primitives/order-item-status.vo.js';
import { ProductIdVO } from '../../../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { VendorIdVO } from '../../../../../../src/module/domain/value-objects/primitives/vendor-id.vo.js';
import { mockPrisma, UUID_ORDER, UUID_ITEM, UUID_PRODUCT, UUID_VENDOR, NOW_DATE } from './_prisma-mock.js';

function itemRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID_ITEM, orderId: UUID_ORDER, productId: UUID_PRODUCT,
    variantId: null, vendorId: UUID_VENDOR, sku: 'SKU-1', name: 'Test',
    imageUrl: null, type: 'product', status: 'pending',
    quantity: 2, unitPrice: 100, compareAtPrice: null,
    subtotal: 200, discountAmount: 0, taxAmount: 0, shippingAmount: 0,
    total: 200, currency: 'BDT', attributes: null, notes: null,
    createdAt: NOW_DATE, updatedAt: NOW_DATE, deletedAt: null,
    ...overrides,
  };
}

describe('OrderItemPrismaRepository', () => {
  let prisma: ReturnType<typeof mockPrisma>;
  let repo: OrderItemPrismaRepository;

  beforeEach(() => {
    prisma = mockPrisma();
    repo = new OrderItemPrismaRepository(prisma as never);
  });

  it('findById returns entity', async () => {
    (prisma.orderItem.findUnique as jest.Mock).mockResolvedValue(itemRow());
    expect((await repo.findById(UUID_ITEM))?.id).toBe(UUID_ITEM);
  });
  it('findById returns null on miss', async () => {
    (prisma.orderItem.findUnique as jest.Mock).mockResolvedValue(null);
    expect(await repo.findById(UUID_ITEM)).toBeNull();
  });
  it('findById handles error', async () => {
    (prisma.orderItem.findUnique as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findById(UUID_ITEM)).toBeNull();
  });
  it('findByIdVO delegates', async () => {
    (prisma.orderItem.findUnique as jest.Mock).mockResolvedValue(itemRow());
    await repo.findByIdVO(OrderItemIdVO.create(UUID_ITEM));
    expect(prisma.orderItem.findUnique).toHaveBeenCalled();
  });
  it('findByOrderId', async () => {
    (prisma.orderItem.findMany as jest.Mock).mockResolvedValue([itemRow()]);
    expect(await repo.findByOrderId(OrderIdVO.create(UUID_ORDER))).toHaveLength(1);
  });
  it('findByOrderId error', async () => {
    (prisma.orderItem.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByOrderId(OrderIdVO.create(UUID_ORDER))).toEqual([]);
  });
  it('findByProductId', async () => {
    (prisma.orderItem.findMany as jest.Mock).mockResolvedValue([itemRow()]);
    expect(await repo.findByProductId(ProductIdVO.create(UUID_PRODUCT))).toHaveLength(1);
  });
  it('findByProductId error', async () => {
    (prisma.orderItem.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByProductId(ProductIdVO.create(UUID_PRODUCT))).toEqual([]);
  });
  it('findByVendorId', async () => {
    (prisma.orderItem.findMany as jest.Mock).mockResolvedValue([itemRow()]);
    expect(await repo.findByVendorId(VendorIdVO.create(UUID_VENDOR))).toHaveLength(1);
  });
  it('findByVendorId error', async () => {
    (prisma.orderItem.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByVendorId(VendorIdVO.create(UUID_VENDOR))).toEqual([]);
  });
  it('findByStatus', async () => {
    (prisma.orderItem.findMany as jest.Mock).mockResolvedValue([itemRow()]);
    expect(await repo.findByStatus(OrderItemStatusVO.pending())).toHaveLength(1);
  });
  it('findByStatus error', async () => {
    (prisma.orderItem.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByStatus(OrderItemStatusVO.pending())).toEqual([]);
  });
  it('findByOrderAndProduct', async () => {
    (prisma.orderItem.findMany as jest.Mock).mockResolvedValue([itemRow()]);
    const r = await repo.findByOrderAndProduct(OrderIdVO.create(UUID_ORDER), ProductIdVO.create(UUID_PRODUCT));
    expect(r?.id).toBe(UUID_ITEM);
  });
  it('findByOrderAndProduct empty', async () => {
    (prisma.orderItem.findMany as jest.Mock).mockResolvedValue([]);
    expect(await repo.findByOrderAndProduct(OrderIdVO.create(UUID_ORDER), ProductIdVO.create(UUID_PRODUCT))).toBeNull();
  });
  it('findByOrderAndProduct error', async () => {
    (prisma.orderItem.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findByOrderAndProduct(OrderIdVO.create(UUID_ORDER), ProductIdVO.create(UUID_PRODUCT))).toBeNull();
  });
  it('findAll', async () => {
    (prisma.orderItem.findMany as jest.Mock).mockResolvedValue([itemRow()]);
    expect(await repo.findAll()).toHaveLength(1);
  });
  it('findAll error', async () => {
    (prisma.orderItem.findMany as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.findAll()).toEqual([]);
  });
  it('countByOrder', async () => {
    (prisma.orderItem.count as jest.Mock).mockResolvedValue(5);
    expect(await repo.countByOrder(OrderIdVO.create(UUID_ORDER))).toBe(5);
  });
  it('countByOrder error', async () => {
    (prisma.orderItem.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.countByOrder(OrderIdVO.create(UUID_ORDER))).toBe(0);
  });
  it('exists true', async () => {
    (prisma.orderItem.count as jest.Mock).mockResolvedValue(1);
    expect(await repo.exists(UUID_ITEM)).toBe(true);
  });
  it('exists error', async () => {
    (prisma.orderItem.count as jest.Mock).mockRejectedValue(new Error());
    expect(await repo.exists(UUID_ITEM)).toBe(false);
  });
  it('save creates', async () => {
    (prisma.orderItem.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.orderItem.create as jest.Mock).mockResolvedValue(itemRow());
    const item = {
      id: UUID_ITEM, productId: { value: UUID_PRODUCT }, variantId: undefined,
      vendorId: { value: UUID_VENDOR }, sku: 'SKU-1', name: 'Test', imageUrl: undefined,
      type: 'product', status: { value: 'pending' }, quantity: { value: 2 },
      price: { amount: 100, currency: 'BDT', compareAt: undefined },
      discountAmount: 0, taxAmount: 0, shippingAmount: 0, notes: undefined,
      attributes: undefined, lineSubtotal: 200, lineTotal: 200, currency: 'BDT',
      updatedAt: new Date().toISOString(),
    };
    expect((await repo.save(item as never)).id).toBe(UUID_ITEM);
  });
  it('save updates existing', async () => {
    (prisma.orderItem.findUnique as jest.Mock).mockResolvedValue(itemRow());
    (prisma.orderItem.update as jest.Mock).mockResolvedValue(itemRow());
    const item = {
      id: UUID_ITEM, productId: { value: UUID_PRODUCT }, vendorId: { value: UUID_VENDOR },
      sku: 'SKU-1', name: 'Test', type: 'product', status: { value: 'pending' },
      quantity: { value: 2 }, price: { amount: 100, currency: 'BDT' },
      discountAmount: 0, taxAmount: 0, shippingAmount: 0,
      lineSubtotal: 200, lineTotal: 200, currency: 'BDT',
      updatedAt: new Date().toISOString(),
    };
    await repo.save(item as never);
    expect(prisma.orderItem.update).toHaveBeenCalled();
  });
  it('save throws on error', async () => {
    (prisma.orderItem.findUnique as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.save({ id: UUID_ITEM } as never)).rejects.toThrow();
  });
  it('delete calls update', async () => {
    (prisma.orderItem.update as jest.Mock).mockResolvedValue(itemRow());
    await repo.delete(UUID_ITEM);
    expect(prisma.orderItem.update).toHaveBeenCalled();
  });
  it('delete swallows error', async () => {
    (prisma.orderItem.update as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.delete(UUID_ITEM)).resolves.toBeUndefined();
  });
  it('deleteByOrder', async () => {
    (prisma.orderItem.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });
    await repo.deleteByOrder(OrderIdVO.create(UUID_ORDER));
    expect(prisma.orderItem.deleteMany).toHaveBeenCalled();
  });
  it('deleteByOrder swallows error', async () => {
    (prisma.orderItem.deleteMany as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.deleteByOrder(OrderIdVO.create(UUID_ORDER))).resolves.toBeUndefined();
  });
});
