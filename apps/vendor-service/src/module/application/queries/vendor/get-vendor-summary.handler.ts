import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorSummaryQuery } from './get-vendor-summary.query.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorSummaryDto } from '../../dtos/responses/vendor-response.dto.js';

@QueryHandler(GetVendorSummaryQuery)
export class GetVendorSummaryHandler implements IQueryHandler<GetVendorSummaryQuery, VendorSummaryDto> {
  constructor(@Inject(VENDOR_SERVICE) private readonly service: IVendorService) {}
  async execute(query: GetVendorSummaryQuery): Promise<VendorSummaryDto> {
    return this.service.getSummary(query.vendorId);
  }
}
