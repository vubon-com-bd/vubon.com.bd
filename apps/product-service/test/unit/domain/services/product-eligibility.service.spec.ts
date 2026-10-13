/**
 * ProductEligibilityService — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductEligibilityService } from '../../../../src/module/domain/services/product-eligibility.service.js';

const PRODUCT_ID = '11111111-1111-4111-8111-111111111111';
const CATEGORY_ID = '22222222-2222-4222-8222-222222222222';
const NOW = '2026-01-01T00:00:00.000Z';

function buildProduct(status: string, opts: { totalStock?: number; images?: string[] } = {}) {
  const totalStock = opts.totalStock ?? 10;
  const images = opts.images ?? ['https://example.com/img.jpg'];
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
      isEditable: () => !['deleted', 'archived'].includes(status),
    },
    vo: {
      totalStock,
      hasImages: () => images.length > 0,
      images,
      name: { value: 'Test' },
      categoryId: { value: CATEGORY_ID },
      thumbnailUrl: 'https://example.com/thumb.jpg',
    },
  } as unknown as Parameters<typeof ProductEligibilityService.canPublish>[0];
}

describe('ProductEligibilityService', () => {
  describe('canPublish()', () => {
    it('approved product with stock + images is publishable', () => {
      const p = buildProduct('approved');
      expect(ProductEligibilityService.canPublish(p).eligible).toBe(true);
    });

    it('draft product is not publishable', () => {
      const p = buildProduct('draft');
      const r = ProductEligibilityService.canPublish(p);
      expect(r.eligible).toBe(false);
      expect(r.reasons.length).toBeGreaterThan(0);
    });

    it('zero stock blocks publish', () => {
      const p = buildProduct('approved', { totalStock: 0 });
      const r = ProductEligibilityService.canPublish(p);
      expect(r.eligible).toBe(false);
    });

    it('no images blocks publish', () => {
      const p = buildProduct('approved', { images: [] });
      const r = ProductEligibilityService.canPublish(p);
      expect(r.eligible).toBe(false);
    });
  });

  describe('canDelete()', () => {
    it('draft can be deleted', () => {
      const p = buildProduct('draft');
      expect(ProductEligibilityService.canDelete(p).eligible).toBe(true);
    });

    it('published cannot be deleted', () => {
      const p = buildProduct('published');
      expect(ProductEligibilityService.canDelete(p).eligible).toBe(false);
    });

    it('already deleted → not eligible', () => {
      const p = buildProduct('deleted');
      expect(ProductEligibilityService.canDelete(p).eligible).toBe(false);
    });
  });

  describe('canFeature()', () => {
    it('published with stock + thumbnail is featureable', () => {
      const p = buildProduct('published');
      expect(ProductEligibilityService.canFeature(p).eligible).toBe(true);
    });

    it('draft cannot be featured', () => {
      const p = buildProduct('draft');
      expect(ProductEligibilityService.canFeature(p).eligible).toBe(false);
    });
  });

  describe('canEdit()', () => {
    it('draft can be edited', () => {
      const p = buildProduct('draft');
      expect(ProductEligibilityService.canEdit(p).eligible).toBe(true);
    });

    it('deleted cannot be edited', () => {
      const p = buildProduct('deleted');
      expect(ProductEligibilityService.canEdit(p).eligible).toBe(false);
    });
  });
});
