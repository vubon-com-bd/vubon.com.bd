/**
 * Collection Response DTOs
 * @module product-service/application/dtos/responses
 */
import type {
  CollectionTypeValue,
  CollectionStatusValue,
} from '@vubon/shared-types/business/product';

export interface CollectionResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly type: CollectionTypeValue;
  readonly status: CollectionStatusValue;
  readonly imageUrl?: string;
  readonly bannerUrl?: string;
  readonly productIds: readonly string[];
  readonly productCount: number;
  readonly isFeatured: boolean;
  readonly sortOrder: number;
  readonly startAt?: string;
  readonly endAt?: string;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CollectionPublicResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly imageUrl?: string;
  readonly productCount: number;
}

export interface CollectionSummaryResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly type: CollectionTypeValue;
  readonly productCount: number;
  readonly isFeatured: boolean;
}

export interface CollectionListResponseDTO {
  readonly items: readonly CollectionSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface CollectionStatsResponseDTO {
  readonly total: number;
  readonly activeCount: number;
  readonly featuredCount: number;
  readonly totalProductRefs: number;
  readonly byType: Readonly<Record<string, number>>;
}
