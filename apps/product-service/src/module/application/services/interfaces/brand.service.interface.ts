/**
 * IBrandService Interface
 */
import type { CreateBrandRequestDTO } from '../../dtos/requests/brand/create-brand.dto.js';
import type { UpdateBrandRequestDTO } from '../../dtos/requests/brand/update-brand.dto.js';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto.js';

export const BRAND_SERVICE = Symbol('BRAND_SERVICE');

export interface IBrandService {
  create(dto: CreateBrandRequestDTO, actorId: string): Promise<BrandResponseDTO>;
  update(dto: UpdateBrandRequestDTO, actorId: string): Promise<BrandResponseDTO>;
  remove(brandId: string, actorId: string): Promise<void>;
  activate(brandId: string, actorId: string): Promise<BrandResponseDTO>;
  deactivate(brandId: string, actorId: string): Promise<BrandResponseDTO>;
  feature(brandId: string, actorId: string): Promise<BrandResponseDTO>;
  getById(brandId: string): Promise<BrandResponseDTO | null>;
  getBySlug(slug: string): Promise<BrandResponseDTO | null>;
  listFeatured(limit?: number): Promise<readonly BrandResponseDTO[]>;
}
