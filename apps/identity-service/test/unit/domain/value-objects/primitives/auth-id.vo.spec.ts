/**
 * AuthIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/index';

describe('AuthIdVO', () => {
  describe('create()', () => {
    it('should create a valid AuthIdVO from UUID', () => {
      const vo = AuthIdVO.create(TEST_IDS.AUTH_ID);
      expect(vo.value).toBe(TEST_IDS.AUTH_ID);
    });

    it('should trim whitespace', () => {
      const vo = AuthIdVO.create(`  ${TEST_IDS.AUTH_ID}  `);
      expect(vo.value).toBe(TEST_IDS.AUTH_ID);
    });

    it('should throw on empty string', () => {
      expect(() => AuthIdVO.create('')).toThrow(ValidationError);
    });

    it('should throw on invalid UUID', () => {
      expect(() => AuthIdVO.create('not-a-uuid')).toThrow(ValidationError);
      expect(() => AuthIdVO.create('not-a-uuid')).toThrow(/valid UUID/);
    });

    it('should throw on non-string input', () => {
      expect(() => AuthIdVO.create(null as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      const vo = AuthIdVO.reconstitute('anything-goes');
      expect(vo.value).toBe('anything-goes');
    });
  });

  describe('equality', () => {
    it('should be equal for same value', () => {
      const a = AuthIdVO.create(TEST_IDS.AUTH_ID);
      const b = AuthIdVO.create(TEST_IDS.AUTH_ID);
      expect(a.equals(b)).toBe(true);
    });

    it('should not be equal for different values', () => {
      const a = AuthIdVO.create(TEST_IDS.AUTH_ID);
      const b = AuthIdVO.create(TEST_IDS.AUTH_ID_2);
      expect(a.equals(b)).toBe(false);
    });
  });

  describe('toString()', () => {
    it('should return the value', () => {
      const vo = AuthIdVO.create(TEST_IDS.AUTH_ID);
      expect(vo.toString()).toBe(TEST_IDS.AUTH_ID);
    });
  });
});
