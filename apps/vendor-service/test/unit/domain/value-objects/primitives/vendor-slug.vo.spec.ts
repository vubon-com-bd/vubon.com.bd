import { VendorSlugVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VendorSlugVO', () => {
  describe('create()', () => {
    it('creates valid slug', () => {
      expect(VendorSlugVO.create('acme-store').value).toBe('acme-store');
    });

    it('lowercases input', () => {
      expect(VendorSlugVO.create('ACME-Store').value).toBe('acme-store');
    });

    it('trims whitespace', () => {
      expect(VendorSlugVO.create('  acme  ').value).toBe('acme');
    });

    it('throws on spaces', () => {
      expect(() => VendorSlugVO.create('acme store')).toThrow(ValidationError);
    });

    it('throws on underscores', () => {
      expect(() => VendorSlugVO.create('acme_store')).toThrow(ValidationError);
    });

    it('throws on leading hyphen', () => {
      expect(() => VendorSlugVO.create('-acme')).toThrow(ValidationError);
    });

    it('throws on too short', () => {
      expect(() => VendorSlugVO.create('a')).toThrow(ValidationError);
    });

    it('throws on too long', () => {
      expect(() => VendorSlugVO.create('a'.repeat(200))).toThrow(ValidationError);
    });
  });

  describe('fromName()', () => {
    it('slugifies simple name', () => {
      expect(VendorSlugVO.fromName('Acme Store').value).toBe('acme-store');
    });

    it('removes special characters', () => {
      expect(VendorSlugVO.fromName('Acme & Co.').value).toBe('acme-co');
    });

    it('collapses multiple hyphens', () => {
      expect(VendorSlugVO.fromName('Acme---Store').value).toBe('acme-store');
    });

    it('strips accents', () => {
      expect(VendorSlugVO.fromName('Café Store').value).toBe('cafe-store');
    });
  });

  describe('reconstitute()', () => {
    it('creates without validation', () => {
      expect(VendorSlugVO.reconstitute('anything').value).toBe('anything');
    });
  });
});
