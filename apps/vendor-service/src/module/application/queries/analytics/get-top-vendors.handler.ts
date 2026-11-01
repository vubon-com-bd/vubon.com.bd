import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTopVendorsQuery } from './get-top-vendors.query.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorSummaryResponseDTO } from '../../dtos/responses/vendor-response.dto.js';

@QueryHandler(GetTopVendorsQuery)
export class GetTopVendorsHandler
  implements IQueryHandler<GetTopVendorsQuery, readonly VendorSummaryResponseDTO[]>
{
  constructor(
    @Inject(VENDOR_SERVICE)
    private readonly service: IVendorService,
  ) {}

  async execute(q: GetTopVendorsQuery): Promise<readonly VendorSummaryResponseDTO[]> {
    return this.service.getTopRated(q.limit);
  }
}
