import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetBrandQuery } from './get-brand.query';
import type { BrandServiceInterface } from '../../services/interfaces/brand.service.interface';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto';

@QueryHandler(GetBrandQuery)
export class GetBrandHandler
  extends BaseQueryHandler<GetBrandQuery, BrandResponseDTO | null>
  implements IQueryHandler<GetBrandQuery>
{
  readonly queryType = 'product.brand.get';

  constructor(private readonly brandService: BrandServiceInterface) {
    super();
  }

  async execute(query: GetBrandQuery): Promise<BrandResponseDTO | null> {
    return this.brandService.findById(query.brandId);
  }
}
