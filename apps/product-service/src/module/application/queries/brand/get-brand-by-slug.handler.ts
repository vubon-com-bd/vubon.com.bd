import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetBrandBySlugQuery } from './get-brand-by-slug.query.js';
import { BRAND_SERVICE, type IBrandService } from '../../services/interfaces/brand.service.interface.js';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto.js';

@QueryHandler(GetBrandBySlugQuery)
export class GetBrandBySlugHandler implements IQueryHandler<GetBrandBySlugQuery, BrandResponseDTO | null> {
  constructor(@Inject(BRAND_SERVICE) private readonly service: IBrandService) {}
  async execute(q: GetBrandBySlugQuery): Promise<BrandResponseDTO | null> {
    return this.service.getBySlug(q.slug);
  }
}
