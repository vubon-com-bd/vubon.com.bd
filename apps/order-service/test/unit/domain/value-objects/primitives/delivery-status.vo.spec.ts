/**
 * DeliveryStatusVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { DeliveryStatusVO } from '@domain/primitives/delivery-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('DeliveryStatusVO', () => {
  describe('create', () => {
    it.each(['pending', 'scheduled', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed', 'cancelled'])(
      'accepts "%s"',
      (s) => expect(DeliveryStatusVO.create(s).value).toBe(s),
    );
    it('throws for invalid', () => {
      expect(() => DeliveryStatusVO.create('x')).toThrow(ValidationError);
    });
  });

  describe('predicates', () => {
    it('isTerminal', () => {
      expect(DeliveryStatusVO.delivered().isTerminal()).toBe(true);
      expect(DeliveryStatusVO.create('cancelled').isTerminal()).toBe(true);
      expect(DeliveryStatusVO.pending().isTerminal()).toBe(false);
    });
    it('isInProgress', () => {
      expect(DeliveryStatusVO.create('picked_up').isInProgress()).toBe(true);
      expect(DeliveryStatusVO.create('in_transit').isInProgress()).toBe(true);
      expect(DeliveryStatusVO.create('out_for_delivery').isInProgress()).toBe(true);
      expect(DeliveryStatusVO.pending().isInProgress()).toBe(false);
    });
  });

  describe('state machine', () => {
    it('pending → scheduled', () => {
      expect(DeliveryStatusVO.pending().canTransitionTo('scheduled')).toBe(true);
    });
    it('scheduled → picked_up', () => {
      expect(DeliveryStatusVO.create('scheduled').canTransitionTo('picked_up')).toBe(true);
    });
    it('delivered → anything forbidden', () => {
      expect(DeliveryStatusVO.delivered().canTransitionTo('cancelled')).toBe(false);
    });
    it('failed → scheduled (retry) allowed', () => {
      expect(DeliveryStatusVO.create('failed').canTransitionTo('scheduled')).toBe(true);
    });
  });
});
