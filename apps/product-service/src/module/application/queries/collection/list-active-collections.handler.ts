import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListActiveCollectionsQuery } from './list-active-collections.query.js';
import { COLLECTION_SERVICE, type ICollectionService } from '../../services/interfaces/collection.service.interface.js';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto.js';

@QueryHandler(ListActiveCollectionsQuery)
export class ListActiveCollectionsHandler
  implements IQueryHandler<ListActiveCollectionsQuery, readonly CollectionResponseDTO[]>
{
  constructor(@Inject(COLLECTION_SERVICE) private readonly service: ICollectionService) {}
  async execute(): Promise<readonly CollectionResponseDTO[]> {
    return this.service.listActive();
  }
}
