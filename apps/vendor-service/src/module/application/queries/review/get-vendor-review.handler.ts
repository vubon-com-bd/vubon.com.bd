import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorReviewQuery } from './get-vendor-review.query.js';
import {
  VENDOR_REVIEW_SERVICE,
  type IVendorReviewService,
} from '../../services/interfaces/vendor-review.service.interface.js';
import type { VendorReviewResponseDto } from '../../dtos/responses/vendor-review-response.dto.js';

@QueryHandler(GetVendorReviewQuery)
export class GetVendorReviewHandler
  implements IQueryHandler<GetVendorReviewQuery, VendorReviewResponseDto>
{
  constructor(@Inject(VENDOR_REVIEW_SERVICE) private readonly service: IVendorReviewService) {}
  async execute(query: GetVendorReviewQuery): Promise<VendorReviewResponseDto> {
    return this.service.getById(query.reviewId);
  }
}
