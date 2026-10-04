import { jest } from '@jest/globals';
void jest;

import { CartSessionIdVO } from '../../../../../src/module/domain/value-objects/primitives/session-id.vo.js';

describe('CartSessionIdVO', () => {
  const VALID = 'session-abc-12345';
  const SHORT = 'abc';
  const LONG = 'x'.repeat(129);

  describe('create()', () => {
    it('creates VO from valid string', () => {
      expect(CartSessionIdVO.create(VALID).value).toBe(VALID);
    });
    it('trims whitespace', () => {
      expect(CartSessionIdVO.create(`  ${VALID}  `).value).toBe(VALID);
    });
    it('accepts exactly min length (8)', () => {
      expect(CartSessionIdVO.create('12345678').value).toBe('12345678');
    });
    it('accepts exactly max length (128)', () => {
      const max = 'x'.repeat(128);
      expect(CartSessionIdVO.create(max).value).toBe(max);
    });
    it('throws on empty string', () => {
      expect(() => CartSessionIdVO.create('')).toThrow();
    });
    it('throws below min length', () => {
      expect(() => CartSessionIdVO.create(SHORT)).toThrow();
    });
    it('throws above max length', () => {
      expect(() => CartSessionIdVO.create(LONG)).toThrow();
    });
    it('throws on null', () => {
      expect(() => CartSessionIdVO.create(null as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(CartSessionIdVO.reconstitute('x').value).toBe('x');
    });
  });

  describe('equals()', () => {
    it('true for same', () => {
      expect(CartSessionIdVO.create(VALID).equals(CartSessionIdVO.create(VALID))).toBe(true);
    });
    it('false for different', () => {
      expect(CartSessionIdVO.create(VALID).equals(CartSessionIdVO.create('other-session-1'))).toBe(false);
    });
  });
});
