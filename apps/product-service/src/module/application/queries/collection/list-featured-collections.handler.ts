import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListFeaturedCollectionsQuery } from './list-featured-collections.query.js';
import { COLLECTION_SERVICE, type ICollectionService } from '../../services/interfaces/collection.service.interface.js';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto.js';

@QueryHandler(ListFeaturedCollectionsQuery)
export class ListFeaturedCollectionsHandler
  implements IQueryHandler<ListFeaturedCollectionsQuery, readonly CollectionResponseDTO[]>
{
  constructor(@Inject(COLLECTION_SERVICE) private readonly service: ICollectionService) {}
  async execute(q: ListFeaturedCollectionsQuery): Promise<readonly CollectionResponseDTO[]> {
    return this.service.listFeatured(q.limit);
  }
}
