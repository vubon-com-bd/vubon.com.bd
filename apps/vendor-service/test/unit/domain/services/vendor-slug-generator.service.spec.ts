/**
 * VendorSlugGeneratorService — unit tests
 * @module vendor-service/test/unit/domain/services
 */
import { VendorSlugGeneratorService } from '../../../../src/module/domain/services/vendor-slug-generator.service.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VendorSlugGeneratorService', () => {
  describe('generateUnique()', () => {
    it('returns base slug when not taken', () => {
      const r = VendorSlugGeneratorService.generateUnique('Acme Store', []);
      expect(r.slug.value).toBe('acme-store');
      expect(r.isUnique).toBe(true);
      expect(r.attempts).toBe(1);
    });

    it('appends -2 when base taken', () => {
      const r = VendorSlugGeneratorService.generateUnique('Acme Store', ['acme-store']);
      expect(r.slug.value).toBe('acme-store-2');
      expect(r.isUnique).toBe(true);
    });

    it('appends -3 when -2 also taken', () => {
      const r = VendorSlugGeneratorService.generateUnique('Acme Store', [
        'acme-store',
        'acme-store-2',
      ]);
      expect(r.slug.value).toBe('acme-store-3');
    });

    it('handles Set input', () => {
      const taken = new Set(['acme-store']);
      const r = VendorSlugGeneratorService.generateUnique('Acme Store', taken);
      expect(r.slug.value).toBe('acme-store-2');
    });

    it('throws on empty name', () => {
      expect(() => VendorSlugGeneratorService.generateUnique('', [])).toThrow(ValidationError);
    });

    it('throws on non-string name', () => {
      expect(() =>
        VendorSlugGeneratorService.generateUnique(123 as unknown as string, []),
      ).toThrow(ValidationError);
    });
  });

  describe('ensureUnique()', () => {
    it('delegates to generateUnique', () => {
      const r = VendorSlugGeneratorService.ensureUnique('test', []);
      expect(r.slug.value).toBe('test');
    });
  });

  describe('reserveForBrand()', () => {
    it('returns brand slug variants', () => {
      const slugs = VendorSlugGeneratorService.reserveForBrand('Acme');
      expect(slugs).toContain('acme');
      expect(slugs).toContain('acme-official');
      expect(slugs).toContain('acme-store');
      expect(slugs).toContain('acme-shop');
    });
  });

  describe('suggestFromBusiness()', () => {
    it('removes common business suffixes', () => {
      const vo = VendorSlugGeneratorService.suggestFromBusiness('Acme Ltd');
      expect(vo.value).toBe('acme');
    });

    it('removes multiple suffixes', () => {
      const vo = VendorSlugGeneratorService.suggestFromBusiness('Bright Trading Co Ltd');
      expect(vo.value).toBe('bright');
    });

    it('keeps name when no suffix', () => {
      const vo = VendorSlugGeneratorService.suggestFromBusiness('Acme Store');
      // "Store" is a suffix
      expect(vo.value).toBe('acme');
    });

    it('falls back to original name when all words are stripped', () => {
      const vo = VendorSlugGeneratorService.suggestFromBusiness('Ltd');
      expect(vo.value.length).toBeGreaterThan(0);
    });
  });

  describe('wouldCollide()', () => {
    it('true for names producing same slug', () => {
      expect(VendorSlugGeneratorService.wouldCollide('Acme Store', 'Acme  Store')).toBe(true);
    });

    it('false for different names', () => {
      expect(VendorSlugGeneratorService.wouldCollide('Acme', 'Bright')).toBe(false);
    });

    it('false when one name is invalid', () => {
      expect(VendorSlugGeneratorService.wouldCollide('', 'Acme')).toBe(false);
    });
  });

  describe('isSuspicious()', () => {
    it('true for reserved names', () => {
      expect(VendorSlugGeneratorService.isSuspicious('admin')).toBe(true);
      expect(VendorSlugGeneratorService.isSuspicious('vubon')).toBe(true);
      expect(VendorSlugGeneratorService.isSuspicious('support')).toBe(true);
    });

    it('true for reserved prefix', () => {
      expect(VendorSlugGeneratorService.isSuspicious('admin-shop')).toBe(true);
    });

    it('true for reserved suffix', () => {
      expect(VendorSlugGeneratorService.isSuspicious('shop-admin')).toBe(true);
    });

    it('false for normal slugs', () => {
      expect(VendorSlugGeneratorService.isSuspicious('acme-store')).toBe(false);
    });
  });
});
