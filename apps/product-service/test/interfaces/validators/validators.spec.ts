/**
 * Validators — unit tests
 */
import { jest } from '@jest/globals';
import { ProductValidator } from '../../../src/module/interfaces/validators/product.validator.js';
import { VariantValidator } from '../../../src/module/interfaces/validators/variant.validator.js';
import { ReviewValidator } from '../../../src/module/interfaces/validators/review.validator.js';
import { ProductSlugConflictError, ProductSkuConflictError } from '../../../src/module/application/errors/product.errors.js';
import { VariantSkuConflictError } from '../../../src/module/application/errors/variant.errors.js';
import { createMockProductRepository, createMockVariantRepository, type MockedProductRepository, type MockedVariantRepository } from '../../mocks/repositories.js';
import { buildProduct, buildVariant } from '../../fixtures.js';
import { PRODUCT_ID, VARIANT_ID } from '../../helpers.js';

describe('ProductValidator', () => {
  let repo: MockedProductRepository;
  let validator: ProductValidator;

  beforeEach(() => {
    repo = createMockProductRepository();
    validator = new ProductValidator(repo);
  });

  describe('assertUniqueSlug()', () => {
    it('passes when slug unique', async () => {
      repo.findBySlug.mockResolvedValueOnce(null);
      await expect(validator.assertUniqueSlug('new-slug')).resolves.toBeUndefined();
    });

    it('throws when slug exists', async () => {
      repo.findBySlug.mockResolvedValueOnce(buildProduct());
      await expect(validator.assertUniqueSlug('test-product')).rejects.toThrow(ProductSlugConflictError);
    });

    it('passes when existing slug belongs to self (ignoreId)', async () => {
      repo.findBySlug.mockResolvedValueOnce(buildProduct());
      await expect(validator.assertUniqueSlug('test-product', PRODUCT_ID)).resolves.toBeUndefined();
    });
  });

  describe('assertUniqueSku()', () => {
    it('passes when SKU unique', async () => {
      repo.findBySku.mockResolvedValueOnce(null);
      await expect(validator.assertUniqueSku('NEW-001')).resolves.toBeUndefined();
    });

    it('throws when SKU exists', async () => {
      repo.findBySku.mockResolvedValueOnce(buildProduct());
      await expect(validator.assertUniqueSku('TEST-001')).rejects.toThrow(ProductSkuConflictError);
    });

    it('passes for ignoreId match', async () => {
      repo.findBySku.mockResolvedValueOnce(buildProduct());
      await expect(validator.assertUniqueSku('TEST-001', PRODUCT_ID)).resolves.toBeUndefined();
    });
  });

  describe('assertPriceRange()', () => {
    it('passes valid range', () => {
      expect(() => validator.assertPriceRange(100, 1000)).not.toThrow();
    });

    it('throws for negative', () => {
      expect(() => validator.assertPriceRange(-1, 100)).toThrow();
    });

    it('throws when min > max', () => {
      expect(() => validator.assertPriceRange(1000, 100)).toThrow();
    });
  });
});

describe('VariantValidator', () => {
  let repo: MockedVariantRepository;
  let validator: VariantValidator;

  beforeEach(() => {
    repo = createMockVariantRepository();
    validator = new VariantValidator(repo);
  });

  it('passes when SKU unique', async () => {
    repo.findBySku.mockResolvedValueOnce(null);
    await expect(validator.assertUniqueSku('NEW-V-001')).resolves.toBeUndefined();
  });

  it('throws when SKU exists', async () => {
    repo.findBySku.mockResolvedValueOnce(buildVariant());
    await expect(validator.assertUniqueSku('TEST-RED-L')).rejects.toThrow(VariantSkuConflictError);
  });

  it('passes for ignoreId', async () => {
    repo.findBySku.mockResolvedValueOnce(buildVariant());
    await expect(validator.assertUniqueSku('TEST-RED-L', VARIANT_ID)).resolves.toBeUndefined();
  });
});

describe('ReviewValidator', () => {
  let validator: ReviewValidator;

  beforeEach(() => {
    validator = new ReviewValidator();
  });

  describe('assertRating()', () => {
    it('passes 1-5', () => {
      expect(() => validator.assertRating(1)).not.toThrow();
      expect(() => validator.assertRating(5)).not.toThrow();
    });

    it('throws for 0', () => {
      expect(() => validator.assertRating(0)).toThrow();
    });

    it('throws for 6', () => {
      expect(() => validator.assertRating(6)).toThrow();
    });

    it('throws for non-integer', () => {
      expect(() => validator.assertRating(3.5)).toThrow();
    });
  });

  describe('assertComment()', () => {
    it('passes valid comment', () => {
      expect(() => validator.assertComment('A valid comment with length')).not.toThrow();
    });

    it('passes undefined', () => {
      expect(() => validator.assertComment(undefined)).not.toThrow();
    });

    it('throws for too short', () => {
      expect(() => validator.assertComment('short')).toThrow();
    });

    it('throws for too long', () => {
      expect(() => validator.assertComment('A'.repeat(2001))).toThrow();
    });
  });

  describe('assertImagesCount()', () => {
    it('passes when under limit', () => {
      expect(() => validator.assertImagesCount(['a', 'b'])).not.toThrow();
    });

    it('passes undefined', () => {
      expect(() => validator.assertImagesCount(undefined)).not.toThrow();
    });

    it('throws when over limit', () => {
      const imgs = Array.from({ length: 6 }, (_, i) => `img-${i}`);
      expect(() => validator.assertImagesCount(imgs)).toThrow();
    });
  });
});
