/**
 * FulfillmentStatusVO — Full coverage
 */
import { describe, it, expect } from '@jest/globals';
import { FulfillmentStatusVO } from '@domain/primitives/fulfillment-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('FulfillmentStatusVO', () => {
  describe('create', () => {
    it.each(['unfulfilled', 'partially_fulfilled', 'fulfilled', 'restocked', 'pending', 'cancelled'])(
      'accepts "%s"',
      (s) => expect(FulfillmentStatusVO.create(s).value).toBe(s),
    );
    it('throws for invalid', () => {
      expect(() => FulfillmentStatusVO.create('x')).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(FulfillmentStatusVO.reconstitute('any').value).toBe('any');
    });
  });

  describe('predicates', () => {
    it('isUnfulfilled', () => {
      expect(FulfillmentStatusVO.unfulfilled().isUnfulfilled()).toBe(true);
      expect(FulfillmentStatusVO.create('fulfilled').isUnfulfilled()).toBe(false);
    });
    it('isPartiallyFulfilled', () => {
      expect(FulfillmentStatusVO.create('partially_fulfilled').isPartiallyFulfilled()).toBe(true);
    });
    it('isFulfilled', () => {
      expect(FulfillmentStatusVO.create('fulfilled').isFulfilled()).toBe(true);
    });
    it('isRestocked', () => {
      expect(FulfillmentStatusVO.create('restocked').isRestocked()).toBe(true);
    });
    it('isPending', () => {
      expect(FulfillmentStatusVO.create('pending').isPending()).toBe(true);
    });
    it('isCancelled', () => {
      expect(FulfillmentStatusVO.create('cancelled').isCancelled()).toBe(true);
    });
  });

  describe('isTerminal', () => {
    it('true for fulfilled/restocked/cancelled', () => {
      expect(FulfillmentStatusVO.create('fulfilled').isTerminal()).toBe(true);
      expect(FulfillmentStatusVO.create('restocked').isTerminal()).toBe(true);
      expect(FulfillmentStatusVO.create('cancelled').isTerminal()).toBe(true);
    });
    it('false for others', () => {
      expect(FulfillmentStatusVO.unfulfilled().isTerminal()).toBe(false);
      expect(FulfillmentStatusVO.create('partially_fulfilled').isTerminal()).toBe(false);
      expect(FulfillmentStatusVO.create('pending').isTerminal()).toBe(false);
    });
  });

  describe('canTransitionTo', () => {
    it('unfulfilled → pending', () => {
      expect(FulfillmentStatusVO.unfulfilled().canTransitionTo('pending')).toBe(true);
    });
    it('unfulfilled → partially_fulfilled', () => {
      expect(FulfillmentStatusVO.unfulfilled().canTransitionTo('partially_fulfilled')).toBe(true);
    });
    it('unfulfilled → cancelled', () => {
      expect(FulfillmentStatusVO.unfulfilled().canTransitionTo('cancelled')).toBe(true);
    });
    it('pending → fulfilled', () => {
      expect(FulfillmentStatusVO.create('pending').canTransitionTo('fulfilled')).toBe(true);
    });
    it('partially_fulfilled → fulfilled', () => {
      expect(
        FulfillmentStatusVO.create('partially_fulfilled').canTransitionTo('fulfilled'),
      ).toBe(true);
    });
    it('fulfilled → restocked', () => {
      expect(FulfillmentStatusVO.create('fulfilled').canTransitionTo('restocked')).toBe(true);
    });
    it('restocked → anything false', () => {
      expect(FulfillmentStatusVO.create('restocked').canTransitionTo('pending')).toBe(false);
    });
    it('cancelled → anything false', () => {
      expect(FulfillmentStatusVO.create('cancelled').canTransitionTo('pending')).toBe(false);
    });
  });
});
