import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCollectionQuery } from './get-collection.query.js';
import {
  COLLECTION_SERVICE,
  type IProductCollectionService,
} from '../../services/interfaces/product-collection.service.interface.js';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto.js';

@QueryHandler(GetCollectionQuery)
export class GetCollectionHandler
  implements IQueryHandler<GetCollectionQuery, CollectionResponseDTO>
{
  constructor(
    @Inject(COLLECTION_SERVICE)
    private readonly service: IProductCollectionService,
  ) {}

  async execute(q: GetCollectionQuery): Promise<CollectionResponseDTO> {
    return this.service.getById(q.collectionId);
  }
}
