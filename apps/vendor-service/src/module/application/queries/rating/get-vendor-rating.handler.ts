import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorRatingQuery } from './get-vendor-rating.query.js';
import {
  VENDOR_RATING_SERVICE,
  type IVendorRatingService,
} from '../../services/interfaces/vendor-rating.service.interface.js';
import type { VendorRatingResponseDto } from '../../dtos/responses/vendor-rating-response.dto.js';

@QueryHandler(GetVendorRatingQuery)
export class GetVendorRatingHandler
  implements IQueryHandler<GetVendorRatingQuery, VendorRatingResponseDto>
{
  constructor(@Inject(VENDOR_RATING_SERVICE) private readonly service: IVendorRatingService) {}
  async execute(query: GetVendorRatingQuery): Promise<VendorRatingResponseDto> {
    return this.service.getByVendorId(query.vendorId);
  }
}
