/**
 * ReturnStatusVO — Full coverage tests
 */
import { describe, it, expect } from '@jest/globals';
import { ReturnStatusVO } from '@domain/primitives/return-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('ReturnStatusVO', () => {
  describe('create', () => {
    it.each([
      'requested', 'approved', 'rejected', 'pickup_scheduled',
      'picked_up', 'received', 'inspected', 'refunded', 'replaced', 'closed',
    ])('accepts "%s"', (s) => expect(ReturnStatusVO.create(s).value).toBe(s));
    it('normalizes case', () => {
      expect(ReturnStatusVO.create('APPROVED').value).toBe('approved');
    });
    it('throws for invalid', () => {
      expect(() => ReturnStatusVO.create('x')).toThrow(ValidationError);
    });
    it('throws for non-string', () => {
      expect(() => ReturnStatusVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(ReturnStatusVO.reconstitute('any').value).toBe('any');
    });
  });

  describe('predicates — ALL', () => {
    it('isRequested', () => {
      expect(ReturnStatusVO.requested().isRequested()).toBe(true);
      expect(ReturnStatusVO.create('approved').isRequested()).toBe(false);
    });
    it('isApproved', () => {
      expect(ReturnStatusVO.create('approved').isApproved()).toBe(true);
      expect(ReturnStatusVO.requested().isApproved()).toBe(false);
    });
    it('isRejected', () => {
      expect(ReturnStatusVO.create('rejected').isRejected()).toBe(true);
    });
    it('isPickupScheduled', () => {
      expect(ReturnStatusVO.create('pickup_scheduled').isPickupScheduled()).toBe(true);
    });
    it('isPickedUp', () => {
      expect(ReturnStatusVO.create('picked_up').isPickedUp()).toBe(true);
    });
    it('isReceived', () => {
      expect(ReturnStatusVO.create('received').isReceived()).toBe(true);
    });
    it('isInspected', () => {
      expect(ReturnStatusVO.create('inspected').isInspected()).toBe(true);
    });
    it('isRefunded', () => {
      expect(ReturnStatusVO.create('refunded').isRefunded()).toBe(true);
    });
    it('isReplaced', () => {
      expect(ReturnStatusVO.create('replaced').isReplaced()).toBe(true);
    });
    it('isClosed', () => {
      expect(ReturnStatusVO.create('closed').isClosed()).toBe(true);
    });
  });

  describe('isTerminal', () => {
    it('true for rejected', () => {
      expect(ReturnStatusVO.create('rejected').isTerminal()).toBe(true);
    });
    it('true for closed', () => {
      expect(ReturnStatusVO.create('closed').isTerminal()).toBe(true);
    });
    it('false for others', () => {
      expect(ReturnStatusVO.requested().isTerminal()).toBe(false);
      expect(ReturnStatusVO.create('approved').isTerminal()).toBe(false);
      expect(ReturnStatusVO.create('pickup_scheduled').isTerminal()).toBe(false);
      expect(ReturnStatusVO.create('picked_up').isTerminal()).toBe(false);
      expect(ReturnStatusVO.create('received').isTerminal()).toBe(false);
      expect(ReturnStatusVO.create('inspected').isTerminal()).toBe(false);
      expect(ReturnStatusVO.create('refunded').isTerminal()).toBe(false);
      expect(ReturnStatusVO.create('replaced').isTerminal()).toBe(false);
    });
  });

  describe('canTransitionTo — full state machine', () => {
    it('requested → approved', () => {
      expect(ReturnStatusVO.requested().canTransitionTo('approved')).toBe(true);
    });
    it('requested → rejected', () => {
      expect(ReturnStatusVO.requested().canTransitionTo('rejected')).toBe(true);
    });
    it('requested → pickup_scheduled (forbidden)', () => {
      expect(ReturnStatusVO.requested().canTransitionTo('pickup_scheduled')).toBe(false);
    });
    it('approved → pickup_scheduled', () => {
      expect(ReturnStatusVO.create('approved').canTransitionTo('pickup_scheduled')).toBe(true);
    });
    it('rejected → anything (forbidden)', () => {
      expect(ReturnStatusVO.create('rejected').canTransitionTo('approved')).toBe(false);
    });
    it('pickup_scheduled → picked_up', () => {
      expect(ReturnStatusVO.create('pickup_scheduled').canTransitionTo('picked_up')).toBe(true);
    });
    it('picked_up → received', () => {
      expect(ReturnStatusVO.create('picked_up').canTransitionTo('received')).toBe(true);
    });
    it('received → inspected', () => {
      expect(ReturnStatusVO.create('received').canTransitionTo('inspected')).toBe(true);
    });
    it('inspected → refunded', () => {
      expect(ReturnStatusVO.create('inspected').canTransitionTo('refunded')).toBe(true);
    });
    it('inspected → replaced', () => {
      expect(ReturnStatusVO.create('inspected').canTransitionTo('replaced')).toBe(true);
    });
    it('inspected → closed', () => {
      expect(ReturnStatusVO.create('inspected').canTransitionTo('closed')).toBe(true);
    });
    it('refunded → closed', () => {
      expect(ReturnStatusVO.create('refunded').canTransitionTo('closed')).toBe(true);
    });
    it('replaced → closed', () => {
      expect(ReturnStatusVO.create('replaced').canTransitionTo('closed')).toBe(true);
    });
    it('closed → anything (forbidden)', () => {
      expect(ReturnStatusVO.create('closed').canTransitionTo('requested')).toBe(false);
    });
  });
});
