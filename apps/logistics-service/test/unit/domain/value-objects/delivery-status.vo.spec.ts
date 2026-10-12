/**
 * DeliveryStatusVO — attempts + delivery state machine
 */
import { describe, it, expect } from '@jest/globals';
import { DeliveryStatusVO } from '@domain/value-objects/primitives/delivery-status.vo.js';

describe('DeliveryStatusVO', () => {
  it('creates valid statuses', () => {
    expect(DeliveryStatusVO.scheduled().value).toBe('scheduled');
    expect(DeliveryStatusVO.delivered().value).toBe('delivered');
  });
  it('throws on invalid status', () => {
    expect(() => DeliveryStatusVO.create('__bad__')).toThrow();
  });

  describe('predicates', () => {
    it('isFinal() for delivered/cancelled', () => {
      expect(DeliveryStatusVO.delivered().isFinal()).toBe(true);
      expect(DeliveryStatusVO.cancelled().isFinal()).toBe(true);
      expect(DeliveryStatusVO.failed().isFinal()).toBe(false); // retryable
    });
    it('isSuccessful() only for delivered', () => {
      expect(DeliveryStatusVO.delivered().isSuccessful()).toBe(true);
      expect(DeliveryStatusVO.failed().isSuccessful()).toBe(false);
    });
    it('isRecoverable() for failed/rescheduled/refused', () => {
      expect(DeliveryStatusVO.failed().isRecoverable()).toBe(true);
      expect(DeliveryStatusVO.rescheduled().isRecoverable()).toBe(true);
      expect(DeliveryStatusVO.refused().isRecoverable()).toBe(true);
      expect(DeliveryStatusVO.delivered().isRecoverable()).toBe(false);
    });
    it('isEnRoute() for in_transit/out_for_delivery', () => {
      expect(DeliveryStatusVO.inTransit().isEnRoute()).toBe(true);
      expect(DeliveryStatusVO.outForDelivery().isEnRoute()).toBe(true);
      expect(DeliveryStatusVO.scheduled().isEnRoute()).toBe(false);
    });
    it('requiresProof() once out for delivery', () => {
      expect(DeliveryStatusVO.outForDelivery().requiresProof()).toBe(true);
      expect(DeliveryStatusVO.arrived().requiresProof()).toBe(true);
      expect(DeliveryStatusVO.scheduled().requiresProof()).toBe(false);
    });
  });

  describe('state machine', () => {
    it('scheduled → assigned ✅', () => {
      expect(DeliveryStatusVO.scheduled().canTransitionTo('assigned')).toBe(true);
    });
    it('assigned → picked_up ✅', () => {
      expect(DeliveryStatusVO.assigned().canTransitionTo('picked_up')).toBe(true);
    });
    it('out_for_delivery → delivered ✅', () => {
      expect(DeliveryStatusVO.outForDelivery().canTransitionTo('delivered')).toBe(true);
    });
    it('out_for_delivery → failed/refused ✅', () => {
      expect(DeliveryStatusVO.outForDelivery().canTransitionTo('failed')).toBe(true);
      expect(DeliveryStatusVO.outForDelivery().canTransitionTo('refused')).toBe(true);
    });
    it('failed → rescheduled ✅ (retry)', () => {
      expect(DeliveryStatusVO.failed().canTransitionTo('rescheduled')).toBe(true);
    });
    it('delivered has NO transitions', () => {
      expect(DeliveryStatusVO.delivered().canTransitionTo('scheduled')).toBe(false);
    });
    it('scheduled → delivered ❌ (skipping)', () => {
      expect(DeliveryStatusVO.scheduled().canTransitionTo('delivered')).toBe(false);
    });
  });
});
