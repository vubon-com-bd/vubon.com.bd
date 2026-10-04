import { OrderSnapshotService } from '../../../../src/module/domain/services/order-snapshot.service.js';
import { OrderEntity } from '../../../../src/module/domain/entities/order.entity.js';
import { OrderItemEntity } from '../../../../src/module/domain/entities/order-item.entity.js';
import { OrderNumberVO } from '../../../../src/module/domain/value-objects/primitives/order-number.vo.js';
import { OrderStatusVO } from '../../../../src/module/domain/value-objects/primitives/order-status.vo.js';
import { OrderTypeVO } from '../../../../src/module/domain/value-objects/primitives/order-type.vo.js';
import { OrderPriorityVO } from '../../../../src/module/domain/value-objects/primitives/order-priority.vo.js';
import { CustomerIdVO } from '../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { OrderItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../../../../src/module/domain/value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/order-item-status.vo.js';

const NOW = '2026-01-01T10:00:00Z';
const UUID_PRODUCT = '33333333-3333-4333-8333-333333333333';

function makeOrder(): OrderEntity {
  const item = OrderItemEntity.create({
    id: '44444444-4444-4444-8444-444444444444',
    now: NOW,
    props: {
      productId: ProductIdVO.create(UUID_PRODUCT),
      sku: 'SKU-001',
      name: 'Test',
      type: 'product',
      status: OrderItemStatusVO.pending(),
      quantity: OrderItemQuantityVO.create(1),
      price: OrderItemPriceVO.create(100, 'BDT'),
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
    },
  });
  return OrderEntity.create({
    id: '11111111-1111-4111-8111-111111111111',
    now: NOW,
    items: [item],
    props: {
      orderNumber: OrderNumberVO.generate(1, 2026),
      customerId: CustomerIdVO.create('22222222-2222-4222-8222-222222222222'),
      vendorIds: [],
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
}

describe('OrderSnapshotService', () => {
  describe('create()', () => {
    it('creates snapshot with version, reason, takenAt', () => {
      const order = makeOrder();
      const snap = OrderSnapshotService.create(order, {
        reason: 'after_create',
        takenBy: 'system',
      });
      expect(snap.version).toBe(order.version);
      expect(snap.reason).toBe('after_create');
      expect(snap.takenBy).toBe('system');
      expect(snap.takenAt).toBeTruthy();
    });

    it('snapshot captures current state', () => {
      const order = makeOrder();
      const snap = OrderSnapshotService.create(order, { reason: 'test' });
      expect(snap.orderId).toBe(order.id);
      expect(snap.status).toBe(order.status.value);
      expect(snap.total).toBe(order.total);
      expect(snap.itemCount).toBe(order.itemCount);
    });

    it('throws on empty reason', () => {
      const order = makeOrder();
      expect(() =>
        OrderSnapshotService.create(order, { reason: '' }),
      ).toThrow();
    });
  });

  describe('diff()', () => {
    it('returns [] for identical snapshots', () => {
      const order = makeOrder();
      const a = OrderSnapshotService.create(order, { reason: 'r1' });
      const b = OrderSnapshotService.create(order, { reason: 'r2' });
      expect(OrderSnapshotService.diff(a, b)).toEqual([]);
    });

    it('detects status change', () => {
      const order = makeOrder();
      const before = OrderSnapshotService.create(order, { reason: 'before' });
      order.confirm(undefined, NOW);
      const after = OrderSnapshotService.create(order, { reason: 'after' });
      const changes = OrderSnapshotService.diff(before, after);
      expect(changes).toContain('status');
    });
  });

  describe('isIdentical()', () => {
    it('true for same state', () => {
      const order = makeOrder();
      const a = OrderSnapshotService.create(order, { reason: 'r1' });
      const b = OrderSnapshotService.create(order, { reason: 'r2' });
      expect(OrderSnapshotService.isIdentical(a, b)).toBe(true);
    });

    it('false after status change', () => {
      const order = makeOrder();
      const before = OrderSnapshotService.create(order, { reason: 'before' });
      order.confirm(undefined, NOW);
      const after = OrderSnapshotService.create(order, { reason: 'after' });
      expect(OrderSnapshotService.isIdentical(before, after)).toBe(false);
    });
  });
});
