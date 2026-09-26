import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductMediaEntity } from '../entities/product-media.entity';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';

export interface ProductMediaRepository
  extends BaseRepository<ProductMediaEntity, string> {
  findByProduct(productId: ProductIdVO): Promise<readonly ProductMediaEntity[]>;
  countByProduct(productId: ProductIdVO): Promise<number>;
  deleteByProduct(productId: ProductIdVO): Promise<void>;
}
