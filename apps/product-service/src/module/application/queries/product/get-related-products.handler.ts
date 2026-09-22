import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetRelatedProductsQuery } from './get-related-products.query';
import type { ProductServiceInterface } from '../../services/interfaces/product.service.interface';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto';

@QueryHandler(GetRelatedProductsQuery)
export class GetRelatedProductsHandler
  extends BaseQueryHandler<GetRelatedProductsQuery, readonly ProductResponseDTO[]>
  implements IQueryHandler<GetRelatedProductsQuery>
{
  readonly queryType = 'product.get-related';

  constructor(private readonly productService: ProductServiceInterface) {
    super();
  }

  async execute(query: GetRelatedProductsQuery): Promise<readonly ProductResponseDTO[]> {
    void query;
    void this.productService;
    return [];
  }
}
