import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetBrandQuery } from './get-brand.query.js';
import { BRAND_SERVICE, type IBrandService } from '../../services/interfaces/brand.service.interface.js';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto.js';

@QueryHandler(GetBrandQuery)
export class GetBrandHandler implements IQueryHandler<GetBrandQuery, BrandResponseDTO | null> {
  constructor(@Inject(BRAND_SERVICE) private readonly service: IBrandService) {}
  async execute(q: GetBrandQuery): Promise<BrandResponseDTO | null> {
    return this.service.getById(q.brandId);
  }
}
