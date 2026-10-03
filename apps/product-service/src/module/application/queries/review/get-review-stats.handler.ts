import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetReviewStatsQuery } from './get-review-stats.query.js';
import { REVIEW_SERVICE, type IReviewService } from '../../services/interfaces/review.service.interface.js';
import type { ReviewStatsResponseDTO } from '../../dtos/responses/review-response.dto.js';

@QueryHandler(GetReviewStatsQuery)
export class GetReviewStatsHandler implements IQueryHandler<GetReviewStatsQuery, ReviewStatsResponseDTO | null> {
  constructor(@Inject(REVIEW_SERVICE) private readonly service: IReviewService) {}
  async execute(q: GetReviewStatsQuery): Promise<ReviewStatsResponseDTO | null> {
    return this.service.statsByProduct(q.productId);
  }
}
