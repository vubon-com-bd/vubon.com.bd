import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCollectionQuery } from './get-collection.query.js';
import { COLLECTION_REPOSITORY, type CollectionRepository } from '../../../domain/repositories/collection.repository.interface.js';
import { CollectionMapper } from '../../mappers/collection.mapper.js';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto.js';

@QueryHandler(GetCollectionQuery)
export class GetCollectionHandler implements IQueryHandler<GetCollectionQuery, CollectionResponseDTO | null> {
  constructor(@Inject(COLLECTION_REPOSITORY) private readonly repo: CollectionRepository) {}
  async execute(q: GetCollectionQuery): Promise<CollectionResponseDTO | null> {
    const c = await this.repo.findById(q.collectionId);
    return c ? CollectionMapper.toResponse(c) : null;
  }
}
