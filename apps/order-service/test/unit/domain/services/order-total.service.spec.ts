import { OrderTotalService } from '../../../../src/module/domain/services/order-total.service.js';
import { OrderItemEntity } from '../../../../src/module/domain/entities/order-item.entity.js';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { OrderItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../../../../src/module/domain/value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/order-item-status.vo.js';

const NOW = '2026-01-01T10:00:00Z';
const UUID_PRODUCT = '33333333-3333-4333-8333-333333333333';

function makeItem(id: string, qty: number, price: number, discount = 0, tax = 0, shipping = 0): OrderItemEntity {
  return OrderItemEntity.create({
    id,
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
      taxAmount: tax,
      shippingAmount: shipping,
    },
  });
}

describe('OrderTotalService', () => {
  describe('calculate()', () => {
    it('basic: 1 item × 100 × 2 = subtotal 200, total 200', () => {
      const item = makeItem('11111111-1111-4111-8111-111111111111', 2, 100);
      const totals = OrderTotalService.calculate({ items: [item], currency: 'BDT' });
      expect(totals.subtotal.amount).toBe(200);
      expect(totals.discount.amount).toBe(0);
      expect(totals.tax.amount).toBe(0);
      expect(totals.shipping.amount).toBe(0);
      expect(totals.total.amount).toBe(200);
      expect(totals.itemCount).toBe(2);
    });

    it('sums multiple items', () => {
      const a = makeItem('11111111-1111-4111-8111-111111111111', 2, 100);
      const b = makeItem('22222222-2222-4222-8222-222222222222', 1, 50);
      const totals = OrderTotalService.calculate({ items: [a, b], currency: 'BDT' });
      expect(totals.subtotal.amount).toBe(250);
      expect(totals.itemCount).toBe(3);
    });

    it('applies item discounts', () => {
      const item = makeItem('11111111-1111-4111-8111-111111111111', 2, 100, 30);
      const totals = OrderTotalService.calculate({ items: [item], currency: 'BDT' });
      expect(totals.subtotal.amount).toBe(200);
      expect(totals.discount.amount).toBe(30);
      expect(totals.total.amount).toBe(170);
    });

    it('applies tax', () => {
      const item = makeItem('11111111-1111-4111-8111-111111111111', 2, 100);
      const totals = OrderTotalService.calculate({ items: [item], currency: 'BDT', taxRate: 0.15 });
      expect(totals.subtotal.amount).toBe(200);
      expect(totals.tax.amount).toBe(30);
      expect(totals.total.amount).toBe(230);
    });

    it('applies shipping cost', () => {
      const item = makeItem('11111111-1111-4111-8111-111111111111', 1, 100);
      const totals = OrderTotalService.calculate({ items: [item], currency: 'BDT', shippingCost: 50 });
      expect(totals.total.amount).toBe(150);
    });

    it('applies order-level discount', () => {
      const item = makeItem('11111111-1111-4111-8111-111111111111', 2, 100);
      const totals = OrderTotalService.calculate({
        items: [item],
        currency: 'BDT',
        orderLevelDiscount: 25,
      });
      expect(totals.discount.amount).toBe(25);
      expect(totals.total.amount).toBe(175);
    });

    it('caps discount at subtotal', () => {
      const item = makeItem('11111111-1111-4111-8111-111111111111', 1, 100);
      const totals = OrderTotalService.calculate({
        items: [item],
        currency: 'BDT',
        orderLevelDiscount: 500,
      });
      expect(totals.discount.amount).toBe(100);
      expect(totals.total.amount).toBe(0);
    });

    it('combines item discount + order discount + tax + shipping', () => {
      const item = makeItem('11111111-1111-4111-8111-111111111111', 2, 100, 10, 0, 0);
      const totals = OrderTotalService.calculate({
        items: [item],
        currency: 'BDT',
        orderLevelDiscount: 5,
        taxRate: 0.1,
        shippingCost: 20,
      });
      // subtotal=200, discount=15, taxable=185, tax=18.5, shipping=20, total=223.5
      expect(totals.subtotal.amount).toBe(200);
      expect(totals.discount.amount).toBe(15);
      expect(totals.tax.amount).toBe(18.5);
      expect(totals.shipping.amount).toBe(20);
      expect(totals.total.amount).toBe(223.5);
    });
  });

  describe('calculateTax()', () => {
    it('15% of 100 = 15', () => {
      expect(OrderTotalService.calculateTax(100, 0.15)).toBe(15);
    });
    it('negative amount → 0', () => {
      expect(OrderTotalService.calculateTax(-10, 0.15)).toBe(0);
    });
    it('invalid rate → 0', () => {
      expect(OrderTotalService.calculateTax(100, -0.5)).toBe(0);
      expect(OrderTotalService.calculateTax(100, 2)).toBe(0);
    });
  });

  describe('calculatePercentageDiscount()', () => {
    it('10% of 200 = 20', () => {
      expect(OrderTotalService.calculatePercentageDiscount(200, 0.1)).toBe(20);
    });
    it('invalid → 0', () => {
      expect(OrderTotalService.calculatePercentageDiscount(-1, 0.1)).toBe(0);
      expect(OrderTotalService.calculatePercentageDiscount(100, 2)).toBe(0);
    });
  });

  describe('calculateLineSubtotal()', () => {
    it('100 × 3 = 300', () => {
      expect(OrderTotalService.calculateLineSubtotal(100, 3)).toBe(300);
    });
    it('negative → 0', () => {
      expect(OrderTotalService.calculateLineSubtotal(-5, 3)).toBe(0);
    });
  });

  describe('sumLineSubtotals() / sumLineTotals()', () => {
    it('sumLineSubtotals()', () => {
      const items = [
        makeItem('11111111-1111-4111-8111-111111111111', 2, 100),
        makeItem('22222222-2222-4222-8222-222222222222', 1, 50),
      ];
      expect(OrderTotalService.sumLineSubtotals(items)).toBe(250);
    });

    it('sumLineTotals()', () => {
      const items = [
        makeItem('11111111-1111-4111-8111-111111111111', 2, 100, 20),
        makeItem('22222222-2222-4222-8222-222222222222', 1, 50),
      ];
      expect(OrderTotalService.sumLineTotals(items)).toBe(230);
    });
  });
});
