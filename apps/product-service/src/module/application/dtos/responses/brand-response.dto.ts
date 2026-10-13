/**
 * Brand Response DTOs
 * @module product-service/application/dtos/responses
 */
import type { BrandStatusValue } from '@vubon/shared-types/business/product';

export interface BrandResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly logoUrl?: string;
  readonly bannerUrl?: string;
  readonly website?: string;
  readonly status: BrandStatusValue;
  readonly isFeatured: boolean;
  readonly productCount: number;
  readonly country?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface BrandPublicResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly logoUrl?: string;
  readonly productCount: number;
}

export interface BrandSummaryResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly logoUrl?: string;
  readonly productCount: number;
  readonly isFeatured: boolean;
}

export interface BrandListResponseDTO {
  readonly items: readonly BrandSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface BrandStatsResponseDTO {
  readonly total: number;
  readonly activeCount: number;
  readonly featuredCount: number;
  readonly totalProducts: number;
}
