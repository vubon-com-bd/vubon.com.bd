import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { BrandEntity } from '../../../domain/entities/brand.entity';
import type { CreateBrandRequestDTO } from '../../dtos/requests/brand/create-brand.dto';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto';

export interface BrandServiceInterface
  extends BaseServiceInterface<BrandEntity, string> {
  create(input: CreateBrandRequestDTO): Promise<BrandResponseDTO>;
  update(brandId: string, name?: string, logo?: string | null): Promise<BrandResponseDTO>;
  delete(brandId: string): Promise<void>;
  findById(brandId: string): Promise<BrandResponseDTO | null>;
  findBySlug(slug: string): Promise<BrandResponseDTO | null>;
  list(): Promise<readonly BrandResponseDTO[]>;
}
