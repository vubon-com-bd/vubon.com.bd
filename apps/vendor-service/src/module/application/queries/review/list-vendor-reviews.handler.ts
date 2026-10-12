import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListVendorReviewsQuery } from './list-vendor-reviews.query.js';
import {
  VENDOR_REVIEW_SERVICE,
  type IVendorReviewService,
} from '../../services/interfaces/vendor-review.service.interface.js';
import type { VendorReviewResponseDto } from '../../dtos/responses/vendor-review-response.dto.js';

@QueryHandler(ListVendorReviewsQuery)
export class ListVendorReviewsHandler
  implements IQueryHandler<ListVendorReviewsQuery, readonly VendorReviewResponseDto[]>
{
  constructor(@Inject(VENDOR_REVIEW_SERVICE) private readonly service: IVendorReviewService) {}
  async execute(query: ListVendorReviewsQuery): Promise<readonly VendorReviewResponseDto[]> {
    return this.service.listByVendor(query.vendorId);
  }
}
