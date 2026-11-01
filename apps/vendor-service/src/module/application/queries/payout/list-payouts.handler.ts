import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPayoutsQuery } from './list-payouts.query.js';
import {
  VENDOR_PAYOUT_SERVICE,
  type IVendorPayoutService,
} from '../../services/interfaces/vendor-payout.service.interface.js';
import type { PayoutListResponseDTO } from '../../dtos/responses/payout-response.dto.js';

@QueryHandler(ListPayoutsQuery)
export class ListPayoutsHandler
  implements IQueryHandler<ListPayoutsQuery, PayoutListResponseDTO>
{
  constructor(
    @Inject(VENDOR_PAYOUT_SERVICE)
    private readonly service: IVendorPayoutService,
  ) {}

  async execute(q: ListPayoutsQuery): Promise<PayoutListResponseDTO> {
    return this.service.list(q.options);
  }
}
