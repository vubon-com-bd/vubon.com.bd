/**
 * CanPublishSpecification — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanPublishSpecification } from '../../../../src/module/domain/specifications/can-publish.specification.js';

const PRODUCT_ID = '11111111-1111-4111-8111-111111111111';
const CATEGORY_ID = '22222222-2222-4222-8222-222222222222';

function buildProduct(status: string, opts: {
  totalStock?: number;
  images?: string[];
  name?: string;
} = {}) {
  const totalStock = opts.totalStock ?? 10;
  const images = opts.images ?? ['https://example.com/img.jpg'];
  const name = opts.name ?? 'Test';
  return {
    id: PRODUCT_ID,
    status: {
      value: status,
      isDraft: () => status === 'draft',
      isPending: () => status === 'pending',
      isApproved: () => status === 'approved',
      isPublished: () => status === 'published',
      isRejected: () => status === 'rejected',
      isOutOfStock: () => status === 'out_of_stock',
      isArchived: () => status === 'archived',
      isDeleted: () => status === 'deleted',
    },
    vo: {
      totalStock,
      hasImages: () => images.length > 0,
      name: { value: name },
      categoryId: { value: CATEGORY_ID },
    },
  } as unknown as Parameters<CanPublishSpecification['isSatisfiedBy']>[0]['product'];
}

describe('CanPublishSpecification', () => {
  const spec = new CanPublishSpecification();

  describe('isSatisfiedBy()', () => {
    it('approved product with stock + images → satisfied', () => {
      expect(spec.isSatisfiedBy({ product: buildProduct('approved') })).toBe(true);
    });

    it('draft product → not satisfied', () => {
      expect(spec.isSatisfiedBy({ product: buildProduct('draft') })).toBe(false);
    });

    it('zero stock → not satisfied', () => {
      expect(
        spec.isSatisfiedBy({ product: buildProduct('approved', { totalStock: 0 }) }),
      ).toBe(false);
    });

    it('no images → not satisfied', () => {
      expect(
        spec.isSatisfiedBy({ product: buildProduct('approved', { images: [] }) }),
      ).toBe(false);
    });
  });

  describe('explain()', () => {
    it('returns null when satisfied', () => {
      expect(spec.explain({ product: buildProduct('approved') })).toBeNull();
    });

    it('explains draft rejection', () => {
      const reason = spec.explain({ product: buildProduct('draft') });
      expect(reason).toBeTruthy();
      expect(typeof reason).toBe('string');
    });

    it('explains zero stock', () => {
      const reason = spec.explain({
        product: buildProduct('approved', { totalStock: 0 }),
      });
      expect(reason).toContain('stock');
    });

    it('explains missing images', () => {
      const reason = spec.explain({
        product: buildProduct('approved', { images: [] }),
      });
      expect(reason).toContain('image');
    });
  });

  describe('static factories', () => {
    it('strict()', () => {
      expect(CanPublishSpecification.strict()).toBeInstanceOf(CanPublishSpecification);
    });
  });
});
