import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListVariantsQuery } from './list-variants.query.js';
import {
  VARIANT_SERVICE,
  type IProductVariantService,
} from '../../services/interfaces/product-variant.service.interface.js';
import type { VariantListResponseDTO } from '../../dtos/responses/variant-response.dto.js';

@QueryHandler(ListVariantsQuery)
export class ListVariantsHandler
  implements IQueryHandler<ListVariantsQuery, VariantListResponseDTO>
{
  constructor(
    @Inject(VARIANT_SERVICE)
    private readonly service: IProductVariantService,
  ) {}

  async execute(q: ListVariantsQuery): Promise<VariantListResponseDTO> {
    return this.service.list(q.options);
  }
}
