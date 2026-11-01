import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProductQuery } from './get-product.query.js';
import {
  PRODUCT_SERVICE,
  type IProductService,
} from '../../services/interfaces/product.service.interface.js';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto.js';

@QueryHandler(GetProductQuery)
export class GetProductHandler
  implements IQueryHandler<GetProductQuery, ProductResponseDTO>
{
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly service: IProductService,
  ) {}

  async execute(q: GetProductQuery): Promise<ProductResponseDTO> {
    return this.service.getById(q.productId);
  }
}
