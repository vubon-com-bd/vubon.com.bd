/**
 * OrderItemVO — Unit Tests
 * @module order-service/test/unit/domain/value-objects/composites
 */
import { describe, it, expect } from '@jest/globals';
import { OrderItemVO } from '@domain/composites/order-item.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  fixtureOrderItemId,
  fixtureOrderId,
  fixtureProductId,
  fixtureVariantId,
  fixtureVendorId,
  fixtureItemQuantity,
  fixtureItemPrice,
  fixtureItemStatus,
} from '@fixtures/domain/primitive-fixtures.js';

function makeProps(overrides: Partial<Parameters<typeof OrderItemVO.create>[0]> = {}) {
  return {
    id: fixtureOrderItemId,
    orderId: fixtureOrderId,
    productId: fixtureProductId,
    name: 'Test Product',
    sku: 'SKU-001',
    quantity: fixtureItemQuantity,
    unitPrice: fixtureItemPrice,
    status: fixtureItemStatus,
    ...overrides,
  };
}

describe('OrderItemVO', () => {
  describe('create', () => {
    it('creates with valid props', () => {
      const vo = OrderItemVO.create(makeProps());
      expect(vo.name).toBe('Test Product');
      expect(vo.sku).toBe('SKU-001');
      expect(vo.quantity.value).toBe(2);
    });

    it('accepts optional variantId', () => {
      const vo = OrderItemVO.create(makeProps({ variantId: fixtureVariantId }));
      expect(vo.variantId).toBe(fixtureVariantId);
    });

    it('accepts optional vendorId', () => {
      const vo = OrderItemVO.create(makeProps({ vendorId: fixtureVendorId }));
      expect(vo.vendorId).toBe(fixtureVendorId);
    });

    it('throws for empty name', () => {
      expect(() => OrderItemVO.create(makeProps({ name: '' }))).toThrow(ValidationError);
    });

    it('throws for empty sku', () => {
      expect(() => OrderItemVO.create(makeProps({ sku: '' }))).toThrow(ValidationError);
    });
  });

  describe('lineTotal', () => {
    it('multiplies unitPrice by quantity', () => {
      const vo = OrderItemVO.create(makeProps());
      expect(vo.lineTotal.amount).toBe(1000); // 500 * 2
    });
  });

  describe('business methods', () => {
    it('isCancellable true for pending', () => {
      const vo = OrderItemVO.create(makeProps());
      expect(vo.isCancellable()).toBe(true);
    });

    it('isReturnable false for pending', () => {
      const vo = OrderItemVO.create(makeProps());
      expect(vo.isReturnable()).toBe(false);
    });

    it('hasVariant true when variantId present', () => {
      const vo = OrderItemVO.create(makeProps({ variantId: fixtureVariantId }));
      expect(vo.hasVariant()).toBe(true);
    });

    it('hasVariant false when no variantId', () => {
      const vo = OrderItemVO.create(makeProps());
      expect(vo.hasVariant()).toBe(false);
    });
  });
});
