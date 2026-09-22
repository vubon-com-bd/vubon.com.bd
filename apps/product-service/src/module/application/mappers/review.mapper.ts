import { ProductReviewEntity } from '../../domain/entities/product-review.entity';
import type { ReviewResponseDTO } from '../dtos/responses/review-response.dto';

export class ReviewMapper {
  static toResponse(entity: ProductReviewEntity): ReviewResponseDTO {
    return {
      id: entity.id.value,
      productId: entity.productId.value,
      userId: entity.userId,
      rating: entity.rating.value,
      content: entity.content.value,
      status: entity.status.value,
    } as unknown as ReviewResponseDTO;
  }
}
