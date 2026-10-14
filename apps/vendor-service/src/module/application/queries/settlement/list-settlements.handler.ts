import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListSettlementsQuery } from './list-settlements.query.js';
import {
  VENDOR_SETTLEMENT_SERVICE,
  type IVendorSettlementService,
} from '../../services/interfaces/vendor-settlement.service.interface.js';
import type { SettlementListResponseDTO } from '../../dtos/responses/settlement-response.dto.js';

@QueryHandler(ListSettlementsQuery)
export class ListSettlementsHandler
  implements IQueryHandler<ListSettlementsQuery, SettlementListResponseDTO>
{
  constructor(
    @Inject(VENDOR_SETTLEMENT_SERVICE)
    private readonly service: IVendorSettlementService,
  ) {}

  async execute(q: ListSettlementsQuery): Promise<SettlementListResponseDTO> {
    return this.service.list(q.options);
  }
}
