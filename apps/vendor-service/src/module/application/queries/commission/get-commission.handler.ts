import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCommissionQuery } from './get-commission.query.js';
import {
  VENDOR_COMMISSION_SERVICE,
  type IVendorCommissionService,
} from '../../services/interfaces/vendor-commission.service.interface.js';
import type { CommissionResponseDTO } from '../../dtos/responses/commission-response.dto.js';

@QueryHandler(GetCommissionQuery)
export class GetCommissionHandler
  implements IQueryHandler<GetCommissionQuery, CommissionResponseDTO>
{
  constructor(
    @Inject(VENDOR_COMMISSION_SERVICE)
    private readonly service: IVendorCommissionService,
  ) {}

  async execute(q: GetCommissionQuery): Promise<CommissionResponseDTO> {
    return this.service.getById(q.commissionId);
  }
}
