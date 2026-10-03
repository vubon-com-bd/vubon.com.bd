/**
 * OrderItemEntity tests
 */
import { OrderItemEntity } from '../../../../src/module/domain/entities/order-item.entity.js';
import { OrderItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../../../../src/module/domain/value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/order-item-status.vo.js';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';

const NOW = '2026-01-01T10:00:00Z';
const UUID_ITEM = '44444444-4444-4444-8444-444444444444';
const UUID_PRODUCT = '33333333-3333-4333-8333-333333333333';

function makeItem(qty = 2, price = 100, discount = 0): OrderItemEntity {
  return OrderItemEntity.create({
    id: UUID_ITEM,
    now: NOW,
    props: {
      productId: ProductIdVO.create(UUID_PRODUCT),
      sku: 'SKU-001',
      name: 'Test',
      type: 'product',
      status: OrderItemStatusVO.pending(),
      quantity: OrderItemQuantityVO.create(qty),
      price: OrderItemPriceVO.create(price, 'BDT'),
      discountAmount: discount,
      taxAmount: 0,
      shippingAmount: 0,
    },
  });
}

describe('OrderItemEntity', () => {
  it('create()', () => {
    const item = makeItem();
    expect(item.id).toBe(UUID_ITEM);
    expect(item.lineSubtotal).toBe(200);
    expect(item.lineTotal).toBe(200);
  });

  it('lineTotal = subtotal - discount + tax + shipping', () => {
    const item = makeItem(2, 100, 20);
    expect(item.lineSubtotal).toBe(200);
    expect(item.lineTotal).toBe(180);
  });

  it('changeQuantity()', () => {
    const item = makeItem();
    item.changeQuantity(OrderItemQuantityVO.create(5), NOW);
    expect(item.quantity.value).toBe(5);
    expect(item.lineSubtotal).toBe(500);
  });

  it('changeQuantity() throws for final status', () => {
    const item = makeItem();
    item.changeStatus(OrderItemStatusVO.confirmed(), undefined, NOW);
    item.changeStatus(OrderItemStatusVO.packed(), undefined, NOW);
    item.changeStatus(OrderItemStatusVO.shipped(), undefined, NOW);
    item.changeStatus(OrderItemStatusVO.delivered(), undefined, NOW);
    expect(() => item.changeQuantity(OrderItemQuantityVO.create(5), NOW)).toThrow();
  });

  it('applyDiscount()', () => {
    const item = makeItem(2, 100);
    item.applyDiscount(50, NOW);
    expect(item.discountAmount).toBe(50);
    expect(item.lineTotal).toBe(150);
  });

  it('applyDiscount() throws when > subtotal', () => {
    const item = makeItem(2, 100);
    expect(() => item.applyDiscount(500, NOW)).toThrow();
  });

  it('changeStatus() emits event', () => {
    const item = makeItem();
    const evt = item.changeStatus(OrderItemStatusVO.confirmed(), 'actor-1', NOW);
    expect(evt).not.toBeNull();
    expect(item.status.isConfirmed()).toBe(true);
  });

  it('changeStatus() throws invalid transition', () => {
    const item = makeItem();
    expect(() => item.changeStatus(OrderItemStatusVO.delivered(), undefined, NOW)).toThrow();
  });

  it('predicates', () => {
    const item = makeItem();
    expect(item.isPending()).toBe(true);
    expect(item.isCancelled()).toBe(false);
    expect(item.canBeCancelled()).toBe(true);
  });

  it('canBeReturned() only when delivered/shipped', () => {
    const item = makeItem();
    expect(item.canBeReturned()).toBe(false);
    item.changeStatus(OrderItemStatusVO.confirmed(), undefined, NOW);
    item.changeStatus(OrderItemStatusVO.packed(), undefined, NOW);
    item.changeStatus(OrderItemStatusVO.shipped(), undefined, NOW);
    expect(item.canBeReturned()).toBe(true);
  });

  it('hasDiscount()', () => {
    expect(makeItem().hasDiscount()).toBe(false);
    expect(makeItem(2, 100, 10).hasDiscount()).toBe(true);
  });
});
