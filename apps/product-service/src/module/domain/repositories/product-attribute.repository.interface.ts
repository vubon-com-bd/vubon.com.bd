import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductAttributeEntity } from '../entities/product-attribute.entity';
import { AttributeIdVO } from '../value-objects/primitives/attribute-id.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';

export interface ProductAttributeRepository
  extends BaseRepository<ProductAttributeEntity, AttributeIdVO> {
  findByProduct(productId: ProductIdVO): Promise<readonly ProductAttributeEntity[]>;
  deleteByProduct(productId: ProductIdVO): Promise<void>;
}
