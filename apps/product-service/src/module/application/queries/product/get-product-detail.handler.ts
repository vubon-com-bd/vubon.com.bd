import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProductDetailQuery } from './get-product-detail.query.js';
import { PRODUCT_SERVICE, type IProductService } from '../../services/interfaces/product.service.interface.js';
import type { ProductDetailResponseDTO } from '../../dtos/responses/product-detail-response.dto.js';

@QueryHandler(GetProductDetailQuery)
export class GetProductDetailHandler implements IQueryHandler<GetProductDetailQuery, ProductDetailResponseDTO> {
  constructor(@Inject(PRODUCT_SERVICE) private readonly service: IProductService) {}
  async execute(q: GetProductDetailQuery): Promise<ProductDetailResponseDTO> {
    return this.service.getDetail(q.productId);
  }
}
