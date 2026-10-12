import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPayoutQuery } from './get-payout.query.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { VendorPayoutResponseDto } from '../../dtos/responses/vendor-payout-response.dto.js';

@QueryHandler(GetPayoutQuery)
export class GetPayoutHandler
  implements IQueryHandler<GetPayoutQuery, VendorPayoutResponseDto>
{
  constructor(@Inject(VENDOR_PAYOUT_SERVICE) private readonly service: IVendorPayoutService) {}
  async execute(query: GetPayoutQuery): Promise<VendorPayoutResponseDto> {
    return this.service.getById(query.payoutId);
  }
}
