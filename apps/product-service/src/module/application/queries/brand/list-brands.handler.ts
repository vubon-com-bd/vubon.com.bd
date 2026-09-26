import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListBrandsQuery } from './list-brands.query';
import type { BrandServiceInterface } from '../../services/interfaces/brand.service.interface';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto';

@QueryHandler(ListBrandsQuery)
export class ListBrandsHandler
  extends BaseQueryHandler<ListBrandsQuery, readonly BrandResponseDTO[]>
  implements IQueryHandler<ListBrandsQuery>
{
  readonly queryType = 'product.brand.list';

  constructor(private readonly brandService: BrandServiceInterface) {
    super();
  }

  async execute(_query: ListBrandsQuery): Promise<readonly BrandResponseDTO[]> {
    return this.brandService.list();
  }
}
