/**
 * Media Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductMediaEntity } from '../entities/product-media.entity.js';

export const MEDIA_REPOSITORY = Symbol('MEDIA_REPOSITORY');

export interface MediaRepository extends BaseRepository<ProductMediaEntity, string> {
  findByProductId(productId: string): Promise<readonly ProductMediaEntity[]>;
  findPrimaryByProductId(productId: string): Promise<ProductMediaEntity | null>;
  findImagesByProductId(productId: string): Promise<readonly ProductMediaEntity[]>;
  countByProductId(productId: string): Promise<number>;
  deleteByProductId(productId: string): Promise<number>;
  reorder(productId: string, orderedIds: readonly string[]): Promise<void>;
  clearPrimaryForProduct(productId: string): Promise<void>;
}
