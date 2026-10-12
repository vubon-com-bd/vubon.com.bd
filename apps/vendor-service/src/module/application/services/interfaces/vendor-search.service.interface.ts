/**
 * IVendorSearchService
 * @module vendor-service/application/services/interfaces
 */
import type {
  VendorPublicDto,
  VendorSummaryDto,
} from '../../dtos/responses/vendor-response.dto.js';

export const VENDOR_SEARCH_SERVICE = Symbol('VENDOR_SEARCH_SERVICE');

export interface VendorSearchInput {
  readonly query?: string;
  readonly status?: string;
  readonly type?: string;
  readonly tier?: string;
  readonly isVerified?: boolean;
  readonly isFeatured?: boolean;
  readonly minRating?: number;
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'totalSales' | 'rating' | 'name';
  readonly sortDir?: 'asc' | 'desc';
}

export interface VendorSearchResultDto {
  readonly items: readonly VendorSummaryDto[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface IVendorSearchService {
  search(input: VendorSearchInput): Promise<VendorSearchResultDto>;
  searchPublic(query: string, limit: number): Promise<readonly VendorPublicDto[]>;
  findTopRated(limit: number): Promise<readonly VendorSummaryDto[]>;
  findFeatured(limit: number): Promise<readonly VendorPublicDto[]>;
}
