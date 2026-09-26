import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListProductsQuery } from './list-products.query';
import type { ProductServiceInterface } from '../../services/interfaces/product.service.interface';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto';

@QueryHandler(ListProductsQuery)
export class ListProductsHandler
  extends BaseQueryHandler<ListProductsQuery, readonly ProductResponseDTO[]>
  implements IQueryHandler<ListProductsQuery>
{
  readonly queryType = 'product.list';

  constructor(private readonly productService: ProductServiceInterface) {
    super();
  }

  async execute(query: ListProductsQuery): Promise<readonly ProductResponseDTO[]> {
    return this.productService.list(query.page, query.limit);
  }
}
