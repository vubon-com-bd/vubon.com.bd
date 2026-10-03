import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListVariantsByProductQuery } from './list-variants-by-product.query.js';
import { VARIANT_SERVICE, type IVariantService } from '../../services/interfaces/variant.service.interface.js';
import type { VariantResponseDTO } from '../../dtos/responses/variant-response.dto.js';

@QueryHandler(ListVariantsByProductQuery)
export class ListVariantsByProductHandler
  implements IQueryHandler<ListVariantsByProductQuery, readonly VariantResponseDTO[]>
{
  constructor(@Inject(VARIANT_SERVICE) private readonly service: IVariantService) {}
  async execute(q: ListVariantsByProductQuery): Promise<readonly VariantResponseDTO[]> {
    return this.service.listByProduct(q.productId);
  }
}
