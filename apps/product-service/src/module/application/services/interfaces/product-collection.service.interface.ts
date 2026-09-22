import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ProductCollectionEntity } from '../../../domain/entities/product-collection.entity';
import type { CreateCollectionRequestDTO } from '../../dtos/requests/collection/create-collection.dto';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto';

export interface ProductCollectionServiceInterface
  extends BaseServiceInterface<ProductCollectionEntity, string> {
  create(input: CreateCollectionRequestDTO): Promise<CollectionResponseDTO>;
  update(collectionId: string, name: string): Promise<CollectionResponseDTO>;
  delete(collectionId: string): Promise<void>;
  addProduct(collectionId: string, productId: string): Promise<void>;
  findById(collectionId: string): Promise<CollectionResponseDTO | null>;
  list(): Promise<readonly CollectionResponseDTO[]>;
}
