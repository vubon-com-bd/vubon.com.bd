import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetFeaturedProductsQuery } from './get-featured-products.query';
import type { ProductServiceInterface } from '../../services/interfaces/product.service.interface';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto';

@QueryHandler(GetFeaturedProductsQuery)
export class GetFeaturedProductsHandler
  extends BaseQueryHandler<GetFeaturedProductsQuery, readonly ProductResponseDTO[]>
  implements IQueryHandler<GetFeaturedProductsQuery>
{
  readonly queryType = 'product.get-featured';

  constructor(private readonly productService: ProductServiceInterface) {
    super();
  }

  async execute(query: GetFeaturedProductsQuery): Promise<readonly ProductResponseDTO[]> {
    void query;
    void this.productService;
    return [];
  }
}
