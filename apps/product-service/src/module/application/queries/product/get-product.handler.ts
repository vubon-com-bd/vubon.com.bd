import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetProductQuery } from './get-product.query';
import type { ProductServiceInterface } from '../../services/interfaces/product.service.interface';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto';
import { ProductNotFoundAppError } from '../../errors/product.errors';

@QueryHandler(GetProductQuery)
export class GetProductHandler
  extends BaseQueryHandler<GetProductQuery, ProductResponseDTO>
  implements IQueryHandler<GetProductQuery>
{
  readonly queryType = 'product.get';

  constructor(private readonly productService: ProductServiceInterface) {
    super();
  }

  async execute(query: GetProductQuery): Promise<ProductResponseDTO> {
    const product = await this.productService.findById(query.productId);
    if (!product) throw new ProductNotFoundAppError(query.productId);
    return product;
  }
}
