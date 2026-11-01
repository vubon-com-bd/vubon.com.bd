/**
 * IBrandService — contract
 * @module product-service/application/services/interfaces
 */
import type {
  CreateBrandRequestDTO,
  UpdateBrandRequestDTO,
  DeleteBrandRequestDTO,
} from '../../dtos/requests/brand/index.js';
import type {
  BrandResponseDTO,
  BrandPublicResponseDTO,
  BrandSummaryResponseDTO,
  BrandListResponseDTO,
  BrandStatsResponseDTO,
} from '../../dtos/responses/brand-response.dto.js';

export const BRAND_SERVICE = Symbol('BRAND_SERVICE');

export interface BrandListFilterDTO {
  readonly status?: string | readonly string[];
  readonly isFeatured?: boolean;
  readonly country?: string;
  readonly search?: string;
}

export interface BrandListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'name' | 'createdAt' | 'productCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: BrandListFilterDTO;
}

export interface IBrandService {
  // Commands
  create(dto: CreateBrandRequestDTO): Promise<BrandResponseDTO>;
  update(dto: UpdateBrandRequestDTO): Promise<BrandResponseDTO>;
  delete(dto: DeleteBrandRequestDTO): Promise<{ readonly success: true; readonly brandId: string }>;

  // Queries
  getById(id: string): Promise<BrandResponseDTO>;
  getBySlug(slug: string): Promise<BrandResponseDTO>;
  getPublic(id: string): Promise<BrandPublicResponseDTO>;
  list(options: BrandListOptionsDTO): Promise<BrandListResponseDTO>;
  findFeatured(limit?: number): Promise<readonly BrandSummaryResponseDTO[]>;
  search(term: string, limit?: number): Promise<readonly BrandSummaryResponseDTO[]>;
  getStats(filter?: BrandListFilterDTO): Promise<BrandStatsResponseDTO>;
}
