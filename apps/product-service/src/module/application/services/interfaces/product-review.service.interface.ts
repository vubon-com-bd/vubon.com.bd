import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ProductReviewEntity } from '../../../domain/entities/product-review.entity';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto';

export interface ProductReviewServiceInterface
  extends BaseServiceInterface<ProductReviewEntity, string> {
  submit(productId: string, userId: string, rating: number, content: string): Promise<ReviewResponseDTO>;
  approve(reviewId: string): Promise<ReviewResponseDTO>;
  reject(reviewId: string, reason: string): Promise<ReviewResponseDTO>;
  delete(reviewId: string): Promise<void>;
  listByProduct(productId: string): Promise<readonly ReviewResponseDTO[]>;
  getStats(productId: string): Promise<{ average: number; count: number }>;
}
