/**
 * Category Response DTOs
 * @module product-service/application/dtos/responses
 */
import type { CategoryStatusValue } from '@vubon/shared-types/business/product';

export interface CategoryResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly parentId?: string;
  readonly path: readonly string[];
  readonly depth: number;
  readonly status: CategoryStatusValue;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly sortOrder: number;
  readonly productCount: number;
  readonly isFeatured: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CategoryPublicResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly parentId?: string;
  readonly imageUrl?: string;
  readonly productCount: number;
}

export interface CategorySummaryResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly depth: number;
  readonly productCount: number;
}

export interface CategoryListResponseDTO {
  readonly items: readonly CategorySummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface CategoryTreeNodeDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly imageUrl?: string;
  readonly productCount: number;
  readonly children: readonly CategoryTreeNodeDTO[];
}

export interface CategoryTreeResponseDTO {
  readonly roots: readonly CategoryTreeNodeDTO[];
  readonly totalNodes: number;
  readonly maxDepth: number;
}

export interface CategoryStatsResponseDTO {
  readonly total: number;
  readonly activeCount: number;
  readonly rootCount: number;
  readonly maxDepth: number;
  readonly totalProducts: number;
  readonly byDepth: Readonly<Record<number, number>>;
}
