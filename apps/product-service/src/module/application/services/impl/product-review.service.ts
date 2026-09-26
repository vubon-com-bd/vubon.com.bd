import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ProductReviewServiceInterface } from '../interfaces/product-review.service.interface';
import type { ProductReviewRepository } from '../../../domain/repositories/product-review.repository.interface';
import { ProductReviewEntity } from '../../../domain/entities/product-review.entity';
import { ReviewIdVO } from '../../../domain/value-objects/primitives/review-id.vo';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo';
import { ReviewRatingVO } from '../../../domain/value-objects/primitives/review-rating.vo';
import { ReviewContentVO } from '../../../domain/value-objects/primitives/review-content.vo';
import { ReviewOperationFailedError } from '../../errors/review.errors';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto';

@Injectable()
export class ProductReviewService
  extends BaseService<ProductReviewEntity, string>
  implements ProductReviewServiceInterface
{
  readonly name = 'ProductReviewService';

  constructor(
    private readonly reviewRepo: ProductReviewRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async submit(productId: string, userId: string, rating: number, content: string): Promise<ReviewResponseDTO> {
    void content;
    void ReviewRatingVO;
    void ProductIdVO;
    void userId;
    void productId;
    throw new ReviewOperationFailedError('submit not yet wired');
  }

  async approve(reviewId: string): Promise<ReviewResponseDTO> {
    const entity = await this.reviewRepo.findById(ReviewIdVO.create(reviewId));
    if (!entity) throw new ReviewOperationFailedError('review not found');
    const approved = entity.approve();
    await this.reviewRepo.save(approved);
    await this.publishEvents(approved);
    return this.toDTO(approved);
  }

  async reject(reviewId: string, reason: string): Promise<ReviewResponseDTO> {
    const entity = await this.reviewRepo.findById(ReviewIdVO.create(reviewId));
    if (!entity) throw new ReviewOperationFailedError('review not found');
    const rejected = entity.reject(reason);
    await this.reviewRepo.save(rejected);
    await this.publishEvents(rejected);
    return this.toDTO(rejected);
  }

  async delete(reviewId: string): Promise<void> {
    const entity = await this.reviewRepo.findById(ReviewIdVO.create(reviewId));
    if (!entity) throw new ReviewOperationFailedError('review not found');
    const deleted = entity.softDelete();
    await this.reviewRepo.save(deleted);
    await this.publishEvents(deleted);
  }

  async listByProduct(productId: string): Promise<readonly ReviewResponseDTO[]> {
    const rows = await this.reviewRepo.findByProduct(ProductIdVO.create(productId));
    return rows.map((r) => this.toDTO(r));
  }

  async getStats(productId: string): Promise<{ average: number; count: number }> {
    const productIdVO = ProductIdVO.create(productId);
    const average = await this.reviewRepo.averageRating(productIdVO);
    const count = await this.reviewRepo.countByProduct(productIdVO);
    return { average, count };
  }

  private toDTO(entity: ProductReviewEntity): ReviewResponseDTO {
    void ReviewContentVO;
    return {
      id: entity.id.value,
      productId: entity.productId.value,
      userId: entity.userId,
      rating: entity.rating.value,
      content: entity.content.value,
      status: entity.status.value,
    } as unknown as ReviewResponseDTO;
  }

  private async publishEvents(entity: ProductReviewEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
