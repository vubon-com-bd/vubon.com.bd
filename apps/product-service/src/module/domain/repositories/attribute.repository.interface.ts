/**
 * Attribute Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductAttributeEntity } from '../entities/product-attribute.entity.js';

export const ATTRIBUTE_REPOSITORY = Symbol('ATTRIBUTE_REPOSITORY');

export interface AttributeRepository extends BaseRepository<ProductAttributeEntity, string> {
  findByProductId(productId: string): Promise<readonly ProductAttributeEntity[]>;
  findBySlug(productId: string, slug: string): Promise<ProductAttributeEntity | null>;
  findFilterable(productId: string): Promise<readonly ProductAttributeEntity[]>;
  findSearchable(productId: string): Promise<readonly ProductAttributeEntity[]>;
  countByProductId(productId: string): Promise<number>;
  deleteByProductId(productId: string): Promise<number>;
}
