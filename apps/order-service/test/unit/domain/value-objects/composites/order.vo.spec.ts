/**
 * OrderVO — Unit Tests
 * @module order-service/test/unit/domain/value-objects/composites
 */
import { describe, it, expect } from '@jest/globals';
import { OrderVO } from '@domain/composites/order.vo.js';
import { OrderStatusVO } from '@domain/primitives/order-status.vo.js';
import { OrderTotalVO } from '@domain/primitives/order-total.vo.js';
import { OrderDiscountVO } from '@domain/primitives/order-discount.vo.js';
import { OrderNoteVO } from '@domain/primitives/order-note.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  fixtureOrderId,
  fixtureOrderNumber,
  fixtureCustomerId,
  fixtureOrderChannel,
  fixtureOrderSource,
  fixtureOrderSubtotal,
  fixtureOrderDiscount,
  fixtureOrderTax,
  fixtureOrderShipping,
  fixtureOrderTotal,
} from '@fixtures/domain/primitive-fixtures.js';

function makeProps(overrides: Partial<Parameters<typeof OrderVO.create>[0]> = {}) {
  return {
    id: fixtureOrderId,
    orderNumber: fixtureOrderNumber,
    customerId: fixtureCustomerId,
    status: OrderStatusVO.pending(),
    channel: fixtureOrderChannel,
    source: fixtureOrderSource,
    subtotal: fixtureOrderSubtotal,
    discount: fixtureOrderDiscount,
    tax: fixtureOrderTax,
    shipping: fixtureOrderShipping,
    total: fixtureOrderTotal,
    ...overrides,
  };
}

describe('OrderVO', () => {
  describe('create', () => {
    it('creates with valid props', () => {
      const vo = OrderVO.create(makeProps());
      expect(vo.id.value).toBe(fixtureOrderId.value);
      expect(vo.orderNumber.value).toBe(fixtureOrderNumber.value);
      expect(vo.status.isPending()).toBe(true);
    });

    it('validates total = subtotal - discount + tax + shipping', () => {
      // subtotal 1000, discount 0, tax 0, shipping 0 → total 1000 ✅
      expect(() => OrderVO.create(makeProps())).not.toThrow();
    });

    it('throws when total does not match breakdown', () => {
      expect(() =>
        OrderVO.create(
          makeProps({
            total: OrderTotalVO.create(999, 'BDT'), // should be 1000
          }),
        ),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = OrderVO.reconstitute(makeProps({ total: OrderTotalVO.create(0, 'BDT') }));
      expect(vo.total.amount).toBe(0);
    });
  });

  describe('getters', () => {
    it('returns all fields', () => {
      const vo = OrderVO.create(makeProps());
      expect(vo.id).toBeDefined();
      expect(vo.orderNumber).toBeDefined();
      expect(vo.customerId).toBeDefined();
      expect(vo.status).toBeDefined();
      expect(vo.channel).toBeDefined();
      expect(vo.source).toBeDefined();
      expect(vo.subtotal).toBeDefined();
      expect(vo.discount).toBeDefined();
      expect(vo.tax).toBeDefined();
      expect(vo.shipping).toBeDefined();
      expect(vo.total).toBeDefined();
    });
  });

  describe('business methods', () => {
    it('isPending', () => {
      const vo = OrderVO.create(makeProps());
      expect(vo.isPending()).toBe(true);
    });

    it('isTerminal false for pending', () => {
      const vo = OrderVO.create(makeProps());
      expect(vo.isTerminal()).toBe(false);
    });

    it('isCancellable true for pending', () => {
      const vo = OrderVO.create(makeProps());
      expect(vo.isCancellable()).toBe(true);
    });

    it('hasDiscount false when no discount', () => {
      const vo = OrderVO.create(makeProps());
      expect(vo.hasDiscount()).toBe(false);
    });

    it('hasDiscount true when discount applied', () => {
      const vo = OrderVO.create(
        makeProps({
          discount: OrderDiscountVO.create(100, 'BDT'),
          total: OrderTotalVO.create(900, 'BDT'),
        }),
      );
      expect(vo.hasDiscount()).toBe(true);
    });

    it('hasNote false when no note', () => {
      const vo = OrderVO.create(makeProps());
      expect(vo.hasNote()).toBe(false);
    });

    it('hasNote true when note present', () => {
      const vo = OrderVO.create(makeProps({ note: OrderNoteVO.create('rush order') }));
      expect(vo.hasNote()).toBe(true);
    });
  });
});
