import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListCollectionsQuery } from './list-collections.query';
import type { ProductCollectionServiceInterface } from '../../services/interfaces/product-collection.service.interface';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto';

@QueryHandler(ListCollectionsQuery)
export class ListCollectionsHandler
  extends BaseQueryHandler<ListCollectionsQuery, readonly CollectionResponseDTO[]>
  implements IQueryHandler<ListCollectionsQuery>
{
  readonly queryType = 'product.collection.list';

  constructor(private readonly collectionService: ProductCollectionServiceInterface) {
    super();
  }

  async execute(_query: ListCollectionsQuery): Promise<readonly CollectionResponseDTO[]> {
    return this.collectionService.list();
  }
}
