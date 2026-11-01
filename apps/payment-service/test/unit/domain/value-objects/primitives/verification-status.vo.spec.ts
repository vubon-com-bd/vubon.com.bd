/**
 * VerificationStatusVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { VerificationStatusVO } from '@domain/primitives/verification-status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VerificationStatusVO', () => {
  describe('create()', () => {
    it('accepts all statuses', () => {
      for (const s of ['pending', 'in_progress', 'verified', 'failed', 'expired']) {
        expect(VerificationStatusVO.create(s).value).toBe(s);
      }
    });
    it('normalizes case', () => {
      expect(VerificationStatusVO.create('PENDING').value).toBe('pending');
    });
    it('throws on invalid', () => {
      expect(() => VerificationStatusVO.create('unknown')).toThrow(ValidationError);
    });
  });

  describe('factory helpers', () => {
    it('pending()', () => expect(VerificationStatusVO.pending().value).toBe('pending'));
    it('verified()', () => expect(VerificationStatusVO.verified().value).toBe('verified'));
    it('failed()', () => expect(VerificationStatusVO.failed().value).toBe('failed'));
    it('expired()', () => expect(VerificationStatusVO.expired().value).toBe('expired'));
  });

  describe('predicates', () => {
    it('isPending', () => expect(VerificationStatusVO.pending().isPending()).toBe(true));
    it('isInProgress', () => expect(VerificationStatusVO.create('in_progress').isInProgress()).toBe(true));
    it('isVerified', () => expect(VerificationStatusVO.verified().isVerified()).toBe(true));
    it('isFailed', () => expect(VerificationStatusVO.failed().isFailed()).toBe(true));
    it('isExpired', () => expect(VerificationStatusVO.expired().isExpired()).toBe(true));
  });

  describe('isFinal', () => {
    it('true for verified/expired', () => {
      expect(VerificationStatusVO.verified().isFinal()).toBe(true);
      expect(VerificationStatusVO.expired().isFinal()).toBe(true);
    });
    it('false for pending/in_progress/failed', () => {
      expect(VerificationStatusVO.pending().isFinal()).toBe(false);
      expect(VerificationStatusVO.create('in_progress').isFinal()).toBe(false);
      expect(VerificationStatusVO.failed().isFinal()).toBe(false);
    });
  });

  describe('isSuccess', () => {
    it('true only for verified', () => {
      expect(VerificationStatusVO.verified().isSuccess()).toBe(true);
      expect(VerificationStatusVO.failed().isSuccess()).toBe(false);
    });
  });

  describe('canTransitionTo()', () => {
    it('pending → in_progress ok', () => {
      expect(VerificationStatusVO.pending().canTransitionTo('in_progress')).toBe(true);
    });
    it('pending → verified ok', () => {
      expect(VerificationStatusVO.pending().canTransitionTo('verified')).toBe(true);
    });
    it('in_progress → verified ok', () => {
      expect(VerificationStatusVO.create('in_progress').canTransitionTo('verified')).toBe(true);
    });
    it('in_progress → failed ok', () => {
      expect(VerificationStatusVO.create('in_progress').canTransitionTo('failed')).toBe(true);
    });
    it('failed → pending ok (retry)', () => {
      expect(VerificationStatusVO.failed().canTransitionTo('pending')).toBe(true);
    });
    it('verified → anything NOT ok', () => {
      expect(VerificationStatusVO.verified().canTransitionTo('pending')).toBe(false);
    });
    it('expired → anything NOT ok', () => {
      expect(VerificationStatusVO.expired().canTransitionTo('pending')).toBe(false);
    });
  });
});
