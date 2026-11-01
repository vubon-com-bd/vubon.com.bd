/**
 * Product Media Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ProductMediaEntity } from '../entities/product-media.entity.js';
import type { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';

export const MEDIA_REPOSITORY = Symbol('MEDIA_REPOSITORY');

export interface ProductMediaRepository extends BaseRepository<ProductMediaEntity, string> {
  findByProduct(productId: ProductIdVO): Promise<ProductMediaEntity | null>;
  findAllByProduct(productId: ProductIdVO): Promise<readonly ProductMediaEntity[]>;

  deleteByProduct(productId: ProductIdVO): Promise<number>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
