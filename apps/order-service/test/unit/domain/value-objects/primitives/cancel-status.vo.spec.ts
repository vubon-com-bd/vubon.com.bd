import { describe, it, expect } from '@jest/globals';
import { CancelStatusVO } from '@domain/primitives/cancel-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CancelStatusVO', () => {
  describe('create', () => {
    it.each(['requested', 'approved', 'rejected', 'processed', 'refunded'])(
      'accepts "%s"',
      (s) => expect(CancelStatusVO.create(s).value).toBe(s),
    );
    it('throws for invalid', () => {
      expect(() => CancelStatusVO.create('x')).toThrow(ValidationError);
    });
  });

  describe('predicates', () => {
    it('isRequested', () => {
      expect(CancelStatusVO.requested().isRequested()).toBe(true);
    });
    it('isTerminal', () => {
      expect(CancelStatusVO.create('rejected').isTerminal()).toBe(true);
      expect(CancelStatusVO.create('refunded').isTerminal()).toBe(true);
      expect(CancelStatusVO.requested().isTerminal()).toBe(false);
    });
  });

  describe('state machine', () => {
    it('requested → approved', () => {
      expect(CancelStatusVO.requested().canTransitionTo('approved')).toBe(true);
    });
    it('requested → rejected', () => {
      expect(CancelStatusVO.requested().canTransitionTo('rejected')).toBe(true);
    });
    it('approved → processed', () => {
      expect(CancelStatusVO.approved().canTransitionTo('processed')).toBe(true);
    });
    it('rejected → anything forbidden', () => {
      expect(CancelStatusVO.create('rejected').canTransitionTo('approved')).toBe(false);
    });
  });
});
