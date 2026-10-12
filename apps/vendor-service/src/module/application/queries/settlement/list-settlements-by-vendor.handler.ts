import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListSettlementsByVendorQuery } from './list-settlements-by-vendor.query.js';
import {
  VENDOR_SETTLEMENT_SERVICE,
  type IVendorSettlementService,
} from '../../services/interfaces/vendor-settlement.service.interface.js';
import type { VendorSettlementResponseDto } from '../../dtos/responses/vendor-settlement-response.dto.js';

@QueryHandler(ListSettlementsByVendorQuery)
export class ListSettlementsByVendorHandler
  implements IQueryHandler<ListSettlementsByVendorQuery, readonly VendorSettlementResponseDto[]>
{
  constructor(@Inject(VENDOR_SETTLEMENT_SERVICE) private readonly service: IVendorSettlementService) {}
  async execute(query: ListSettlementsByVendorQuery): Promise<readonly VendorSettlementResponseDto[]> {
    return this.service.listByVendor(query.vendorId);
  }
}
