/**
 * CardExpiryVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CardExpiryVO } from '@domain/primitives/card-expiry.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CardExpiryVO', () => {
  const REF_DATE = new Date('2025-01-15');

  describe('create()', () => {
    it('creates valid future expiry', () => {
      const vo = CardExpiryVO.create(12, 2030, REF_DATE);
      expect(vo.month).toBe(12);
      expect(vo.year).toBe(2030);
    });
    it('accepts current month (still valid)', () => {
      const vo = CardExpiryVO.create(1, 2025, REF_DATE);
      expect(vo.month).toBe(1);
    });
    it('throws on expired card', () => {
      expect(() => CardExpiryVO.create(12, 2024, REF_DATE)).toThrow(ValidationError);
    });
    it('throws on invalid month (0)', () => {
      expect(() => CardExpiryVO.create(0, 2030, REF_DATE)).toThrow(ValidationError);
    });
    it('throws on invalid month (13)', () => {
      expect(() => CardExpiryVO.create(13, 2030, REF_DATE)).toThrow(ValidationError);
    });
    it('throws on invalid year (1999)', () => {
      expect(() => CardExpiryVO.create(12, 1999, REF_DATE)).toThrow(ValidationError);
    });
    it('throws on invalid year (2101)', () => {
      expect(() => CardExpiryVO.create(12, 2101, REF_DATE)).toThrow(ValidationError);
    });
    it('throws on non-integer month', () => {
      expect(() => CardExpiryVO.create(1.5, 2030, REF_DATE)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = CardExpiryVO.reconstitute(1, 2020);
      expect(vo.month).toBe(1);
      expect(vo.year).toBe(2020);
    });
  });

  describe('isExpired()', () => {
    it('true for past month', () => {
      const vo = CardExpiryVO.reconstitute(12, 2024);
      expect(vo.isExpired(REF_DATE)).toBe(true);
    });
    it('false for current month', () => {
      const vo = CardExpiryVO.reconstitute(1, 2025);
      expect(vo.isExpired(REF_DATE)).toBe(false);
    });
    it('false for future', () => {
      const vo = CardExpiryVO.reconstitute(12, 2030);
      expect(vo.isExpired(REF_DATE)).toBe(false);
    });
  });

  describe('toMMYY()', () => {
    it('formats as MM/YY', () => {
      expect(CardExpiryVO.reconstitute(5, 2030).toMMYY()).toBe('05/30');
      expect(CardExpiryVO.reconstitute(12, 2025).toMMYY()).toBe('12/25');
    });
  });
});
