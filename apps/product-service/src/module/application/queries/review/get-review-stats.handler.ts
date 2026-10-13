import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetReviewStatsQuery } from './get-review-stats.query.js';
import {
  REVIEW_SERVICE,
  type IProductReviewService,
} from '../../services/interfaces/product-review.service.interface.js';
import type { ReviewStatsResponseDTO } from '../../dtos/responses/review-response.dto.js';

@QueryHandler(GetReviewStatsQuery)
export class GetReviewStatsHandler
  implements IQueryHandler<GetReviewStatsQuery, ReviewStatsResponseDTO>
{
  constructor(
    @Inject(REVIEW_SERVICE)
    private readonly service: IProductReviewService,
  ) {}

  async execute(q: GetReviewStatsQuery): Promise<ReviewStatsResponseDTO> {
    return this.service.getStats(q.productId);
  }
}
