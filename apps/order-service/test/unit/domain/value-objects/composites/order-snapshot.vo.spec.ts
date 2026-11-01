/**
 * OrderSnapshotVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderSnapshotVO } from '@domain/composites/order-snapshot.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  fixtureOrderVO,
  fixtureOrderItemVO,
  fixtureShippingAddressVO,
  fixtureBillingAddressVO,
} from '@fixtures/domain/composite-fixtures.js';

function makeProps(overrides: Partial<Parameters<typeof OrderSnapshotVO.create>[0]> = {}) {
  return {
    order: fixtureOrderVO,
    items: [fixtureOrderItemVO],
    shippingAddress: fixtureShippingAddressVO,
    snapshotAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('OrderSnapshotVO', () => {
  describe('create', () => {
    it('creates with valid props', () => {
      const vo = OrderSnapshotVO.create(makeProps());
      expect(vo.itemCount).toBe(1);
      expect(vo.order).toBe(fixtureOrderVO);
    });

    it('creates with billingAddress', () => {
      const vo = OrderSnapshotVO.create(makeProps({ billingAddress: fixtureBillingAddressVO }));
      expect(vo.hasBillingAddress()).toBe(true);
    });

    it('throws for empty items', () => {
      expect(() => OrderSnapshotVO.create(makeProps({ items: [] }))).toThrow(ValidationError);
    });

    it('throws for empty snapshotAt', () => {
      expect(() => OrderSnapshotVO.create(makeProps({ snapshotAt: '' }))).toThrow(
        ValidationError,
      );
    });
  });

  describe('business methods', () => {
    it('itemCount returns items length', () => {
      const vo = OrderSnapshotVO.create(
        makeProps({ items: [fixtureOrderItemVO, fixtureOrderItemVO] }),
      );
      expect(vo.itemCount).toBe(2);
    });

    it('hasBillingAddress false without billing', () => {
      const vo = OrderSnapshotVO.create(makeProps());
      expect(vo.hasBillingAddress()).toBe(false);
    });

    it('hasItems true with items', () => {
      const vo = OrderSnapshotVO.create(makeProps());
      expect(vo.hasItems()).toBe(true);
    });
  });
});
