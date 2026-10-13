/**
 * Product Attribute Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ProductAttributeEntity } from '../entities/product-attribute.entity.js';
import type { AttributeIdVO } from '../value-objects/primitives/attribute-id.vo.js';
import type { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';

export const ATTRIBUTE_REPOSITORY = Symbol('ATTRIBUTE_REPOSITORY');

export interface AttributeListFilter {
  readonly productId?: string;
  readonly isFilterable?: boolean;
  readonly isSearchable?: boolean;
  readonly isRequired?: boolean;
}

export interface AttributeListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'name' | 'createdAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: AttributeListFilter;
}

export interface AttributePaginationResult {
  readonly items: readonly ProductAttributeEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface ProductAttributeRepository extends BaseRepository<ProductAttributeEntity, string> {
  findByIdVO(id: AttributeIdVO): Promise<ProductAttributeEntity | null>;

  findByProduct(productId: ProductIdVO): Promise<readonly ProductAttributeEntity[]>;
  findFilterableByProduct(productId: ProductIdVO): Promise<readonly ProductAttributeEntity[]>;
  findSearchableByProduct(productId: ProductIdVO): Promise<readonly ProductAttributeEntity[]>;

  findPaginated(options: AttributeListOptions): Promise<AttributePaginationResult>;

  countByProduct(productId: ProductIdVO): Promise<number>;

  deleteByProduct(productId: ProductIdVO): Promise<number>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
