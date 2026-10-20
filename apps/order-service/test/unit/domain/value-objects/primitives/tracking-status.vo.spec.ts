/**
 * TrackingStatusVO — Full coverage tests
 */
import { describe, it, expect } from '@jest/globals';
import { TrackingStatusVO } from '@domain/primitives/tracking-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('TrackingStatusVO', () => {
  describe('create', () => {
    it.each(['pending', 'in_transit', 'out_for_delivery', 'delivered', 'failed', 'returned'])(
      'accepts "%s"',
      (s) => expect(TrackingStatusVO.create(s).value).toBe(s),
    );
    it('normalizes case', () => {
      expect(TrackingStatusVO.create('IN_TRANSIT').value).toBe('in_transit');
    });
    it('trims whitespace', () => {
      expect(TrackingStatusVO.create('  pending  ').value).toBe('pending');
    });
    it('throws for invalid', () => {
      expect(() => TrackingStatusVO.create('x')).toThrow(ValidationError);
    });
    it('throws for non-string', () => {
      expect(() => TrackingStatusVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(TrackingStatusVO.reconstitute('any').value).toBe('any');
    });
  });

  describe('predicates — ALL statuses', () => {
    it('isPending', () => {
      expect(TrackingStatusVO.create('pending').isPending()).toBe(true);
      expect(TrackingStatusVO.create('delivered').isPending()).toBe(false);
    });
    it('isInTransit', () => {
      expect(TrackingStatusVO.create('in_transit').isInTransit()).toBe(true);
      expect(TrackingStatusVO.create('pending').isInTransit()).toBe(false);
    });
    it('isOutForDelivery', () => {
      expect(TrackingStatusVO.create('out_for_delivery').isOutForDelivery()).toBe(true);
      expect(TrackingStatusVO.create('pending').isOutForDelivery()).toBe(false);
    });
    it('isDelivered', () => {
      expect(TrackingStatusVO.create('delivered').isDelivered()).toBe(true);
      expect(TrackingStatusVO.create('in_transit').isDelivered()).toBe(false);
    });
    it('isFailed', () => {
      expect(TrackingStatusVO.create('failed').isFailed()).toBe(true);
      expect(TrackingStatusVO.create('in_transit').isFailed()).toBe(false);
    });
    it('isReturned', () => {
      expect(TrackingStatusVO.create('returned').isReturned()).toBe(true);
      expect(TrackingStatusVO.create('delivered').isReturned()).toBe(false);
    });
  });

  describe('isTerminal', () => {
    it('true for delivered', () => {
      expect(TrackingStatusVO.create('delivered').isTerminal()).toBe(true);
    });
    it('true for returned', () => {
      expect(TrackingStatusVO.create('returned').isTerminal()).toBe(true);
    });
    it('false for pending', () => {
      expect(TrackingStatusVO.create('pending').isTerminal()).toBe(false);
    });
    it('false for in_transit', () => {
      expect(TrackingStatusVO.create('in_transit').isTerminal()).toBe(false);
    });
    it('false for out_for_delivery', () => {
      expect(TrackingStatusVO.create('out_for_delivery').isTerminal()).toBe(false);
    });
    it('false for failed', () => {
      expect(TrackingStatusVO.create('failed').isTerminal()).toBe(false);
    });
  });

  describe('canTransitionTo — all paths', () => {
    it('pending → in_transit', () => {
      expect(TrackingStatusVO.create('pending').canTransitionTo('in_transit')).toBe(true);
    });
    it('pending → failed', () => {
      expect(TrackingStatusVO.create('pending').canTransitionTo('failed')).toBe(true);
    });
    it('pending → delivered (forbidden)', () => {
      expect(TrackingStatusVO.create('pending').canTransitionTo('delivered')).toBe(false);
    });
    it('in_transit → out_for_delivery', () => {
      expect(TrackingStatusVO.create('in_transit').canTransitionTo('out_for_delivery')).toBe(true);
    });
    it('in_transit → failed', () => {
      expect(TrackingStatusVO.create('in_transit').canTransitionTo('failed')).toBe(true);
    });
    it('out_for_delivery → delivered', () => {
      expect(TrackingStatusVO.create('out_for_delivery').canTransitionTo('delivered')).toBe(true);
    });
    it('out_for_delivery → failed', () => {
      expect(TrackingStatusVO.create('out_for_delivery').canTransitionTo('failed')).toBe(true);
    });
    it('delivered → returned', () => {
      expect(TrackingStatusVO.create('delivered').canTransitionTo('returned')).toBe(true);
    });
    it('delivered → pending (forbidden)', () => {
      expect(TrackingStatusVO.create('delivered').canTransitionTo('pending')).toBe(false);
    });
    it('failed → in_transit (retry)', () => {
      expect(TrackingStatusVO.create('failed').canTransitionTo('in_transit')).toBe(true);
    });
    it('returned → anything (forbidden)', () => {
      expect(TrackingStatusVO.create('returned').canTransitionTo('pending')).toBe(false);
      expect(TrackingStatusVO.create('returned').canTransitionTo('delivered')).toBe(false);
    });
  });
});
