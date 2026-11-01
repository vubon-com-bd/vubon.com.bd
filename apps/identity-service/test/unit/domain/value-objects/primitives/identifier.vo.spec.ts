/**
 * IdentifierVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_EMAIL, TEST_PHONE, TEST_USERNAME } from '@fixtures/index';

describe('IdentifierVO', () => {
  describe('email()', () => {
    it('should create valid email', () => {
      const vo = IdentifierVO.email(TEST_EMAIL);
      expect(vo.kind).toBe('email');
      expect(vo.normalized).toBe(TEST_EMAIL.toLowerCase());
      expect(vo.isEmail()).toBe(true);
    });

    it('should normalize case + trim', () => {
      const vo = IdentifierVO.email(` ${TEST_EMAIL.toUpperCase()} `);
      expect(vo.normalized).toBe(TEST_EMAIL.toLowerCase());
    });

    it('should throw on invalid email', () => {
      expect(() => IdentifierVO.email('not-an-email')).toThrow(ValidationError);
    });

    it('should throw on empty', () => {
      expect(() => IdentifierVO.email('')).toThrow(ValidationError);
    });
  });

  describe('phone()', () => {
    it('should create valid BD phone', () => {
      const vo = IdentifierVO.phone(TEST_PHONE);
      expect(vo.kind).toBe('phone');
      expect(vo.isPhone()).toBe(true);
    });

    it('should strip spaces and dashes', () => {
      const vo = IdentifierVO.phone('017-1234-5678');
      expect(vo.normalized).toBe('01712345678');
    });

    it('should throw on invalid phone', () => {
      expect(() => IdentifierVO.phone('123')).toThrow(ValidationError);
    });
  });

  describe('username()', () => {
    it('should create valid username', () => {
      const vo = IdentifierVO.username(TEST_USERNAME);
      expect(vo.kind).toBe('username');
      expect(vo.isUsername()).toBe(true);
    });

    it('should throw on invalid username', () => {
      expect(() => IdentifierVO.username('ab')).toThrow(ValidationError);
    });
  });

  describe('auto()', () => {
    it('should detect email', () => {
      expect(IdentifierVO.auto(TEST_EMAIL).kind).toBe('email');
    });
    it('should detect phone', () => {
      expect(IdentifierVO.auto(TEST_PHONE).kind).toBe('phone');
    });
    it('should fallback to username', () => {
      expect(IdentifierVO.auto(TEST_USERNAME).kind).toBe('username');
    });
    it('should throw on empty', () => {
      expect(() => IdentifierVO.auto('')).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      const vo = IdentifierVO.reconstitute({ kind: 'email', raw: 'x', normalized: 'x' });
      expect(vo.value.kind).toBe('email');
    });
  });
});
