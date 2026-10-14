import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListReviewsQuery } from './list-reviews.query.js';
import {
  VENDOR_REVIEW_SERVICE,
  type IVendorReviewService,
} from '../../services/interfaces/vendor-review.service.interface.js';
import type { ReviewListResponseDTO } from '../../dtos/responses/review-response.dto.js';

@QueryHandler(ListReviewsQuery)
export class ListReviewsHandler
  implements IQueryHandler<ListReviewsQuery, ReviewListResponseDTO>
{
  constructor(
    @Inject(VENDOR_REVIEW_SERVICE)
    private readonly service: IVendorReviewService,
  ) {}

  async execute(q: ListReviewsQuery): Promise<ReviewListResponseDTO> {
    return this.service.listByVendor(q.vendorId, q.options);
  }
}
