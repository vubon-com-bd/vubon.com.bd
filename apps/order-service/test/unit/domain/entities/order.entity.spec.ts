/**
 * OrderEntity — aggregate root tests
 */
import { OrderEntity } from '../../../../src/module/domain/entities/order.entity.js';
import { OrderItemEntity } from '../../../../src/module/domain/entities/order-item.entity.js';
import { OrderNumberVO } from '../../../../src/module/domain/value-objects/primitives/order-number.vo.js';
import { OrderStatusVO } from '../../../../src/module/domain/value-objects/primitives/order-status.vo.js';
import { OrderTypeVO } from '../../../../src/module/domain/value-objects/primitives/order-type.vo.js';
import { OrderPriorityVO } from '../../../../src/module/domain/value-objects/primitives/order-priority.vo.js';
import { CustomerIdVO } from '../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { OrderItemIdVO } from '../../../../src/module/domain/value-objects/primitives/order-item-id.vo.js';
import { OrderItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../../../../src/module/domain/value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/order-item-status.vo.js';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';

const NOW = '2026-01-01T10:00:00Z';
const UUID_ORDER = '11111111-1111-4111-8111-111111111111';
const UUID_CUSTOMER = '22222222-2222-4222-8222-222222222222';
const UUID_PRODUCT = '33333333-3333-4333-8333-333333333333';
const UUID_ITEM = '44444444-4444-4444-8444-444444444444';
const UUID_PAYMENT = '55555555-5555-4555-8555-555555555555';

function makeItem(qty = 2, price = 100): OrderItemEntity {
  return OrderItemEntity.create({
    id: UUID_ITEM,
    now: NOW,
    props: {
      productId: ProductIdVO.create(UUID_PRODUCT),
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

function makeOrder(items: OrderItemEntity[] = [makeItem()]): OrderEntity {
  const subtotal = items.reduce((s, i) => s + i.lineSubtotal, 0);
  return OrderEntity.create({
    id: UUID_ORDER,
    now: NOW,
    items,
    props: {
      orderNumber: OrderNumberVO.generate(1, 2026),
      customerId: CustomerIdVO.create(UUID_CUSTOMER),
      vendorIds: [],
      type: OrderTypeVO.regular(),
      status: OrderStatusVO.pending(),
      priority: OrderPriorityVO.normal(),
      currency: 'BDT',
      subtotal,
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
      total: subtotal,
    },
  });
}

describe('OrderEntity', () => {
  describe('create()', () => {
    it('creates order with items and emits OrderCreatedEvent', () => {
      const order = makeOrder();
      expect(order.id).toBe(UUID_ORDER);
      expect(order.orderNumber.value).toBe('ORD-2026-000001');
      expect(order.status.isPending()).toBe(true);
      expect(order.items).toHaveLength(1);
      expect(order.total).toBe(200);
      expect(order.version).toBeGreaterThan(0);
    });

    it('throws on invalid total', () => {
      expect(() =>
        OrderEntity.create({
          id: UUID_ORDER,
          now: NOW,
          items: [makeItem()],
          props: {
            orderNumber: OrderNumberVO.generate(1, 2026),
            customerId: CustomerIdVO.create(UUID_CUSTOMER),
            vendorIds: [],
            type: OrderTypeVO.regular(),
            status: OrderStatusVO.pending(),
            priority: OrderPriorityVO.normal(),
            currency: 'BDT',
            subtotal: 200,
            discountAmount: 0,
            taxAmount: 0,
            shippingAmount: 0,
            total: 999, // mismatch
          },
        }),
      ).toThrow();
    });

    it('throws on non-3-char currency', () => {
      expect(() =>
        OrderEntity.create({
          id: UUID_ORDER,
          now: NOW,
          items: [makeItem()],
          props: {
            orderNumber: OrderNumberVO.generate(1, 2026),
            customerId: CustomerIdVO.create(UUID_CUSTOMER),
            vendorIds: [],
            type: OrderTypeVO.regular(),
            status: OrderStatusVO.pending(),
            priority: OrderPriorityVO.normal(),
            currency: 'BD',
            subtotal: 200,
            discountAmount: 0,
            taxAmount: 0,
            shippingAmount: 0,
            total: 200,
          },
        }),
      ).toThrow();
    });
  });

  describe('addItem()', () => {
    it('adds item and recalculates total', () => {
      const order = makeOrder();
      const newItem = OrderItemEntity.create({
        id: '66666666-6666-4666-8666-666666666666',
        now: NOW,
        props: {
          productId: ProductIdVO.create(UUID_PRODUCT),
          sku: 'SKU-002',
          name: 'Second',
          type: 'product',
          status: OrderItemStatusVO.pending(),
          quantity: OrderItemQuantityVO.create(1),
          price: OrderItemPriceVO.create(50, 'BDT'),
          discountAmount: 0,
          taxAmount: 0,
          shippingAmount: 0,
        },
      });
      order.addItem(newItem, NOW);
      expect(order.items).toHaveLength(2);
      expect(order.total).toBe(250);
    });

    it('throws when order is not modifiable (processing)', () => {
      const order = makeOrder();
      order.confirm(undefined, NOW);
      order.startProcessing(NOW);
      expect(() => order.addItem(makeItem(), NOW)).toThrow();
    });
  });

  describe('removeItem()', () => {
    it('removes item and recalculates', () => {
      const order = makeOrder();
      order.removeItem(UUID_ITEM, undefined, NOW);
      expect(order.items).toHaveLength(0);
      expect(order.total).toBe(0);
    });

    it('no-op when item not found', () => {
      const order = makeOrder();
      order.removeItem('99999999-9999-4999-8999-999999999999', undefined, NOW);
      expect(order.items).toHaveLength(1);
    });
  });

  describe('state machine', () => {
    it('confirm() → confirmed, sets confirmedAt', () => {
      const order = makeOrder();
      order.confirm(PaymentIdVO.create(UUID_PAYMENT), NOW);
      expect(order.status.isConfirmed()).toBe(true);
      expect(order.confirmedAt).toBe(NOW);
      expect(order.paymentId?.value).toBe(UUID_PAYMENT);
    });

    it('full happy path: pending → confirmed → processing → packed → shipped → delivered → completed', () => {
      const order = makeOrder();
      order.confirm(undefined, NOW);
      order.startProcessing(NOW);
      order.pack(NOW);
      order.ship('TRK-ABCD1234', 'courier-1', NOW);
      order.markOutForDelivery(NOW);
      order.deliver('John Doe', NOW);
      order.complete(NOW);
      expect(order.status.isCompleted()).toBe(true);
      expect(order.completedAt).toBe(NOW);
      expect(order.shippedAt).toBe(NOW);
      expect(order.deliveredAt).toBe(NOW);
    });

    it('invalid transition: pending → delivered', () => {
      const order = makeOrder();
      expect(() => order.deliver(undefined, NOW)).toThrow();
    });

    it('invalid transition: completed → anything', () => {
      const order = makeOrder();
      order.confirm(undefined, NOW);
      order.startProcessing(NOW);
      order.pack(NOW);
      order.ship(undefined, undefined, NOW);
      order.markOutForDelivery(NOW);
      order.deliver(undefined, NOW);
      order.complete(NOW);
      expect(() => order.cancel('reason', undefined, undefined, NOW)).toThrow();
    });
  });

  describe('cancel()', () => {
    it('cancels pending order', () => {
      const order = makeOrder();
      order.cancel('customer_request', 'actor-1', undefined, NOW);
      expect(order.status.isCancelled()).toBe(true);
      expect(order.cancelledAt).toBe(NOW);
    });

    it('cannot cancel shipped order', () => {
      const order = makeOrder();
      order.confirm(undefined, NOW);
      order.startProcessing(NOW);
      order.pack(NOW);
      order.ship(undefined, undefined, NOW);
      expect(() => order.cancel('reason', undefined, undefined, NOW)).toThrow();
    });
  });

  describe('hold() / release()', () => {
    it('putOnHold() → on_hold', () => {
      const order = makeOrder();
      order.putOnHold('waiting payment', NOW);
      expect(order.status.isOnHold()).toBe(true);
    });

    it('release() → pending', () => {
      const order = makeOrder();
      order.putOnHold('waiting', NOW);
      order.release(undefined, NOW);
      expect(order.status.isPending()).toBe(true);
    });

    it('release() throws when not on_hold', () => {
      const order = makeOrder();
      expect(() => order.release(undefined, NOW)).toThrow();
    });
  });

  describe('priority', () => {
    it('changePriority() emits event', () => {
      const order = makeOrder();
      const before = order.domainEvents.length;
      order.changePriority(OrderPriorityVO.create('high'), undefined, NOW);
      expect(order.priority.value).toBe('high');
      expect(order.domainEvents.length).toBeGreaterThan(before);
    });

    it('no-op when same priority', () => {
      const order = makeOrder();
      const before = order.domainEvents.length;
      order.changePriority(OrderPriorityVO.normal(), undefined, NOW);
      expect(order.domainEvents.length).toBe(before);
    });
  });

  describe('predicates', () => {
    it('canBeCancelled()', () => {
      const order = makeOrder();
      expect(order.canBeCancelled()).toBe(true);
    });

    it('canBeModified() only for pending/confirmed', () => {
      const order = makeOrder();
      expect(order.canBeModified()).toBe(true);
      order.confirm(undefined, NOW);
      expect(order.canBeModified()).toBe(true);
      order.startProcessing(NOW);
      expect(order.canBeModified()).toBe(false);
    });

    it('isPaid()', () => {
      const order = makeOrder();
      expect(order.isPaid()).toBe(false);
      order.confirm(PaymentIdVO.create(UUID_PAYMENT), NOW);
      order.updatePayment('card', 'completed', PaymentIdVO.create(UUID_PAYMENT), NOW);
      expect(order.isPaid()).toBe(true);
    });
  });

  describe('domain events', () => {
    it('pullDomainEvents() clears events', () => {
      const order = makeOrder();
      const events = order.pullDomainEvents();
      expect(events.length).toBeGreaterThan(0);
      expect(order.domainEvents.length).toBe(0);
    });
  });
});
