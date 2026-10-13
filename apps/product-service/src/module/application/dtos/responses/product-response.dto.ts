/**
 * Product Response DTOs
 * @module product-service/application/dtos/responses
 *
 * Multi-shape output:
 *  - Full: admin (all fields)
 *  - Public: customer-safe (no PII)
 *  - Summary: list views
 *  - List: paginated
 *  - Detail: with children
 *  - Stats: aggregated
 */
import type {
  ProductStatusValue,
  ProductTypeValue,
} from '@vubon/shared-types/business/product';

// ─── Full (admin) ─────────────────────────
export interface ProductResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly sku: string;
  readonly description?: string;
  readonly shortDescription?: string;
  readonly type: ProductTypeValue;
  readonly status: ProductStatusValue;
  readonly categoryId: string;
  readonly brandId?: string;
  readonly vendorId?: string;
  readonly tags: readonly string[];
  readonly images: readonly string[];
  readonly thumbnailUrl?: string;
  readonly videoUrl?: string;
  readonly barcode?: string;
  readonly weightGrams?: number;
  readonly dimensions?: {
    readonly length: number;
    readonly width: number;
    readonly height: number;
    readonly unit: 'cm' | 'in';
  };
  readonly totalStock: number;
  readonly isFeatured: boolean;
  readonly isPublished: boolean;
  readonly publishedAt?: string;
  readonly rejectionReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// ─── Public (customer-safe — NO PII) ──────
export interface ProductPublicResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly shortDescription?: string;
  readonly type: ProductTypeValue;
  readonly status: ProductStatusValue;
  readonly categoryId: string;
  readonly brandId?: string;
  readonly tags: readonly string[];
  readonly images: readonly string[];
  readonly thumbnailUrl?: string;
  readonly totalStock: number;
  readonly isFeatured: boolean;
}

// ─── Summary (list views) ─────────────────
export interface ProductSummaryResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly sku: string;
  readonly thumbnailUrl?: string;
  readonly type: ProductTypeValue;
  readonly status: ProductStatusValue;
  readonly totalStock: number;
  readonly isFeatured: boolean;
  readonly createdAt: string;
}

// ─── List (paginated) ─────────────────────
export interface ProductListResponseDTO {
  readonly items: readonly ProductSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

// ─── Stats (aggregated) ───────────────────
export interface ProductStatsResponseDTO {
  readonly total: number;
  readonly publishedCount: number;
  readonly draftCount: number;
  readonly outOfStockCount: number;
  readonly totalStockUnits: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
}

// ─── Detail (with children) ───────────────
export interface VariantSummaryDTO {
  readonly id: string;
  readonly name: string;
  readonly sku: string;
  readonly price: number;
  readonly currency: string;
  readonly stock: number;
  readonly isActive: boolean;
}

export interface AttributeSummaryDTO {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly values: readonly string[];
}

export interface ProductDetailResponseDTO {
  readonly product: ProductResponseDTO;
  readonly variants: readonly VariantSummaryDTO[];
  readonly attributes: readonly AttributeSummaryDTO[];
  readonly reviewSummary?: {
    readonly averageRating: number;
    readonly totalReviews: number;
  };
}

// ─── Create response (for POST actions) ───
export interface ProductCreateResponseDTO {
  readonly success: true;
  readonly productId: string;
  readonly status: ProductStatusValue;
  readonly slug: string;
}
