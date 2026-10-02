/**
 * All Specifications — unit tests
 */
import { CanPublishProductSpecification } from '../../../src/module/domain/specifications/can-publish-product.specification.js';
import { CanArchiveProductSpecification } from '../../../src/module/domain/specifications/can-archive-product.specification.js';
import { CanAddVariantSpecification } from '../../../src/module/domain/specifications/can-add-variant.specification.js';
import { CanAddMediaSpecification } from '../../../src/module/domain/specifications/can-add-media.specification.js';
import { CanDeleteCategorySpecification } from '../../../src/module/domain/specifications/can-delete-category.specification.js';
import { CanDeleteBrandSpecification } from '../../../src/module/domain/specifications/can-delete-brand.specification.js';
import { CanEditReviewSpecification } from '../../../src/module/domain/specifications/can-edit-review.specification.js';
import { CanTransitionStatusSpecification } from '../../../src/module/domain/specifications/can-transition-status.specification.js';
import { buildProduct, buildBrand, buildCategory, buildReview } from '../../fixtures.js';
import { PRODUCT_STATUS, VARIANT, REVIEW_STATUS } from '@vubon/shared-constants/business/product';
import { ProductStatusVO } from '../../../src/module/domain/value-objects/primitives/product-status.vo.js';
import { ProductDescriptionVO } from '../../../src/module/domain/value-objects/primitives/product-description.vo.js';
import { PriceVO } from '../../../src/module/domain/value-objects/primitives/price.vo.js';
import { DEFAULT_CURRENCY, NOW } from '../../helpers.js';

describe('CanPublishProductSpecification', () => {
  const spec = new CanPublishProductSpecification();

  it('satisfied for well-formed product', () => {
    expect(spec.isSatisfiedBy(buildProduct())).toBe(true);
  });

  it('not satisfied when description empty', () => {
    const product = buildProduct({ description: ProductDescriptionVO.empty() });
    expect(spec.isSatisfiedBy(product)).toBe(false);
    expect(spec.check(product).reason).toBe('description is required');
  });

  it('not satisfied when price zero', () => {
    const product = buildProduct({ price: PriceVO.create(0, DEFAULT_CURRENCY) });
    expect(spec.isSatisfiedBy(product)).toBe(false);
  });

  it('not satisfied when already published', () => {
    const product = buildProduct({ status: ProductStatusVO.create(PRODUCT_STATUS.PUBLISHED) });
    expect(spec.isSatisfiedBy(product)).toBe(false);
    expect(spec.check(product).reason).toBe('product is already published');
  });

  it('not satisfied when no images', () => {
    const product = buildProduct({ images: [], thumbnailUrl: undefined });
    expect(spec.isSatisfiedBy(product)).toBe(false);
  });
});

describe('CanArchiveProductSpecification', () => {
  const spec = new CanArchiveProductSpecification();

  it('satisfied for draft product', () => {
    expect(spec.isSatisfiedBy(buildProduct())).toBe(true);
  });

  it('not satisfied when already archived', () => {
    const product = buildProduct({ status: ProductStatusVO.create(PRODUCT_STATUS.ARCHIVED) });
    expect(spec.isSatisfiedBy(product)).toBe(false);
    expect(spec.reason(product)).toBe('already archived');
  });

  it('not satisfied when discontinued', () => {
    const product = buildProduct({ status: ProductStatusVO.create(PRODUCT_STATUS.DISCONTINUED) });
    expect(spec.isSatisfiedBy(product)).toBe(false);
  });
});

describe('CanAddVariantSpecification', () => {
  const spec = new CanAddVariantSpecification();

  it('satisfied under variant limit', () => {
    expect(spec.isSatisfiedBy(buildProduct())).toBe(true);
  });

  it('not satisfied at max limit', () => {
    const ids = Array.from({ length: VARIANT.MAX_VARIANTS_PER_PRODUCT }, (_, i) => `v-${i}`);
    const product = buildProduct({ variantIds: ids });
    expect(spec.isSatisfiedBy(product)).toBe(false);
  });

  it('remaining returns correct count', () => {
    expect(spec.remaining(buildProduct())).toBe(VARIANT.MAX_VARIANTS_PER_PRODUCT);
  });
});

describe('CanAddMediaSpecification', () => {
  const spec = new CanAddMediaSpecification();

  it('satisfied under image limit', () => {
    expect(spec.isSatisfiedBy(buildProduct())).toBe(true);
  });

  it('not satisfied at max images (20)', () => {
    const imgs = Array.from({ length: 20 }, (_, i) => `https://x.com/${i}.jpg`);
    const product = buildProduct({ images: imgs });
    expect(spec.isSatisfiedBy(product)).toBe(false);
  });

  it('remaining correct', () => {
    expect(spec.remaining(buildProduct())).toBe(19);
  });
});

describe('CanDeleteCategorySpecification', () => {
  const spec = new CanDeleteCategorySpecification();

  it('satisfied for leaf with no products', () => {
    expect(spec.isSatisfiedBy(buildCategory())).toBe(true);
  });

  it('not satisfied with children', () => {
    const category = buildCategory({ hasChildren: true });
    expect(spec.isSatisfiedBy(category)).toBe(false);
    expect(spec.reason(category)).toContain('children');
  });

  it('not satisfied with products', () => {
    const category = buildCategory({ productCount: 5 });
    expect(spec.isSatisfiedBy(category)).toBe(false);
    expect(spec.reason(category)).toContain('products');
  });
});

describe('CanDeleteBrandSpecification', () => {
  const spec = new CanDeleteBrandSpecification();

  it('satisfied with zero products', () => {
    expect(spec.isSatisfiedBy(buildBrand())).toBe(true);
  });

  it('not satisfied with products', () => {
    const brand = buildBrand({ productCount: 3 });
    expect(spec.isSatisfiedBy(brand)).toBe(false);
    expect(spec.reason(brand)).toContain('3 products');
  });
});

describe('CanEditReviewSpecification', () => {
  it('satisfied for recent APPROVED review', () => {
    const spec = new CanEditReviewSpecification(NOW);
    const review = buildReview({ status: REVIEW_STATUS.APPROVED, createdAt: NOW });
    expect(spec.isSatisfiedBy(review)).toBe(true);
  });

  it('not satisfied after window expired', () => {
    const later = new Date(new Date(NOW).getTime() + 48 * 3600 * 1000).toISOString();
    const spec = new CanEditReviewSpecification(later);
    const review = buildReview({ status: REVIEW_STATUS.APPROVED, createdAt: NOW });
    expect(spec.isSatisfiedBy(review)).toBe(false);
  });

  it('not satisfied for REJECTED status', () => {
    const spec = new CanEditReviewSpecification(NOW);
    const review = buildReview({ status: REVIEW_STATUS.REJECTED, createdAt: NOW });
    expect(spec.isSatisfiedBy(review)).toBe(false);
  });
});

describe('CanTransitionStatusSpecification', () => {
  it('satisfied for valid transition (DRAFT → PUBLISHED)', () => {
    const spec = new CanTransitionStatusSpecification(PRODUCT_STATUS.PUBLISHED);
    expect(spec.isSatisfiedBy(buildProduct())).toBe(true);
  });

  it('not satisfied for invalid transition', () => {
    const spec = new CanTransitionStatusSpecification('invalid_status');
    expect(spec.isSatisfiedBy(buildProduct())).toBe(false);
  });
});
