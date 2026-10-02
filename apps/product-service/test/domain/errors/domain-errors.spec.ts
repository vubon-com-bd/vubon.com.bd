/**
 * Domain Errors — comprehensive tests
 */
import {
  ProductNotFoundError,
  ProductSlugExistsError,
  ProductSkuExistsError,
  InvalidProductStatusError,
  InvalidProductTypeError,
  ProductCannotBePublishedError,
  ProductAlreadyPublishedError,
} from '../../../src/module/domain/errors/product.errors.js';
import {
  VariantNotFoundError,
  VariantSkuExistsError,
  VariantLimitExceededError,
  InvalidVariantStatusError,
  VariantOptionRequiredError,
} from '../../../src/module/domain/errors/variant.errors.js';
import {
  InventoryNotFoundError,
  InsufficientStockError,
  InvalidQuantityError,
  StockLimitExceededError,
} from '../../../src/module/domain/errors/inventory.errors.js';
import {
  PricingNotFoundError,
  InvalidPriceError,
  PricingRuleConflictError,
  DiscountExceededError,
} from '../../../src/module/domain/errors/pricing.errors.js';
import {
  ReviewNotFoundError,
  ReviewAlreadySubmittedError,
  ReviewEditWindowExpiredError,
  InvalidRatingError,
} from '../../../src/module/domain/errors/review.errors.js';
import {
  MediaNotFoundError,
  MediaLimitExceededError,
  InvalidMediaTypeError,
  MediaSizeExceededError,
} from '../../../src/module/domain/errors/media.errors.js';
import {
  BrandNotFoundError,
  BrandSlugExistsError,
  InvalidBrandStatusError,
} from '../../../src/module/domain/errors/brand.errors.js';
import {
  CategoryNotFoundError,
  CategorySlugExistsError,
  InvalidCategoryStatusError,
  CategoryDepthExceededError,
  CategoryHasChildrenError,
} from '../../../src/module/domain/errors/category.errors.js';
import { DomainError } from '@vubon/shared-kernel/domain/errors';

describe('Product errors', () => {
  it('ProductNotFoundError has code + httpStatus', () => {
    const err = new ProductNotFoundError('prod-1');
    expect(err).toBeInstanceOf(DomainError);
    expect(err.httpStatus).toBe(404);
    expect(err.message).toContain('prod-1');
  });

  it('ProductSlugExistsError is conflict', () => {
    const err = new ProductSlugExistsError('test-slug');
    expect(err.httpStatus).toBe(409);
    expect(err.message).toContain('test-slug');
  });

  it('ProductSkuExistsError is conflict', () => {
    const err = new ProductSkuExistsError('SKU-1');
    expect(err.httpStatus).toBe(409);
  });

  it('InvalidProductStatusError is validation', () => {
    const err = new InvalidProductStatusError('bad', ['draft', 'published']);
    expect(err.httpStatus).toBe(422);
    expect(err.message).toContain('bad');
  });

  it('InvalidProductTypeError is validation', () => {
    const err = new InvalidProductTypeError('bad', ['physical']);
    expect(err.httpStatus).toBe(422);
  });

  it('ProductCannotBePublishedError is business rule', () => {
    const err = new ProductCannotBePublishedError('prod-1', 'no description');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('no description');
  });

  it('ProductAlreadyPublishedError is business rule', () => {
    const err = new ProductAlreadyPublishedError('prod-1');
    expect(err.httpStatus).toBe(400);
  });
});

describe('Variant errors', () => {
  it('VariantNotFoundError', () => {
    expect(new VariantNotFoundError('v-1').httpStatus).toBe(404);
  });

  it('VariantSkuExistsError', () => {
    expect(new VariantSkuExistsError('SKU').httpStatus).toBe(409);
  });

  it('VariantLimitExceededError', () => {
    const err = new VariantLimitExceededError(101, 100);
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('101/100');
  });

  it('InvalidVariantStatusError', () => {
    expect(new InvalidVariantStatusError('bad', ['active']).httpStatus).toBe(422);
  });

  it('VariantOptionRequiredError', () => {
    expect(new VariantOptionRequiredError('v-1').httpStatus).toBe(422);
  });
});

describe('Inventory errors', () => {
  it('InventoryNotFoundError', () => {
    expect(new InventoryNotFoundError('inv-1').httpStatus).toBe(404);
  });

  it('InsufficientStockError', () => {
    const err = new InsufficientStockError(5, 10);
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('5');
    expect(err.message).toContain('10');
  });

  it('InvalidQuantityError', () => {
    expect(new InvalidQuantityError(-1, 'negative').httpStatus).toBe(422);
  });

  it('StockLimitExceededError', () => {
    expect(new StockLimitExceededError(200, 100).httpStatus).toBe(400);
  });
});

describe('Pricing errors', () => {
  it('PricingNotFoundError', () => {
    expect(new PricingNotFoundError('prcg-1').httpStatus).toBe(404);
  });

  it('InvalidPriceError', () => {
    expect(new InvalidPriceError(-100, 'negative').httpStatus).toBe(422);
  });

  it('PricingRuleConflictError', () => {
    expect(new PricingRuleConflictError('rule-1', 'duplicate').httpStatus).toBe(400);
  });

  it('DiscountExceededError', () => {
    expect(new DiscountExceededError(95, 90).httpStatus).toBe(400);
  });
});

describe('Review errors', () => {
  it('ReviewNotFoundError', () => {
    expect(new ReviewNotFoundError('rev-1').httpStatus).toBe(404);
  });

  it('ReviewAlreadySubmittedError', () => {
    expect(new ReviewAlreadySubmittedError('prod-1', 'user-1').httpStatus).toBe(409);
  });

  it('ReviewEditWindowExpiredError', () => {
    const err = new ReviewEditWindowExpiredError('rev-1', 24);
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('24');
  });

  it('InvalidRatingError', () => {
    expect(new InvalidRatingError(6, 1, 5).httpStatus).toBe(400);
  });
});

describe('Media errors', () => {
  it('MediaNotFoundError', () => {
    expect(new MediaNotFoundError('m-1').httpStatus).toBe(404);
  });

  it('MediaLimitExceededError', () => {
    expect(new MediaLimitExceededError(21, 20).httpStatus).toBe(400);
  });

  it('InvalidMediaTypeError', () => {
    expect(new InvalidMediaTypeError('audio', ['image']).httpStatus).toBe(422);
  });

  it('MediaSizeExceededError', () => {
    expect(new MediaSizeExceededError(10, 5).httpStatus).toBe(400);
  });
});

describe('Brand errors', () => {
  it('BrandNotFoundError', () => {
    expect(new BrandNotFoundError('b-1').httpStatus).toBe(404);
  });

  it('BrandSlugExistsError', () => {
    expect(new BrandSlugExistsError('sony').httpStatus).toBe(409);
  });

  it('InvalidBrandStatusError', () => {
    expect(new InvalidBrandStatusError('bad', ['active']).httpStatus).toBe(422);
  });
});

describe('Category errors', () => {
  it('CategoryNotFoundError', () => {
    expect(new CategoryNotFoundError('cat-1').httpStatus).toBe(404);
  });

  it('CategorySlugExistsError', () => {
    expect(new CategorySlugExistsError('electronics').httpStatus).toBe(409);
  });

  it('InvalidCategoryStatusError', () => {
    expect(new InvalidCategoryStatusError('bad', ['active']).httpStatus).toBe(422);
  });

  it('CategoryDepthExceededError', () => {
    expect(new CategoryDepthExceededError(6, 5).httpStatus).toBe(400);
  });

  it('CategoryHasChildrenError', () => {
    expect(new CategoryHasChildrenError('cat-1').httpStatus).toBe(400);
  });
});
