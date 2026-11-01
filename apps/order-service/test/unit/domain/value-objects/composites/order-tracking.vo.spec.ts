/**
 * OrderTrackingVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderTrackingVO } from '@domain/composites/order-tracking.vo.js';
import { TrackingStatusVO } from '@domain/primitives/tracking-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  fixtureTrackingId,
  fixtureOrderId,
  fixtureTrackingNumber,
} from '@fixtures/domain/primitive-fixtures.js';

function makeProps(overrides: Partial<Parameters<typeof OrderTrackingVO.create>[0]> = {}) {
  return {
    id: fixtureTrackingId,
    orderId: fixtureOrderId,
    status: TrackingStatusVO.create('pending'),
    trackingNumber: fixtureTrackingNumber,
    message: 'Order picked up',
    occurredAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('OrderTrackingVO', () => {
  describe('create', () => {
    it('creates with valid props', () => {
      const vo = OrderTrackingVO.create(makeProps());
      expect(vo.message).toBe('Order picked up');
      expect(vo.trackingNumber.value).toBe(fixtureTrackingNumber.value);
    });

    it('creates with location', () => {
      const vo = OrderTrackingVO.create(makeProps({ location: 'Dhaka Hub' }));
      expect(vo.hasLocation()).toBe(true);
    });

    it('creates with carrier', () => {
      const vo = OrderTrackingVO.create(makeProps({ carrier: 'Pathao' }));
      expect(vo.hasCarrier()).toBe(true);
    });

    it('throws for empty message', () => {
      expect(() => OrderTrackingVO.create(makeProps({ message: '' }))).toThrow(ValidationError);
    });
  });

  describe('business methods', () => {
    it('isTerminal false for pending', () => {
      const vo = OrderTrackingVO.create(makeProps());
      expect(vo.isTerminal()).toBe(false);
    });

    it('isTerminal true for delivered', () => {
      const vo = OrderTrackingVO.create(
        makeProps({ status: TrackingStatusVO.create('delivered') }),
      );
      expect(vo.isTerminal()).toBe(true);
    });

    it('hasLocation false without location', () => {
      const vo = OrderTrackingVO.create(makeProps());
      expect(vo.hasLocation()).toBe(false);
    });

    it('hasLocation false for empty string', () => {
      const vo = OrderTrackingVO.create(makeProps({ location: '' }));
      expect(vo.hasLocation()).toBe(false);
    });

    it('hasCarrier false without carrier', () => {
      const vo = OrderTrackingVO.create(makeProps());
      expect(vo.hasCarrier()).toBe(false);
    });
  });
});
