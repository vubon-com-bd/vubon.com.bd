import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListCollectionsQuery } from './list-collections.query.js';
import {
  COLLECTION_SERVICE,
  type IProductCollectionService,
} from '../../services/interfaces/product-collection.service.interface.js';
import type { CollectionListResponseDTO } from '../../dtos/responses/collection-response.dto.js';

@QueryHandler(ListCollectionsQuery)
export class ListCollectionsHandler
  implements IQueryHandler<ListCollectionsQuery, CollectionListResponseDTO>
{
  constructor(
    @Inject(COLLECTION_SERVICE)
    private readonly service: IProductCollectionService,
  ) {}

  async execute(q: ListCollectionsQuery): Promise<CollectionListResponseDTO> {
    return this.service.list(q.options);
  }
}
