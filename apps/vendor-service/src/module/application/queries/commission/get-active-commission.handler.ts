import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetActiveCommissionQuery } from './get-active-commission.query.js';
import {
  VENDOR_COMMISSION_SERVICE,
  type IVendorCommissionService,
} from '../../services/interfaces/vendor-commission.service.interface.js';
import type { VendorCommissionResponseDto } from '../../dtos/responses/vendor-commission-response.dto.js';

@QueryHandler(GetActiveCommissionQuery)
export class GetActiveCommissionHandler
  implements IQueryHandler<GetActiveCommissionQuery, VendorCommissionResponseDto>
{
  constructor(@Inject(VENDOR_COMMISSION_SERVICE) private readonly service: IVendorCommissionService) {}
  async execute(query: GetActiveCommissionQuery): Promise<VendorCommissionResponseDto> {
    return this.service.getActiveByVendorId(query.vendorId);
  }
}
