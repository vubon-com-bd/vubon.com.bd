/**
 * CheckoutStatusVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { CheckoutStatusVO } from '@domain/primitives/checkout-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CheckoutStatusVO', () => {
  describe('create', () => {
    it.each(['started', 'in_progress', 'completed', 'abandoned', 'expired'])(
      'accepts "%s"',
      (s) => expect(CheckoutStatusVO.create(s).value).toBe(s),
    );
    it('normalizes case', () => {
      expect(CheckoutStatusVO.create('COMPLETED').value).toBe('completed');
    });
    it('throws for invalid', () => {
      expect(() => CheckoutStatusVO.create('x')).toThrow(ValidationError);
    });
  });

  describe('predicates', () => {
    it('isStarted', () => {
      expect(CheckoutStatusVO.started().isStarted()).toBe(true);
    });
    it('isCompleted', () => {
      expect(CheckoutStatusVO.completed().isCompleted()).toBe(true);
    });
    it('isTerminal', () => {
      expect(CheckoutStatusVO.completed().isTerminal()).toBe(true);
      expect(CheckoutStatusVO.abandoned().isTerminal()).toBe(true);
      expect(CheckoutStatusVO.expired().isTerminal()).toBe(true);
      expect(CheckoutStatusVO.started().isTerminal()).toBe(false);
    });
  });

  describe('state machine', () => {
    it('started → in_progress', () => {
      expect(CheckoutStatusVO.started().canTransitionTo('in_progress')).toBe(true);
    });
    it('started → completed forbidden (must pass in_progress)', () => {
      expect(CheckoutStatusVO.started().canTransitionTo('completed')).toBe(false);
    });
    it('in_progress → completed', () => {
      expect(CheckoutStatusVO.inProgress().canTransitionTo('completed')).toBe(true);
    });
    it('completed → anything forbidden', () => {
      expect(CheckoutStatusVO.completed().canTransitionTo('in_progress')).toBe(false);
    });
  });
});
