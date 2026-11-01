/**
 * OrderFulfillmentVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderFulfillmentVO } from '@domain/composites/order-fulfillment.vo.js';
import { FulfillmentStatusVO } from '@domain/primitives/fulfillment-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  fixtureFulfillmentId,
  fixtureOrderId,
  fixtureVendorId,
} from '@fixtures/domain/primitive-fixtures.js';

function makeProps(overrides: Partial<Parameters<typeof OrderFulfillmentVO.create>[0]> = {}) {
  return {
    id: fixtureFulfillmentId,
    orderId: fixtureOrderId,
    status: FulfillmentStatusVO.unfulfilled(),
    itemIds: ['item-1', 'item-2', 'item-3'],
    ...overrides,
  };
}

describe('OrderFulfillmentVO', () => {
  describe('create', () => {
    it('creates with valid props', () => {
      const vo = OrderFulfillmentVO.create(makeProps());
      expect(vo.itemCount).toBe(3);
    });

    it('creates with vendorId', () => {
      const vo = OrderFulfillmentVO.create(makeProps({ vendorId: fixtureVendorId }));
      expect(vo.vendorId).toBe(fixtureVendorId);
    });

    it('creates with tracking', () => {
      const vo = OrderFulfillmentVO.create(makeProps({ trackingNumber: 'TRK-ABCD1234' }));
      expect(vo.hasTracking()).toBe(true);
    });

    it('throws for empty itemIds', () => {
      expect(() => OrderFulfillmentVO.create(makeProps({ itemIds: [] }))).toThrow(
        ValidationError,
      );
    });

    it('throws when fulfilled without fulfilledAt', () => {
      expect(() =>
        OrderFulfillmentVO.create(
          makeProps({ status: FulfillmentStatusVO.create('fulfilled') }),
        ),
      ).toThrow(ValidationError);
    });

    it('accepts fulfilled with fulfilledAt', () => {
      const vo = OrderFulfillmentVO.create(
        makeProps({
          status: FulfillmentStatusVO.create('fulfilled'),
          fulfilledAt: new Date().toISOString(),
        }),
      );
      expect(vo.isFulfilled()).toBe(true);
    });
  });

  describe('business methods', () => {
    it('isTerminal false for unfulfilled', () => {
      const vo = OrderFulfillmentVO.create(makeProps());
      expect(vo.isTerminal()).toBe(false);
    });

    it('isTerminal true for fulfilled', () => {
      const vo = OrderFulfillmentVO.create(
        makeProps({
          status: FulfillmentStatusVO.create('fulfilled'),
          fulfilledAt: new Date().toISOString(),
        }),
      );
      expect(vo.isTerminal()).toBe(true);
    });

    it('hasTracking false without tracking', () => {
      const vo = OrderFulfillmentVO.create(makeProps());
      expect(vo.hasTracking()).toBe(false);
    });
  });
});
