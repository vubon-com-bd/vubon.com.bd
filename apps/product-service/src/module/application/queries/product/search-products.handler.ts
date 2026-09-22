import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { SearchProductsQuery } from './search-products.query';
import type { ProductServiceInterface } from '../../services/interfaces/product.service.interface';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto';

@QueryHandler(SearchProductsQuery)
export class SearchProductsHandler
  extends BaseQueryHandler<SearchProductsQuery, readonly ProductResponseDTO[]>
  implements IQueryHandler<SearchProductsQuery>
{
  readonly queryType = 'product.search';

  constructor(private readonly productService: ProductServiceInterface) {
    super();
  }

  async execute(query: SearchProductsQuery): Promise<readonly ProductResponseDTO[]> {
    return this.productService.search(query.term, query.limit);
  }
}
