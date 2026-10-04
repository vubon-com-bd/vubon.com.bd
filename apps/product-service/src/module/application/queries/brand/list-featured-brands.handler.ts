import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListFeaturedBrandsQuery } from './list-featured-brands.query.js';
import { BRAND_SERVICE, type IBrandService } from '../../services/interfaces/brand.service.interface.js';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto.js';

@QueryHandler(ListFeaturedBrandsQuery)
export class ListFeaturedBrandsHandler
  implements IQueryHandler<ListFeaturedBrandsQuery, readonly BrandResponseDTO[]>
{
  constructor(@Inject(BRAND_SERVICE) private readonly service: IBrandService) {}
  async execute(q: ListFeaturedBrandsQuery): Promise<readonly BrandResponseDTO[]> {
    return this.service.listFeatured(q.limit);
  }
}
