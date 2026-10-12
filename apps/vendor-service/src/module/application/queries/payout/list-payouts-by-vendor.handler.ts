import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPayoutsByVendorQuery } from './list-payouts-by-vendor.query.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { VendorPayoutResponseDto } from '../../dtos/responses/vendor-payout-response.dto.js';

@QueryHandler(ListPayoutsByVendorQuery)
export class ListPayoutsByVendorHandler
  implements IQueryHandler<ListPayoutsByVendorQuery, readonly VendorPayoutResponseDto[]>
{
  constructor(@Inject(VENDOR_PAYOUT_SERVICE) private readonly service: IVendorPayoutService) {}
  async execute(query: ListPayoutsByVendorQuery): Promise<readonly VendorPayoutResponseDto[]> {
    return this.service.listByVendor(query.vendorId);
  }
}
