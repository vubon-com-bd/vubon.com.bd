/**
 * DeliveryVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { DeliveryVO } from '@domain/composites/delivery.vo.js';
import { DeliveryStatusVO } from '@domain/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '@domain/primitives/delivery-type.vo.js';
import { TrackingNumberVO } from '@domain/primitives/tracking-number.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  fixtureDeliveryId,
  fixtureOrderId,
  fixtureDeliveryMethodId,
  fixtureTrackingNumber,
} from '@fixtures/domain/primitive-fixtures.js';

function makeProps(overrides: Partial<Parameters<typeof DeliveryVO.create>[0]> = {}) {
  return {
    id: fixtureDeliveryId,
    orderId: fixtureOrderId,
    methodId: fixtureDeliveryMethodId,
    status: DeliveryStatusVO.pending(),
    type: DeliveryTypeVO.create('standard'),
    attempts: 0,
    ...overrides,
  };
}

describe('DeliveryVO', () => {
  describe('create', () => {
    it('creates with valid props', () => {
      const vo = DeliveryVO.create(makeProps());
      expect(vo.id.value).toBe(fixtureDeliveryId.value);
      expect(vo.attempts).toBe(0);
    });

    it('creates with tracking number', () => {
      const vo = DeliveryVO.create(makeProps({ trackingNumber: fixtureTrackingNumber }));
      expect(vo.hasTracking()).toBe(true);
    });

    it('throws for negative attempts', () => {
      expect(() => DeliveryVO.create(makeProps({ attempts: -1 }))).toThrow(ValidationError);
    });

    it('throws for non-integer attempts', () => {
      expect(() => DeliveryVO.create(makeProps({ attempts: 1.5 }))).toThrow(ValidationError);
    });

    it('throws when delivered without deliveredAt', () => {
      expect(() =>
        DeliveryVO.create(makeProps({ status: DeliveryStatusVO.delivered() })),
      ).toThrow(ValidationError);
    });

    it('accepts delivered status with deliveredAt', () => {
      const vo = DeliveryVO.create(
        makeProps({
          status: DeliveryStatusVO.delivered(),
          deliveredAt: new Date().toISOString(),
        }),
      );
      expect(vo.isDelivered()).toBe(true);
    });
  });

  describe('business methods', () => {
    it('hasTracking false without tracking', () => {
      const vo = DeliveryVO.create(makeProps());
      expect(vo.hasTracking()).toBe(false);
    });

    it('canRetry false when not failed', () => {
      const vo = DeliveryVO.create(makeProps());
      expect(vo.canRetry()).toBe(false);
    });

    it('canRetry true when failed and attempts < 3', () => {
      const vo = DeliveryVO.create(
        makeProps({ status: DeliveryStatusVO.create('failed'), attempts: 1 }),
      );
      expect(vo.canRetry()).toBe(true);
    });

    it('canRetry false when failed and attempts >= 3', () => {
      const vo = DeliveryVO.create(
        makeProps({ status: DeliveryStatusVO.create('failed'), attempts: 3 }),
      );
      expect(vo.canRetry()).toBe(false);
    });
  });
});
