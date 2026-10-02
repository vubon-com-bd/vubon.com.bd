import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListReviewsByProductQuery } from './list-reviews-by-product.query.js';
import { REVIEW_SERVICE, type IReviewService } from '../../services/interfaces/review.service.interface.js';
import type { ReviewResponseDTO } from '../../dtos/responses/review-response.dto.js';

export interface ListReviewsResult {
  readonly items: readonly ReviewResponseDTO[];
  readonly total: number;
}

@QueryHandler(ListReviewsByProductQuery)
export class ListReviewsByProductHandler implements IQueryHandler<ListReviewsByProductQuery, ListReviewsResult> {
  constructor(@Inject(REVIEW_SERVICE) private readonly service: IReviewService) {}
  async execute(q: ListReviewsByProductQuery): Promise<ListReviewsResult> {
    return this.service.listByProduct(q.productId, q.page, q.limit);
  }
}
