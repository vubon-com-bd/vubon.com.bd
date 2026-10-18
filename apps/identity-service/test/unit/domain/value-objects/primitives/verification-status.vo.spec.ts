/**
 * VerificationStatusVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { VerificationStatusVO } from '@domain/value-objects/primitives/verification-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VerificationStatusVO', () => {
  describe('create()', () => {
    it('should create valid statuses', () => {
      for (const s of ['pending', 'verified', 'rejected', 'expired', 'resubmitted']) {
        expect(VerificationStatusVO.create(s).value).toBe(s);
      }
    });

    it('should throw on invalid', () => {
      expect(() => VerificationStatusVO.create('xxx')).toThrow(ValidationError);
    });
  });

  describe('predicates', () => {
    it('isPending()', () => {
      expect(VerificationStatusVO.pending().isPending()).toBe(true);
    });
    it('isVerified()', () => {
      expect(VerificationStatusVO.verified().isVerified()).toBe(true);
    });
    it('isFinal()', () => {
      expect(VerificationStatusVO.verified().isFinal()).toBe(true);
      expect(VerificationStatusVO.pending().isFinal()).toBe(false);
    });
    it('canRetry()', () => {
      expect(VerificationStatusVO.rejected().canRetry()).toBe(true);
      expect(VerificationStatusVO.expired().canRetry()).toBe(true);
      expect(VerificationStatusVO.pending().canRetry()).toBe(false);
    });
  });

  describe('canTransitionTo()', () => {
    it('pending → verified allowed', () => {
      expect(VerificationStatusVO.pending().canTransitionTo('verified')).toBe(true);
    });
    it('verified → anything false', () => {
      expect(VerificationStatusVO.verified().canTransitionTo('pending')).toBe(false);
    });
  });
});
