import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetVariantQuery } from './get-variant.query';
import type { ProductVariantServiceInterface } from '../../services/interfaces/product-variant.service.interface';
import type { VariantResponseDTO } from '../../dtos/responses/variant-response.dto';

@QueryHandler(GetVariantQuery)
export class GetVariantHandler
  extends BaseQueryHandler<GetVariantQuery, VariantResponseDTO | null>
  implements IQueryHandler<GetVariantQuery>
{
  readonly queryType = 'product.variant.get';

  constructor(private readonly variantService: ProductVariantServiceInterface) {
    super();
  }

  async execute(query: GetVariantQuery): Promise<VariantResponseDTO | null> {
    return this.variantService.findById(query.variantId);
  }
}
