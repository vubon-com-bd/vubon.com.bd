/**
 * Typed in-memory mock repositories
 * @module product-service/test/mocks
 */
import { jest } from '@jest/globals';
import type { ProductEntity } from '../../src/module/domain/entities/product.entity.js';
import type { ProductVariantEntity } from '../../src/module/domain/entities/product-variant.entity.js';
import type { ProductInventoryEntity } from '../../src/module/domain/entities/product-inventory.entity.js';
import type { ProductPricingEntity } from '../../src/module/domain/entities/product-pricing.entity.js';
import type { ProductReviewEntity } from '../../src/module/domain/entities/product-review.entity.js';

import type {
  ProductRepository,
  ProductListOptions,
  ProductPaginationResult,
} from '../../src/module/domain/repositories/product.repository.interface.js';
import type { VariantRepository } from '../../src/module/domain/repositories/variant.repository.interface.js';
import type { InventoryRepository } from '../../src/module/domain/repositories/inventory.repository.interface.js';
import type { PricingRepository } from '../../src/module/domain/repositories/pricing.repository.interface.js';
import type {
  ReviewRepository,
  ReviewPaginationOptions,
  ReviewPaginationResult,
  ReviewAggregate,
} from '../../src/module/domain/repositories/review.repository.interface.js';

// ─── Product Repository ──────────────────────────────────

export type MockedProductRepository = jest.Mocked<ProductRepository>;

export function createMockProductRepository(): MockedProductRepository {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findBySlug: jest.fn(),
    findBySku: jest.fn(),
    existsBySlug: jest.fn(),
    existsBySku: jest.fn(),
    findByIdVO: jest.fn(),
    findByIds: jest.fn(),
    findByCategory: jest.fn(),
    findByBrand: jest.fn(),
    findFeatured: jest.fn(),
    findPublished: jest.fn(),
    findPaginated: jest.fn(),
    countByCategory: jest.fn(),
    countByBrand: jest.fn(),
    incrementCategoryCount: jest.fn(),
    decrementCategoryCount: jest.fn(),
  } as unknown as MockedProductRepository;
}

// ─── Variant Repository ──────────────────────────────────

export type MockedVariantRepository = jest.Mocked<VariantRepository>;

export function createMockVariantRepository(): MockedVariantRepository {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByIdVO: jest.fn(),
    findByProductId: jest.fn(),
    findBySku: jest.fn(),
    existsBySku: jest.fn(),
    findAvailableByProductId: jest.fn(),
    countByProductId: jest.fn(),
    deleteByProductId: jest.fn(),
    findByIds: jest.fn(),
  } as unknown as MockedVariantRepository;
}

// ─── Inventory Repository ────────────────────────────────

export type MockedInventoryRepository = jest.Mocked<InventoryRepository>;

export function createMockInventoryRepository(): MockedInventoryRepository {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByIdVO: jest.fn(),
    findByProductId: jest.fn(),
    findByVariantId: jest.fn(),
    findBySku: jest.fn(),
    findLowStock: jest.fn(),
    findOutOfStock: jest.fn(),
    findByIds: jest.fn(),
    countByProductId: jest.fn(),
    deleteByProductId: jest.fn(),
    sumAvailableByProductId: jest.fn(),
  } as unknown as MockedInventoryRepository;
}

// ─── Pricing Repository ──────────────────────────────────

export type MockedPricingRepository = jest.Mocked<PricingRepository>;

export function createMockPricingRepository(): MockedPricingRepository {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByProductId: jest.fn(),
    findByVariantId: jest.fn(),
    findAllByProductId: jest.fn(),
    findDiscounted: jest.fn(),
    deleteByProductId: jest.fn(),
  } as unknown as MockedPricingRepository;
}

// ─── Review Repository ───────────────────────────────────

export type MockedReviewRepository = jest.Mocked<ReviewRepository>;

export function createMockReviewRepository(): MockedReviewRepository {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByProductId: jest.fn(),
    findByUserId: jest.fn(),
    findByUserAndProduct: jest.fn(),
    existsByUserAndProduct: jest.fn(),
    findApprovedByProductId: jest.fn(),
    findPaginatedByProduct: jest.fn(),
    aggregateRatings: jest.fn(),
    countByProductId: jest.fn(),
    countByUserId: jest.fn(),
    deleteByProductId: jest.fn(),
  } as unknown as MockedReviewRepository;
}

// ─── Utility: default paginated result ──────────────────

export function emptyProductPage(options: ProductListOptions): ProductPaginationResult {
  return {
    items: [],
    total: 0,
    page: options.page,
    limit: options.limit,
    totalPages: 0,
  };
}

export function emptyReviewPage(options: ReviewPaginationOptions): ReviewPaginationResult {
  return {
    items: [],
    total: 0,
    page: options.page,
    limit: options.limit,
  };
}

export function emptyReviewAggregate(productId: string): ReviewAggregate {
  return {
    productId,
    totalReviews: 0,
    averageRating: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  };
}

// ensure unused type imports don't warn
void ({} as ProductEntity);
void ({} as ProductVariantEntity);
void ({} as ProductInventoryEntity);
void ({} as ProductPricingEntity);
void ({} as ProductReviewEntity);

// ═══════════════════════════════════════════════════════════
// Batch 2 Mocks — Attribute, Brand, Category, Collection, Media
// ═══════════════════════════════════════════════════════════

import type { AttributeRepository } from '../../src/module/domain/repositories/attribute.repository.interface.js';
import type { BrandRepository } from '../../src/module/domain/repositories/brand.repository.interface.js';
import type { CategoryRepository } from '../../src/module/domain/repositories/category.repository.interface.js';
import type { CollectionRepository } from '../../src/module/domain/repositories/collection.repository.interface.js';
import type { MediaRepository } from '../../src/module/domain/repositories/media.repository.interface.js';

export type MockedAttributeRepository = jest.Mocked<AttributeRepository>;
export function createMockAttributeRepository(): MockedAttributeRepository {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByProductId: jest.fn(),
    findBySlug: jest.fn(),
    findFilterable: jest.fn(),
    findSearchable: jest.fn(),
    countByProductId: jest.fn(),
    deleteByProductId: jest.fn(),
  } as unknown as MockedAttributeRepository;
}

export type MockedBrandRepository = jest.Mocked<BrandRepository>;
export function createMockBrandRepository(): MockedBrandRepository {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByIdVO: jest.fn(),
    findBySlug: jest.fn(),
    existsBySlug: jest.fn(),
    findFeatured: jest.fn(),
    findActive: jest.fn(),
    findPaginated: jest.fn(),
    findByIds: jest.fn(),
  } as unknown as MockedBrandRepository;
}

export type MockedCategoryRepository = jest.Mocked<CategoryRepository>;
export function createMockCategoryRepository(): MockedCategoryRepository {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByIdVO: jest.fn(),
    findBySlug: jest.fn(),
    existsBySlug: jest.fn(),
    findRoots: jest.fn(),
    findByParentId: jest.fn(),
    findChildren: jest.fn(),
    hasChildren: jest.fn(),
    findDescendants: jest.fn(),
    findAncestors: jest.fn(),
    findTree: jest.fn(),
    findActive: jest.fn(),
    findByPath: jest.fn(),
    findByIds: jest.fn(),
  } as unknown as MockedCategoryRepository;
}

export type MockedCollectionRepository = jest.Mocked<CollectionRepository>;
export function createMockCollectionRepository(): MockedCollectionRepository {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByIdVO: jest.fn(),
    findBySlug: jest.fn(),
    existsBySlug: jest.fn(),
    findByProductId: jest.fn(),
    findFeatured: jest.fn(),
    findActive: jest.fn(),
    findPaginated: jest.fn(),
    addProduct: jest.fn(),
    removeProduct: jest.fn(),
    countByProductId: jest.fn(),
  } as unknown as MockedCollectionRepository;
}

export type MockedMediaRepository = jest.Mocked<MediaRepository>;
export function createMockMediaRepository(): MockedMediaRepository {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByProductId: jest.fn(),
    findPrimaryByProductId: jest.fn(),
    findImagesByProductId: jest.fn(),
    countByProductId: jest.fn(),
    deleteByProductId: jest.fn(),
    reorder: jest.fn(),
    clearPrimaryForProduct: jest.fn(),
  } as unknown as MockedMediaRepository;
}
