/**
 * OrderItemStatusVO — Full coverage
 */
import { describe, it, expect } from '@jest/globals';
import { OrderItemStatusVO } from '@domain/primitives/order-item-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('OrderItemStatusVO', () => {
  describe('create', () => {
    it.each([
      'pending', 'confirmed', 'packed', 'shipped', 'delivered',
      'cancelled', 'returned', 'refunded',
    ])('accepts "%s"', (s) => expect(OrderItemStatusVO.create(s).value).toBe(s));
    it('normalizes case', () => {
      expect(OrderItemStatusVO.create('CONFIRMED').value).toBe('confirmed');
    });
    it('throws for invalid', () => {
      expect(() => OrderItemStatusVO.create('x')).toThrow(ValidationError);
    });
    it('throws for non-string', () => {
      expect(() => OrderItemStatusVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(OrderItemStatusVO.reconstitute('any').value).toBe('any');
    });
  });

  describe('predicates', () => {
    it('isPending', () => {
      expect(OrderItemStatusVO.pending().isPending()).toBe(true);
      expect(OrderItemStatusVO.confirmed().isPending()).toBe(false);
    });
    it('isConfirmed', () => {
      expect(OrderItemStatusVO.confirmed().isConfirmed()).toBe(true);
    });
    it('isPacked', () => {
      expect(OrderItemStatusVO.create('packed').isPacked()).toBe(true);
    });
    it('isShipped', () => {
      expect(OrderItemStatusVO.create('shipped').isShipped()).toBe(true);
    });
    it('isDelivered', () => {
      expect(OrderItemStatusVO.create('delivered').isDelivered()).toBe(true);
    });
    it('isCancelled', () => {
      expect(OrderItemStatusVO.cancelled().isCancelled()).toBe(true);
    });
    it('isReturned', () => {
      expect(OrderItemStatusVO.create('returned').isReturned()).toBe(true);
    });
    it('isRefunded', () => {
      expect(OrderItemStatusVO.create('refunded').isRefunded()).toBe(true);
    });
  });

  describe('isTerminal', () => {
    it('true for cancelled/refunded', () => {
      expect(OrderItemStatusVO.cancelled().isTerminal()).toBe(true);
      expect(OrderItemStatusVO.create('refunded').isTerminal()).toBe(true);
    });
    it('false for others', () => {
      expect(OrderItemStatusVO.pending().isTerminal()).toBe(false);
      expect(OrderItemStatusVO.create('shipped').isTerminal()).toBe(false);
    });
  });

  describe('isCancellable', () => {
    it('true for pending/confirmed/packed', () => {
      expect(OrderItemStatusVO.pending().isCancellable()).toBe(true);
      expect(OrderItemStatusVO.confirmed().isCancellable()).toBe(true);
      expect(OrderItemStatusVO.create('packed').isCancellable()).toBe(true);
    });
    it('false for shipped+', () => {
      expect(OrderItemStatusVO.create('shipped').isCancellable()).toBe(false);
      expect(OrderItemStatusVO.create('delivered').isCancellable()).toBe(false);
    });
  });

  describe('isReturnable', () => {
    it('true for delivered', () => {
      expect(OrderItemStatusVO.create('delivered').isReturnable()).toBe(true);
    });
    it('false for others', () => {
      expect(OrderItemStatusVO.pending().isReturnable()).toBe(false);
      expect(OrderItemStatusVO.create('shipped').isReturnable()).toBe(false);
    });
  });

  describe('canTransitionTo', () => {
    it('pending → confirmed', () => {
      expect(OrderItemStatusVO.pending().canTransitionTo('confirmed')).toBe(true);
    });
    it('pending → cancelled', () => {
      expect(OrderItemStatusVO.pending().canTransitionTo('cancelled')).toBe(true);
    });
    it('confirmed → packed', () => {
      expect(OrderItemStatusVO.confirmed().canTransitionTo('packed')).toBe(true);
    });
    it('packed → shipped', () => {
      expect(OrderItemStatusVO.create('packed').canTransitionTo('shipped')).toBe(true);
    });
    it('shipped → delivered', () => {
      expect(OrderItemStatusVO.create('shipped').canTransitionTo('delivered')).toBe(true);
    });
    it('shipped → returned', () => {
      expect(OrderItemStatusVO.create('shipped').canTransitionTo('returned')).toBe(true);
    });
    it('delivered → returned', () => {
      expect(OrderItemStatusVO.create('delivered').canTransitionTo('returned')).toBe(true);
    });
    it('delivered → refunded', () => {
      expect(OrderItemStatusVO.create('delivered').canTransitionTo('refunded')).toBe(true);
    });
    it('cancelled → anything false', () => {
      expect(OrderItemStatusVO.cancelled().canTransitionTo('pending')).toBe(false);
    });
    it('returned → refunded', () => {
      expect(OrderItemStatusVO.create('returned').canTransitionTo('refunded')).toBe(true);
    });
  });
});
