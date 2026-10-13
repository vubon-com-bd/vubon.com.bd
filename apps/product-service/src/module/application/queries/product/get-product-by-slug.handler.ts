import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProductBySlugQuery } from './get-product-by-slug.query.js';
import {
  PRODUCT_SERVICE,
  type IProductService,
} from '../../services/interfaces/product.service.interface.js';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto.js';

@QueryHandler(GetProductBySlugQuery)
export class GetProductBySlugHandler
  implements IQueryHandler<GetProductBySlugQuery, ProductResponseDTO>
{
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly service: IProductService,
  ) {}

  async execute(q: GetProductBySlugQuery): Promise<ProductResponseDTO> {
    return this.service.getBySlug(q.slug);
  }
}
