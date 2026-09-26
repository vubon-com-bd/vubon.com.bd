import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListVariantsQuery } from './list-variants.query';
import type { ProductVariantServiceInterface } from '../../services/interfaces/product-variant.service.interface';
import type { VariantResponseDTO } from '../../dtos/responses/variant-response.dto';

@QueryHandler(ListVariantsQuery)
export class ListVariantsHandler
  extends BaseQueryHandler<ListVariantsQuery, readonly VariantResponseDTO[]>
  implements IQueryHandler<ListVariantsQuery>
{
  readonly queryType = 'product.variant.list';

  constructor(private readonly variantService: ProductVariantServiceInterface) {
    super();
  }

  async execute(query: ListVariantsQuery): Promise<readonly VariantResponseDTO[]> {
    return this.variantService.listByProduct(query.productId);
  }
}
