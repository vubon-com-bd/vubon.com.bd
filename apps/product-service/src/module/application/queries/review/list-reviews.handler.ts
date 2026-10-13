import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListReviewsQuery } from './list-reviews.query.js';
import {
  REVIEW_SERVICE,
  type IProductReviewService,
} from '../../services/interfaces/product-review.service.interface.js';
import type { ReviewListResponseDTO } from '../../dtos/responses/review-response.dto.js';

@QueryHandler(ListReviewsQuery)
export class ListReviewsHandler
  implements IQueryHandler<ListReviewsQuery, ReviewListResponseDTO>
{
  constructor(
    @Inject(REVIEW_SERVICE)
    private readonly service: IProductReviewService,
  ) {}

  async execute(q: ListReviewsQuery): Promise<ReviewListResponseDTO> {
    return this.service.list(q.options);
  }
}
