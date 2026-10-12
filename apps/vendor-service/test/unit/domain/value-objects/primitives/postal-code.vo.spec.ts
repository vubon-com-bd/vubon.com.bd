import { PostalCodeVO } from '../../../../../src/module/domain/value-objects/primitives/postal-code.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('PostalCodeVO', () => {
  describe('create()', () => {
    it('accepts 4-digit code', () => {
      expect(PostalCodeVO.create('1200').value).toBe('1200');
    });

    it('trims whitespace', () => {
      expect(PostalCodeVO.create('  1200  ').value).toBe('1200');
    });

    it('throws on 3 digits', () => {
      expect(() => PostalCodeVO.create('120')).toThrow(ValidationError);
    });

    it('throws on 5 digits', () => {
      expect(() => PostalCodeVO.create('12000')).toThrow(ValidationError);
    });

    it('throws on letters', () => {
      expect(() => PostalCodeVO.create('ABCD')).toThrow(ValidationError);
    });

    it('throws on empty', () => {
      expect(() => PostalCodeVO.create('')).toThrow(ValidationError);
    });
  });

  describe('isPlausibleBD()', () => {
    it('true for plausible range', () => {
      expect(PostalCodeVO.create('1200').isPlausibleBD()).toBe(true);
    });

    it('false for implausible', () => {
      expect(PostalCodeVO.create('0001').isPlausibleBD()).toBe(false);
    });
  });
});
