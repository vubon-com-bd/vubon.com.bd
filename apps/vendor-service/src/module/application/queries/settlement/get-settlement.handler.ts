import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSettlementQuery } from './get-settlement.query.js';
import {
  VENDOR_SETTLEMENT_SERVICE,
  type IVendorSettlementService,
} from '../../services/interfaces/vendor-settlement.service.interface.js';
import type { SettlementResponseDTO } from '../../dtos/responses/settlement-response.dto.js';

@QueryHandler(GetSettlementQuery)
export class GetSettlementHandler
  implements IQueryHandler<GetSettlementQuery, SettlementResponseDTO>
{
  constructor(
    @Inject(VENDOR_SETTLEMENT_SERVICE)
    private readonly service: IVendorSettlementService,
  ) {}

  async execute(q: GetSettlementQuery): Promise<SettlementResponseDTO> {
    return this.service.getById(q.settlementId);
  }
}
