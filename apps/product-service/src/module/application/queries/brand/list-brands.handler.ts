import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListBrandsQuery } from './list-brands.query.js';
import {
  BRAND_SERVICE,
  type IBrandService,
} from '../../services/interfaces/brand.service.interface.js';
import type { BrandListResponseDTO } from '../../dtos/responses/brand-response.dto.js';

@QueryHandler(ListBrandsQuery)
export class ListBrandsHandler
  implements IQueryHandler<ListBrandsQuery, BrandListResponseDTO>
{
  constructor(
    @Inject(BRAND_SERVICE)
    private readonly service: IBrandService,
  ) {}

  async execute(q: ListBrandsQuery): Promise<BrandListResponseDTO> {
    return this.service.list(q.options);
  }
}
