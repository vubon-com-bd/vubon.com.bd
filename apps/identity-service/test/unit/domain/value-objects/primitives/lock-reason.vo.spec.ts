/**
 * LockReasonVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { LockReasonVO } from '@domain/value-objects/primitives/lock-reason.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('LockReasonVO', () => {
  describe('create()', () => {
    it('should create all valid reasons', () => {
      for (const r of [
        'too_many_attempts',
        'suspicious_activity',
        'manual_admin',
        'policy_violation',
        'security_breach',
      ]) {
        expect(LockReasonVO.create(r).value).toBe(r);
      }
    });

    it('should normalize case', () => {
      expect(LockReasonVO.create(' TOO_MANY_ATTEMPTS ').value).toBe('too_many_attempts');
    });

    it('should throw on empty', () => {
      expect(() => LockReasonVO.create('')).toThrow(ValidationError);
    });

    it('should throw on invalid', () => {
      expect(() => LockReasonVO.create('xxx')).toThrow(ValidationError);
    });
  });

  describe('kind', () => {
    it('should return typed kind', () => {
      expect(LockReasonVO.create('too_many_attempts').kind).toBe('too_many_attempts');
      expect(LockReasonVO.create('manual_admin').kind).toBe('manual_admin');
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(LockReasonVO.reconstitute('anything').value).toBe('anything');
    });
  });
});
