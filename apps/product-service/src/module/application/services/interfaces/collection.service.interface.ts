/**
 * ICollectionService Interface
 */
import type { CreateCollectionRequestDTO } from '../../dtos/requests/collection/create-collection.dto.js';
import type { UpdateCollectionRequestDTO } from '../../dtos/requests/collection/update-collection.dto.js';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto.js';

export const COLLECTION_SERVICE = Symbol('COLLECTION_SERVICE');

export interface ICollectionService {
  create(dto: CreateCollectionRequestDTO, actorId: string): Promise<CollectionResponseDTO>;
  update(dto: UpdateCollectionRequestDTO): Promise<CollectionResponseDTO>;
  remove(collectionId: string, actorId: string): Promise<void>;
  addProduct(collectionId: string, productId: string, actorId: string): Promise<CollectionResponseDTO>;
  removeProduct(collectionId: string, productId: string, actorId: string): Promise<CollectionResponseDTO>;
  listFeatured(limit?: number): Promise<readonly CollectionResponseDTO[]>;
  listActive(): Promise<readonly CollectionResponseDTO[]>;
}
