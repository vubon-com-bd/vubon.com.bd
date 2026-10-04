/**
 * Response DTO factories for handler tests
 */
import type { ProductResponseDTO } from '../../src/module/application/dtos/responses/product-response.dto.js';
import type { VariantResponseDTO } from '../../src/module/application/dtos/responses/variant-response.dto.js';
import type { InventoryResponseDTO } from '../../src/module/application/dtos/responses/inventory-response.dto.js';
import type { PricingResponseDTO } from '../../src/module/application/dtos/responses/pricing-response.dto.js';
import type { ReviewResponseDTO } from '../../src/module/application/dtos/responses/review-response.dto.js';
import type { ProductDetailResponseDTO } from '../../src/module/application/dtos/responses/product-detail-response.dto.js';
import type { ProductListResponseDTO } from '../../src/module/application/dtos/responses/product-list-response.dto.js';
import type { ProductId, CategoryId, BrandId, Slug, Url, Money } from '@vubon/shared-types/common';

import { PRODUCT_ID, VARIANT_ID, PRODUCT_ID as _PID, CATEGORY_ID, NOW, DEFAULT_CURRENCY } from '../helpers.js';

void _PID;

export function mockProductResponse(): ProductResponseDTO {
  return {
    id: PRODUCT_ID as ProductId,
    name: 'Test Product',
    slug: 'test-product' as Slug,
    sku: 'TEST-001',
    type: 'physical',
    status: 'draft',
    description: 'A test product',
    categoryId: CATEGORY_ID as CategoryId,
    price: 1000 as Money,
    currency: DEFAULT_CURRENCY,
    tags: [],
    images: [] as readonly Url[],
    totalStock: 10,
    isFeatured: false,
    isPublished: false,
    createdAt: NOW,
    updatedAt: NOW,
  };
}

export function mockVariantResponse(): VariantResponseDTO {
  return {
    id: VARIANT_ID,
    productId: PRODUCT_ID as ProductId,
    name: 'Red / L',
    sku: 'TEST-RED-L',
    options: [{ name: 'Color', value: 'Red' }],
    price: 1200 as Money,
    status: 'active',
    stock: 10,
    createdAt: NOW,
    updatedAt: NOW,
  };
}

export function mockInventoryResponse(): InventoryResponseDTO {
  return {
    id: 'invt-11111111-1111-1111-1111-111111111111',
    productId: PRODUCT_ID as ProductId,
    sku: 'TEST-001',
    quantity: 100,
    reserved: 0,
    available: 100,
    status: 'in_stock',
    lowStockThreshold: 10,
    trackQuantity: true,
    allowBackorder: false,
    updatedAt: NOW,
  };
}

export function mockPricingResponse(): PricingResponseDTO {
  return {
    id: 'prcg-11111111-1111-1111-1111-111111111111',
    productId: PRODUCT_ID as ProductId,
    type: 'fixed',
    basePrice: 1000 as Money,
    sellingPrice: 900 as Money,
    currency: DEFAULT_CURRENCY,
    taxRate: 0,
    taxInclusive: true,
    discountPercent: 10,
    updatedAt: NOW,
  };
}

export function mockReviewResponse(): ReviewResponseDTO {
  return {
    id: 'revw-11111111-1111-1111-1111-111111111111',
    productId: PRODUCT_ID as ProductId,
    userId: 'user-1111',
    rating: 5,
    status: 'pending',
    isVerifiedPurchase: true,
    helpfulCount: 0,
    reportCount: 0,
    createdAt: NOW,
    updatedAt: NOW,
  };
}

export function mockProductDetailResponse(): ProductDetailResponseDTO {
  return {
    product: mockProductResponse(),
    variants: [mockVariantResponse()],
    inventory: [mockInventoryResponse()],
    pricing: mockPricingResponse(),
    attributes: [],
  };
}

export function mockProductListResponse(): ProductListResponseDTO {
  const base = mockProductResponse();
  return {
    success: true,
    products: [
      {
        id: base.id,
        name: base.name,
        slug: base.slug,
        type: base.type,
        status: base.status,
        categoryId: base.categoryId,
        tags: base.tags,
        images: base.images,
        price: base.price,
        currency: base.currency,
        totalStock: base.totalStock,
        isFeatured: base.isFeatured,
      },
    ],
    total: 1,
    page: 1,
    limit: 20,
    totalPages: 1,
  };
}

void ({} as BrandId);
