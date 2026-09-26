import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductReviewEntity } from '../entities/product-review.entity';
import { ReviewIdVO } from '../value-objects/primitives/review-id.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';

export interface ProductReviewRepository
  extends BaseRepository<ProductReviewEntity, ReviewIdVO> {
  findByProduct(productId: ProductIdVO): Promise<readonly ProductReviewEntity[]>;
  findApprovedByProduct(productId: ProductIdVO): Promise<readonly ProductReviewEntity[]>;
  findByUser(productId: ProductIdVO, userId: string): Promise<ProductReviewEntity | null>;
  existsByUser(productId: ProductIdVO, userId: string): Promise<boolean>;
  averageRating(productId: ProductIdVO): Promise<number>;
  countByProduct(productId: ProductIdVO): Promise<number>;
}
