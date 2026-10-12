import { MobileBankingNumberVO } from '../../../../../src/module/domain/value-objects/primitives/mobile-banking-number.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('MobileBankingNumberVO', () => {
  describe('create()', () => {
    it('accepts BD local format', () => {
      expect(MobileBankingNumberVO.create('01712345678').value).toBe('01712345678');
    });

    it('accepts international format', () => {
      expect(MobileBankingNumberVO.create('8801712345678').value).toBe('8801712345678');
    });

    it('strips non-digits', () => {
      expect(MobileBankingNumberVO.create('+880 1712-345678').value).toBe('8801712345678');
    });

    it('throws on invalid format', () => {
      expect(() => MobileBankingNumberVO.create('12345')).toThrow(ValidationError);
    });

    it('throws on non-BD number', () => {
      expect(() => MobileBankingNumberVO.create('1234567890')).toThrow(ValidationError);
    });
  });

  describe('format conversions', () => {
    it('toLocalFormat from international', () => {
      expect(MobileBankingNumberVO.create('8801712345678').toLocalFormat()).toBe('01712345678');
    });

    it('toLocalFormat from local (unchanged)', () => {
      expect(MobileBankingNumberVO.create('01712345678').toLocalFormat()).toBe('01712345678');
    });

    it('toInternationalFormat from local', () => {
      expect(MobileBankingNumberVO.create('01712345678').toInternationalFormat()).toBe('8801712345678');
    });

    it('toInternationalFormat from international (unchanged)', () => {
      expect(MobileBankingNumberVO.create('8801712345678').toInternationalFormat()).toBe('8801712345678');
    });
  });

  describe('masked()', () => {
    it('masks middle digits', () => {
      const masked = MobileBankingNumberVO.create('01712345678').masked();
      expect(masked).toContain('****');
      expect(masked.length).toBeGreaterThan(4);
    });
  });
});
