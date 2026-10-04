/**
 * Application Errors — comprehensive tests
 */
import {
  ProductNotFoundApplicationError,
  ProductSlugConflictError,
  ProductSkuConflictError,
  ProductOperationFailedError,
} from '../../../src/module/application/errors/product.errors.js';
import {
  VariantNotFoundApplicationError,
  VariantSkuConflictError,
  VariantOperationFailedError,
} from '../../../src/module/application/errors/variant.errors.js';
import {
  AttributeNotFoundApplicationError,
  AttributeOperationFailedError,
} from '../../../src/module/application/errors/attribute.errors.js';
import {
  InventoryNotFoundApplicationError,
  InsufficientStockApplicationError,
  InventoryOperationFailedError,
} from '../../../src/module/application/errors/inventory.errors.js';
import {
  PricingNotFoundApplicationError,
  PricingOperationFailedError,
} from '../../../src/module/application/errors/pricing.errors.js';
import {
  CollectionNotFoundApplicationError,
  CollectionSlugConflictError,
  CollectionOperationFailedError,
} from '../../../src/module/application/errors/collection.errors.js';
import {
  ReviewNotFoundApplicationError,
  ReviewAlreadySubmittedApplicationError,
  ReviewOperationFailedError,
} from '../../../src/module/application/errors/review.errors.js';
import {
  BrandNotFoundApplicationError,
  BrandSlugConflictError,
  BrandOperationFailedError,
} from '../../../src/module/application/errors/brand.errors.js';
import {
  CategoryNotFoundApplicationError,
  CategorySlugConflictError,
  CategoryOperationFailedError,
} from '../../../src/module/application/errors/category.errors.js';
import {
  MediaNotFoundApplicationError,
  MediaOperationFailedError,
} from '../../../src/module/application/errors/media.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

describe('Product application errors', () => {
  it('ProductNotFoundApplicationError', () => {
    const err = new ProductNotFoundApplicationError('prod-1');
    expect(err).toBeInstanceOf(ApplicationError);
    expect(err.httpStatus).toBe(404);
  });

  it('ProductSlugConflictError', () => {
    expect(new ProductSlugConflictError('slug').httpStatus).toBe(409);
  });

  it('ProductSkuConflictError', () => {
    expect(new ProductSkuConflictError('SKU').httpStatus).toBe(409);
  });

  it('ProductOperationFailedError', () => {
    const err = new ProductOperationFailedError('prod-1', 'db fail');
    expect(err.httpStatus).toBe(500);
    expect(err.message).toContain('db fail');
  });
});

describe('Variant application errors', () => {
  it('VariantNotFoundApplicationError', () => {
    expect(new VariantNotFoundApplicationError('v-1').httpStatus).toBe(404);
  });

  it('VariantSkuConflictError', () => {
    expect(new VariantSkuConflictError('SKU').httpStatus).toBe(409);
  });

  it('VariantOperationFailedError', () => {
    expect(new VariantOperationFailedError('v-1', 'reason').httpStatus).toBe(500);
  });
});

describe('Attribute application errors', () => {
  it('AttributeNotFoundApplicationError', () => {
    expect(new AttributeNotFoundApplicationError('a-1').httpStatus).toBe(404);
  });

  it('AttributeOperationFailedError', () => {
    expect(new AttributeOperationFailedError('reason').httpStatus).toBe(500);
  });
});

describe('Inventory application errors', () => {
  it('InventoryNotFoundApplicationError', () => {
    expect(new InventoryNotFoundApplicationError('inv-1').httpStatus).toBe(404);
  });

  it('InsufficientStockApplicationError', () => {
    const err = new InsufficientStockApplicationError(5, 10);
    expect(err.httpStatus).toBe(409);
    expect(err.message).toContain('5');
  });

  it('InventoryOperationFailedError', () => {
    expect(new InventoryOperationFailedError('reason').httpStatus).toBe(500);
  });
});

describe('Pricing application errors', () => {
  it('PricingNotFoundApplicationError', () => {
    expect(new PricingNotFoundApplicationError('prod-1').httpStatus).toBe(404);
  });

  it('PricingOperationFailedError', () => {
    expect(new PricingOperationFailedError('reason').httpStatus).toBe(500);
  });
});

describe('Collection application errors', () => {
  it('CollectionNotFoundApplicationError', () => {
    expect(new CollectionNotFoundApplicationError('c-1').httpStatus).toBe(404);
  });

  it('CollectionSlugConflictError', () => {
    expect(new CollectionSlugConflictError('slug').httpStatus).toBe(409);
  });

  it('CollectionOperationFailedError', () => {
    expect(new CollectionOperationFailedError('reason').httpStatus).toBe(500);
  });
});

describe('Review application errors', () => {
  it('ReviewNotFoundApplicationError', () => {
    expect(new ReviewNotFoundApplicationError('r-1').httpStatus).toBe(404);
  });

  it('ReviewAlreadySubmittedApplicationError', () => {
    expect(new ReviewAlreadySubmittedApplicationError('prod-1', 'user-1').httpStatus).toBe(409);
  });

  it('ReviewOperationFailedError', () => {
    expect(new ReviewOperationFailedError('reason').httpStatus).toBe(500);
  });
});

describe('Brand application errors', () => {
  it('BrandNotFoundApplicationError', () => {
    expect(new BrandNotFoundApplicationError('b-1').httpStatus).toBe(404);
  });

  it('BrandSlugConflictError', () => {
    expect(new BrandSlugConflictError('slug').httpStatus).toBe(409);
  });

  it('BrandOperationFailedError', () => {
    expect(new BrandOperationFailedError('reason').httpStatus).toBe(500);
  });
});

describe('Category application errors', () => {
  it('CategoryNotFoundApplicationError', () => {
    expect(new CategoryNotFoundApplicationError('c-1').httpStatus).toBe(404);
  });

  it('CategorySlugConflictError', () => {
    expect(new CategorySlugConflictError('slug').httpStatus).toBe(409);
  });

  it('CategoryOperationFailedError', () => {
    expect(new CategoryOperationFailedError('reason').httpStatus).toBe(500);
  });
});

describe('Media application errors', () => {
  it('MediaNotFoundApplicationError', () => {
    expect(new MediaNotFoundApplicationError('m-1').httpStatus).toBe(404);
  });

  it('MediaOperationFailedError', () => {
    expect(new MediaOperationFailedError('reason').httpStatus).toBe(500);
  });
});
