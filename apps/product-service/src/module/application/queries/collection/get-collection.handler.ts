import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCollectionQuery } from './get-collection.query';
import type { ProductCollectionServiceInterface } from '../../services/interfaces/product-collection.service.interface';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto';

@QueryHandler(GetCollectionQuery)
export class GetCollectionHandler
  extends BaseQueryHandler<GetCollectionQuery, CollectionResponseDTO | null>
  implements IQueryHandler<GetCollectionQuery>
{
  readonly queryType = 'product.collection.get';

  constructor(private readonly collectionService: ProductCollectionServiceInterface) {
    super();
  }

  async execute(query: GetCollectionQuery): Promise<CollectionResponseDTO | null> {
    return this.collectionService.findById(query.collectionId);
  }
}
