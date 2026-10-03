/**
 * Shared test fixtures & mock factories for application services
 */
import { jest } from '@jest/globals';
import { OrderEntity } from '../../../../src/module/domain/entities/order.entity.js';
import { OrderItemEntity } from '../../../../src/module/domain/entities/order-item.entity.js';
import { OrderNumberVO } from '../../../../src/module/domain/value-objects/primitives/order-number.vo.js';
import { OrderStatusVO } from '../../../../src/module/domain/value-objects/primitives/order-status.vo.js';
import { OrderTypeVO } from '../../../../src/module/domain/value-objects/primitives/order-type.vo.js';
import { OrderPriorityVO } from '../../../../src/module/domain/value-objects/primitives/order-priority.vo.js';
import { CustomerIdVO } from '../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { VendorIdVO } from '../../../../src/module/domain/value-objects/primitives/vendor-id.vo.js';
import { OrderItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../../../../src/module/domain/value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/order-item-status.vo.js';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';

export const NOW = '2026-01-01T10:00:00Z';
export const UUID_ORDER = '11111111-1111-4111-8111-111111111111';
export const UUID_CUSTOMER = '22222222-2222-4222-8222-222222222222';
export const UUID_PRODUCT = '33333333-3333-4333-8333-333333333333';
export const UUID_ITEM = '44444444-4444-4444-8444-444444444444';
export const UUID_PAYMENT = '55555555-5555-4555-8555-555555555555';
export const UUID_VENDOR = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

export function makeItem(qty = 1, price = 100, vendorId?: string): OrderItemEntity {
  return OrderItemEntity.create({
    id: UUID_ITEM,
    now: NOW,
    props: {
      productId: ProductIdVO.create(UUID_PRODUCT),
      vendorId: vendorId ? VendorIdVO.create(vendorId) : undefined,
      sku: 'SKU-001',
      name: 'Test Product',
      type: 'product',
      status: OrderItemStatusVO.pending(),
      quantity: OrderItemQuantityVO.create(qty),
      price: OrderItemPriceVO.create(price, 'BDT'),
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
    },
  });
}

export function makeOrder(paid = false, vendorId?: string): OrderEntity {
  const item = makeItem(1, 100, vendorId);
  const order = OrderEntity.create({
    id: UUID_ORDER,
    now: NOW,
    items: [item],
    props: {
      orderNumber: OrderNumberVO.generate(1, 2026),
      customerId: CustomerIdVO.create(UUID_CUSTOMER),
      vendorIds: vendorId ? [VendorIdVO.create(vendorId)] : [],
      type: OrderTypeVO.regular(),
      status: OrderStatusVO.pending(),
      priority: OrderPriorityVO.normal(),
      currency: 'BDT',
      subtotal: 100,
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
      total: 100,
    },
  });
  if (paid) {
    order.confirm(PaymentIdVO.create(UUID_PAYMENT), NOW);
    order.updatePayment('card', 'completed', PaymentIdVO.create(UUID_PAYMENT), NOW);
  }
  return order;
}

export function makeMockOrderRepo(overrides: Record<string, unknown> = {}) {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findByNumber: jest.fn().mockResolvedValue(null),
    findByCustomerId: jest.fn().mockResolvedValue([]),
    findByVendorId: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByCustomerAndStatus: jest.fn().mockResolvedValue([]),
    findAll: jest.fn().mockResolvedValue([]),
    existsByNumber: jest.fn().mockResolvedValue(false),
    exists: jest.fn().mockResolvedValue(false),
    findPaginated: jest.fn().mockResolvedValue({
      items: [], total: 0, page: 1, limit: 20, totalPages: 0,
    }),
    countByCustomer: jest.fn().mockResolvedValue(0),
    findPendingOlderThan: jest.fn().mockResolvedValue([]),
    getStats: jest.fn().mockResolvedValue({
      totalOrders: 0, totalRevenue: 0, averageOrderValue: 0,
      currency: 'BDT', byStatus: {},
    }),
    save: jest.fn().mockImplementation(async (order: OrderEntity) => order),
    delete: jest.fn().mockResolvedValue(undefined),
    softDelete: jest.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

export function makeMockItemRepo(overrides: Record<string, unknown> = {}) {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findByOrderId: jest.fn().mockResolvedValue([]),
    findByProductId: jest.fn().mockResolvedValue([]),
    findByVendorId: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByOrderAndProduct: jest.fn().mockResolvedValue(null),
    findAll: jest.fn().mockResolvedValue([]),
    countByOrder: jest.fn().mockResolvedValue(0),
    exists: jest.fn().mockResolvedValue(false),
    save: jest.fn().mockImplementation(async (item: unknown) => item),
    delete: jest.fn().mockResolvedValue(undefined),
    deleteByOrder: jest.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}
