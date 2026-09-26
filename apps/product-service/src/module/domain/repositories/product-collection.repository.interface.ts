import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductCollectionEntity } from '../entities/product-collection.entity';
import { CollectionIdVO } from '../value-objects/primitives/collection-id.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';

export interface ProductCollectionRepository
  extends BaseRepository<ProductCollectionEntity, CollectionIdVO> {
  findByName(name: string): Promise<ProductCollectionEntity | null>;
  findContainingProduct(productId: ProductIdVO): Promise<readonly ProductCollectionEntity[]>;
}
