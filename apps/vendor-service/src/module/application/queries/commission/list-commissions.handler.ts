import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListCommissionsQuery } from './list-commissions.query.js';
import {
  VENDOR_COMMISSION_SERVICE,
  type IVendorCommissionService,
} from '../../services/interfaces/vendor-commission.service.interface.js';
import type { CommissionListResponseDTO } from '../../dtos/responses/commission-response.dto.js';

@QueryHandler(ListCommissionsQuery)
export class ListCommissionsHandler
  implements IQueryHandler<ListCommissionsQuery, CommissionListResponseDTO>
{
  constructor(
    @Inject(VENDOR_COMMISSION_SERVICE)
    private readonly service: IVendorCommissionService,
  ) {}

  async execute(q: ListCommissionsQuery): Promise<CommissionListResponseDTO> {
    return this.service.listByVendor(q.vendorId);
  }
}
