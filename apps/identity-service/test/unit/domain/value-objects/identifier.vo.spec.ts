/**
 * IdentifierVO — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, jest } from '@jest/globals';
import { IdentifierVO } from '../../../../src/module/domain/value-objects/primitives/identifier.vo.js';

describe('IdentifierVO', () => {
  describe('email()', () => {
    it('creates from valid email', () => {
      const vo = IdentifierVO.email('User@Example.COM');
      expect(vo.kind).toBe('email');
      expect(vo.normalized).toBe('user@example.com');
      expect(vo.isEmail()).toBe(true);
    });

    it('throws for invalid email', () => {
      expect(() => IdentifierVO.email('invalid')).toThrow();
    });

    it('throws for empty email', () => {
      expect(() => IdentifierVO.email('')).toThrow();
    });
  });

  describe('phone()', () => {
    it('creates from BD phone', () => {
      const vo = IdentifierVO.phone('+8801712345678');
      expect(vo.kind).toBe('phone');
      expect(vo.isPhone()).toBe(true);
    });

    it('strips spaces and dashes', () => {
      const vo = IdentifierVO.phone('017-1234-5678');
      expect(vo.normalized).toBe('01712345678');
    });

    it('throws for invalid phone', () => {
      expect(() => IdentifierVO.phone('abc')).toThrow();
    });
  });

  describe('username()', () => {
    it('creates from valid username', () => {
      const vo = IdentifierVO.username('John_Doe');
      expect(vo.kind).toBe('username');
      expect(vo.normalized).toBe('john_doe');
    });

    it('throws for invalid username (too short)', () => {
      expect(() => IdentifierVO.username('ab')).toThrow();
    });
  });

  describe('auto()', () => {
    it('detects email', () => {
      expect(IdentifierVO.auto('user@example.com').kind).toBe('email');
    });

    it('detects phone', () => {
      expect(IdentifierVO.auto('+8801712345678').kind).toBe('phone');
    });

    it('falls back to username', () => {
      expect(IdentifierVO.auto('john_doe').kind).toBe('username');
    });

    it('throws for empty', () => {
      expect(() => IdentifierVO.auto('')).toThrow();
    });
  });
});
