/**
 * OrderStatusVO — Full coverage tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderStatusVO } from '@domain/primitives/order-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('OrderStatusVO', () => {
  describe('create', () => {
    it.each([
      'pending', 'confirmed', 'processing', 'packed', 'shipped',
      'out_for_delivery', 'delivered', 'completed', 'cancelled',
      'returned', 'refunded', 'failed', 'on_hold',
    ])('accepts "%s"', (s) => expect(OrderStatusVO.create(s).value).toBe(s));
    it('normalizes case', () => {
      expect(OrderStatusVO.create('PENDING').value).toBe('pending');
    });
    it('trims whitespace', () => {
      expect(OrderStatusVO.create('  shipped  ').value).toBe('shipped');
    });
    it('throws for invalid', () => {
      expect(() => OrderStatusVO.create('invalid')).toThrow(ValidationError);
    });
    it('throws for non-string', () => {
      expect(() => OrderStatusVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(OrderStatusVO.reconstitute('any').value).toBe('any');
    });
  });

  describe('predicates', () => {
    it('isPending', () => {
      expect(OrderStatusVO.pending().isPending()).toBe(true);
      expect(OrderStatusVO.confirmed().isPending()).toBe(false);
    });
    it('isConfirmed', () => {
      expect(OrderStatusVO.confirmed().isConfirmed()).toBe(true);
      expect(OrderStatusVO.pending().isConfirmed()).toBe(false);
    });
    it('isProcessing', () => {
      expect(OrderStatusVO.processing().isProcessing()).toBe(true);
    });
    it('isPacked', () => {
      expect(OrderStatusVO.packed().isPacked()).toBe(true);
    });
    it('isShipped', () => {
      expect(OrderStatusVO.shipped().isShipped()).toBe(true);
    });
    it('isDelivered', () => {
      expect(OrderStatusVO.delivered().isDelivered()).toBe(true);
    });
    it('isCompleted', () => {
      expect(OrderStatusVO.completed().isCompleted()).toBe(true);
    });
    it('isCancelled', () => {
      expect(OrderStatusVO.cancelled().isCancelled()).toBe(true);
    });
    it('isReturned', () => {
      expect(OrderStatusVO.returned().isReturned()).toBe(true);
    });
    it('isRefunded', () => {
      expect(OrderStatusVO.refunded().isRefunded()).toBe(true);
    });
    it('isFailed', () => {
      expect(OrderStatusVO.failed().isFailed()).toBe(true);
    });
    it('isOnHold', () => {
      expect(OrderStatusVO.onHold().isOnHold()).toBe(true);
    });
  });

  describe('isTerminal', () => {
    it('true for terminal states', () => {
      expect(OrderStatusVO.cancelled().isTerminal()).toBe(true);
      expect(OrderStatusVO.completed().isTerminal()).toBe(true);
      expect(OrderStatusVO.refunded().isTerminal()).toBe(true);
    });
    it('false for active states', () => {
      expect(OrderStatusVO.pending().isTerminal()).toBe(false);
      expect(OrderStatusVO.shipped().isTerminal()).toBe(false);
      expect(OrderStatusVO.delivered().isTerminal()).toBe(false);
    });
  });

  describe('isFulfillable', () => {
    it('true for confirmed/processing/packed', () => {
      expect(OrderStatusVO.confirmed().isFulfillable()).toBe(true);
      expect(OrderStatusVO.processing().isFulfillable()).toBe(true);
      expect(OrderStatusVO.packed().isFulfillable()).toBe(true);
    });
    it('false for pending/shipped', () => {
      expect(OrderStatusVO.pending().isFulfillable()).toBe(false);
      expect(OrderStatusVO.shipped().isFulfillable()).toBe(false);
    });
  });

  describe('isShippable', () => {
    it('true for packed', () => {
      expect(OrderStatusVO.packed().isShippable()).toBe(true);
    });
    it('false for others', () => {
      expect(OrderStatusVO.pending().isShippable()).toBe(false);
      expect(OrderStatusVO.shipped().isShippable()).toBe(false);
    });
  });

  describe('isReturnable', () => {
    it('true for delivered/completed', () => {
      expect(OrderStatusVO.delivered().isReturnable()).toBe(true);
      expect(OrderStatusVO.completed().isReturnable()).toBe(true);
    });
    it('false for pending', () => {
      expect(OrderStatusVO.pending().isReturnable()).toBe(false);
    });
  });

  describe('isCancellable', () => {
    it('true for pre-shipment statuses', () => {
      expect(OrderStatusVO.pending().isCancellable()).toBe(true);
      expect(OrderStatusVO.confirmed().isCancellable()).toBe(true);
      expect(OrderStatusVO.processing().isCancellable()).toBe(true);
      expect(OrderStatusVO.packed().isCancellable()).toBe(true);
    });
    it('false for shipped/delivered/terminal', () => {
      expect(OrderStatusVO.shipped().isCancellable()).toBe(false);
      expect(OrderStatusVO.delivered().isCancellable()).toBe(false);
      expect(OrderStatusVO.cancelled().isCancellable()).toBe(false);
      expect(OrderStatusVO.completed().isCancellable()).toBe(false);
    });
  });

  describe('canTransitionTo — comprehensive', () => {
    it('pending transitions', () => {
      const s = OrderStatusVO.pending();
      expect(s.canTransitionTo('confirmed')).toBe(true);
      expect(s.canTransitionTo('cancelled')).toBe(true);
      expect(s.canTransitionTo('failed')).toBe(true);
      expect(s.canTransitionTo('on_hold')).toBe(true);
      expect(s.canTransitionTo('shipped')).toBe(false);
      expect(s.canTransitionTo('delivered')).toBe(false);
    });

    it('confirmed transitions', () => {
      const s = OrderStatusVO.confirmed();
      expect(s.canTransitionTo('processing')).toBe(true);
      expect(s.canTransitionTo('cancelled')).toBe(true);
      expect(s.canTransitionTo('on_hold')).toBe(true);
    });

    it('processing transitions', () => {
      const s = OrderStatusVO.processing();
      expect(s.canTransitionTo('packed')).toBe(true);
      expect(s.canTransitionTo('cancelled')).toBe(true);
    });

    it('packed transitions', () => {
      const s = OrderStatusVO.packed();
      expect(s.canTransitionTo('shipped')).toBe(true);
      expect(s.canTransitionTo('cancelled')).toBe(true);
    });

    it('shipped transitions', () => {
      const s = OrderStatusVO.shipped();
      expect(s.canTransitionTo('out_for_delivery')).toBe(true);
      expect(s.canTransitionTo('delivered')).toBe(true);
      expect(s.canTransitionTo('returned')).toBe(true);
    });

    it('delivered transitions', () => {
      const s = OrderStatusVO.delivered();
      expect(s.canTransitionTo('completed')).toBe(true);
      expect(s.canTransitionTo('returned')).toBe(true);
    });

    it('completed transitions', () => {
      const s = OrderStatusVO.completed();
      expect(s.canTransitionTo('returned')).toBe(true);
      expect(s.canTransitionTo('refunded')).toBe(true);
    });

    it('returned transitions', () => {
      expect(OrderStatusVO.returned().canTransitionTo('refunded')).toBe(true);
    });

    it('cancelled/refunded — no transitions', () => {
      expect(OrderStatusVO.cancelled().canTransitionTo('pending')).toBe(false);
      expect(OrderStatusVO.refunded().canTransitionTo('pending')).toBe(false);
    });

    it('failed → cancelled', () => {
      expect(OrderStatusVO.failed().canTransitionTo('cancelled')).toBe(true);
    });

    it('on_hold → confirmed/cancelled', () => {
      expect(OrderStatusVO.onHold().canTransitionTo('confirmed')).toBe(true);
      expect(OrderStatusVO.onHold().canTransitionTo('cancelled')).toBe(true);
    });
  });
});
