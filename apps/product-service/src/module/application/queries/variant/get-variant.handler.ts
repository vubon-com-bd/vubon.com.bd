import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVariantQuery } from './get-variant.query.js';
import {
  VARIANT_SERVICE,
  type IProductVariantService,
} from '../../services/interfaces/product-variant.service.interface.js';
import type { VariantResponseDTO } from '../../dtos/responses/variant-response.dto.js';

@QueryHandler(GetVariantQuery)
export class GetVariantHandler
  implements IQueryHandler<GetVariantQuery, VariantResponseDTO>
{
  constructor(
    @Inject(VARIANT_SERVICE)
    private readonly service: IProductVariantService,
  ) {}

  async execute(q: GetVariantQuery): Promise<VariantResponseDTO> {
    return this.service.getById(q.variantId);
  }
}
