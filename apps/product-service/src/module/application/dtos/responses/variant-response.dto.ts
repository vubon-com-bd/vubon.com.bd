/**
 * Variant Response DTOs
 * @module product-service/application/dtos/responses
 */
import type { VariantStatusValue, VariantTypeValue } from '@vubon/shared-types/business/product';

// ─── Full ─────────────────────────────────
export interface VariantResponseDTO {
  readonly id: string;
  readonly productId: string;
  readonly name: string;
  readonly sku: string;
  readonly barcode?: string;
  readonly type: VariantTypeValue;
  readonly options: readonly { readonly name: string; readonly value: string }[];
  readonly price: number;
  readonly compareAtPrice?: number;
  readonly cost?: number;
  readonly currency: string;
  readonly weightGrams?: number;
  readonly imageUrl?: string;
  readonly status: VariantStatusValue;
  readonly stock: number;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// ─── Public (customer-safe) ───────────────
export interface VariantPublicResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly sku: string;
  readonly options: readonly { readonly name: string; readonly value: string }[];
  readonly price: number;
  readonly compareAtPrice?: number;
  readonly currency: string;
  readonly imageUrl?: string;
  readonly stock: number;
  readonly isActive: boolean;
}

// ─── Summary (list) ───────────────────────
export interface VariantSummaryResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly sku: string;
  readonly price: number;
  readonly currency: string;
  readonly stock: number;
  readonly isActive: boolean;
}

// ─── List (paginated) ─────────────────────
export interface VariantListResponseDTO {
  readonly items: readonly VariantSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Stats ────────────────────────────────
export interface VariantStatsResponseDTO {
  readonly total: number;
  readonly activeCount: number;
  readonly outOfStockCount: number;
  readonly totalStockUnits: number;
}
