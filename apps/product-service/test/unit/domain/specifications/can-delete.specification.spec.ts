/**
 * CanDeleteSpecification — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanDeleteSpecification } from '../../../../src/module/domain/specifications/can-delete.specification.js';

const PRODUCT_ID = '11111111-1111-4111-8111-111111111111';

function buildProduct(status: string) {
  return {
    id: PRODUCT_ID,
    status: {
      value: status,
      isPublished: () => status === 'published',
      isDeleted: () => status === 'deleted',
    },
    vo: { vendorId: { value: 'v-1' } },
  } as unknown as Parameters<CanDeleteSpecification['isSatisfiedBy']>[0]['product'];
}

describe('CanDeleteSpecification', () => {
  const spec = new CanDeleteSpecification();

  describe('isSatisfiedBy()', () => {
    it('draft → can delete', () => {
      expect(spec.isSatisfiedBy({ product: buildProduct('draft') })).toBe(true);
    });

    it('published → cannot delete without force', () => {
      expect(spec.isSatisfiedBy({ product: buildProduct('published') })).toBe(false);
    });

    it('already deleted → cannot delete again', () => {
      expect(spec.isSatisfiedBy({ product: buildProduct('deleted') })).toBe(false);
    });

    it('force delete allows published', () => {
      expect(
        spec.isSatisfiedBy({
          product: buildProduct('published'),
          ctx: { force: true },
        }),
      ).toBe(true);
    });
  });

  describe('explain()', () => {
    it('returns null for draft', () => {
      expect(spec.explain({ product: buildProduct('draft') })).toBeNull();
    });

    it('explains published rejection', () => {
      const reason = spec.explain({ product: buildProduct('published') });
      expect(reason).toContain('published');
    });
  });

  describe('static factories', () => {
    it('forced()', () => {
      expect(CanDeleteSpecification.forced()).toBeInstanceOf(CanDeleteSpecification);
    });

    it('strict()', () => {
      expect(CanDeleteSpecification.strict()).toBeInstanceOf(CanDeleteSpecification);
    });
  });
});
