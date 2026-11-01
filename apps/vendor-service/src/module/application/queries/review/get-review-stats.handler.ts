import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetReviewStatsQuery } from './get-review-stats.query.js';
import {
  VENDOR_REVIEW_SERVICE,
  type IVendorReviewService,
} from '../../services/interfaces/vendor-review.service.interface.js';
import type { ReviewStatsResponseDTO } from '../../dtos/responses/review-response.dto.js';

@QueryHandler(GetReviewStatsQuery)
export class GetReviewStatsHandler
  implements IQueryHandler<GetReviewStatsQuery, ReviewStatsResponseDTO>
{
  constructor(
    @Inject(VENDOR_REVIEW_SERVICE)
    private readonly service: IVendorReviewService,
  ) {}

  async execute(q: GetReviewStatsQuery): Promise<ReviewStatsResponseDTO> {
    return this.service.getStats(q.vendorId);
  }
}
