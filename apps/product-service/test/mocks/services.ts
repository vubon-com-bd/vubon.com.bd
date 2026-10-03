/**
 * Typed service mocks
 * @module product-service/test/mocks
 */
import { jest } from '@jest/globals';
import type {
  IProductService,
} from '../../src/module/application/services/interfaces/product.service.interface.js';
import type {
  IVariantService,
} from '../../src/module/application/services/interfaces/variant.service.interface.js';
import type {
  IInventoryService,
} from '../../src/module/application/services/interfaces/inventory.service.interface.js';
import type {
  IPricingService,
} from '../../src/module/application/services/interfaces/pricing.service.interface.js';
import type {
  IReviewService,
} from '../../src/module/application/services/interfaces/review.service.interface.js';
import type {
  IProductCatalogService,
} from '../../src/module/application/services/interfaces/product-catalog.service.interface.js';

export type MockedProductService = jest.Mocked<IProductService>;
export function createMockProductService(): MockedProductService {
  return {
    create: jest.fn(),
    update: jest.fn(),
    publish: jest.fn(),
    unpublish: jest.fn(),
    archive: jest.fn(),
    softDelete: jest.fn(),
    feature: jest.fn(),
    unfeature: jest.fn(),
    duplicate: jest.fn(),
    getDetail: jest.fn(),
  } as unknown as MockedProductService;
}

export type MockedVariantService = jest.Mocked<IVariantService>;
export function createMockVariantService(): MockedVariantService {
  return {
    add: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    listByProduct: jest.fn(),
    regenerateMatrix: jest.fn(),
  } as unknown as MockedVariantService;
}

export type MockedInventoryService = jest.Mocked<IInventoryService>;
export function createMockInventoryService(): MockedInventoryService {
  return {
    update: jest.fn(),
    adjust: jest.fn(),
    reserve: jest.fn(),
    release: jest.fn(),
    listByProduct: jest.fn(),
    listLowStock: jest.fn(),
  } as unknown as MockedInventoryService;
}

export type MockedPricingService = jest.Mocked<IPricingService>;
export function createMockPricingService(): MockedPricingService {
  return {
    update: jest.fn(),
    getByProduct: jest.fn(),
    applyDiscount: jest.fn(),
    removeDiscount: jest.fn(),
    quotePrice: jest.fn(),
  } as unknown as MockedPricingService;
}

export type MockedReviewService = jest.Mocked<IReviewService>;
export function createMockReviewService(): MockedReviewService {
  return {
    submit: jest.fn(),
    update: jest.fn(),
    approve: jest.fn(),
    reject: jest.fn(),
    remove: jest.fn(),
    markHelpful: jest.fn(),
    report: jest.fn(),
    listByProduct: jest.fn(),
    statsByProduct: jest.fn(),
  } as unknown as MockedReviewService;
}

export type MockedProductCatalogService = jest.Mocked<IProductCatalogService>;
export function createMockProductCatalogService(): MockedProductCatalogService {
  return {
    list: jest.fn(),
    getDetail: jest.fn(),
    getBySlug: jest.fn(),
    listFeatured: jest.fn(),
    listByCategory: jest.fn(),
  } as unknown as MockedProductCatalogService;
}

// ═══════════════════════════════════════════════════════════
// Batch 3 Mocks — Attribute, Brand, Category, Collection, Media
// ═══════════════════════════════════════════════════════════

import type { IAttributeService } from '../../src/module/application/services/interfaces/attribute.service.interface.js';
import type { IBrandService } from '../../src/module/application/services/interfaces/brand.service.interface.js';
import type { ICategoryService } from '../../src/module/application/services/interfaces/category.service.interface.js';
import type { ICollectionService } from '../../src/module/application/services/interfaces/collection.service.interface.js';
import type { IMediaService } from '../../src/module/application/services/interfaces/media.service.interface.js';

export type MockedAttributeService = jest.Mocked<IAttributeService>;
export function createMockAttributeService(): MockedAttributeService {
  return {
    add: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    listByProduct: jest.fn(),
  } as unknown as MockedAttributeService;
}

export type MockedBrandService = jest.Mocked<IBrandService>;
export function createMockBrandService(): MockedBrandService {
  return {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    activate: jest.fn(),
    deactivate: jest.fn(),
    feature: jest.fn(),
    getById: jest.fn(),
    getBySlug: jest.fn(),
    listFeatured: jest.fn(),
  } as unknown as MockedBrandService;
}

export type MockedCategoryService = jest.Mocked<ICategoryService>;
export function createMockCategoryService(): MockedCategoryService {
  return {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    move: jest.fn(),
    activate: jest.fn(),
    deactivate: jest.fn(),
    getTree: jest.fn(),
    getById: jest.fn(),
    getBySlug: jest.fn(),
  } as unknown as MockedCategoryService;
}

export type MockedCollectionService = jest.Mocked<ICollectionService>;
export function createMockCollectionService(): MockedCollectionService {
  return {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    addProduct: jest.fn(),
    removeProduct: jest.fn(),
    listFeatured: jest.fn(),
    listActive: jest.fn(),
  } as unknown as MockedCollectionService;
}

export type MockedMediaService = jest.Mocked<IMediaService>;
export function createMockMediaService(): MockedMediaService {
  return {
    add: jest.fn(),
    remove: jest.fn(),
    setPrimary: jest.fn(),
    reorder: jest.fn(),
    listByProduct: jest.fn(),
  } as unknown as MockedMediaService;
}
