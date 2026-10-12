import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPublicVendorReviewsQuery } from './list-public-vendor-reviews.query.js';
import {
  VENDOR_REVIEW_SERVICE,
  type IVendorReviewService,
} from '../../services/interfaces/vendor-review.service.interface.js';
import type { VendorReviewPublicDto } from '../../dtos/responses/vendor-review-response.dto.js';

@QueryHandler(ListPublicVendorReviewsQuery)
export class ListPublicVendorReviewsHandler
  implements IQueryHandler<ListPublicVendorReviewsQuery, readonly VendorReviewPublicDto[]>
{
  constructor(@Inject(VENDOR_REVIEW_SERVICE) private readonly service: IVendorReviewService) {}
  async execute(query: ListPublicVendorReviewsQuery): Promise<readonly VendorReviewPublicDto[]> {
    return this.service.listPublicByVendor(query.vendorId);
  }
}
