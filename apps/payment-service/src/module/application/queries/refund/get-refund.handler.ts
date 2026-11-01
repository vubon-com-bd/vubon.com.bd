/**
 * GetRefundHandler
 * @module payment-service/application/queries/refund
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetRefundQuery } from './get-refund.query.js';
import {
  REFUND_SERVICE,
  type IRefundService,
} from '@application/services/interfaces/refund.service.interface.js';
import type { RefundResponseDTO } from '@application/dtos/responses/refund-response.dto.js';

@QueryHandler(GetRefundQuery)
export class GetRefundHandler
  implements IQueryHandler<GetRefundQuery, RefundResponseDTO>
{
  constructor(
    @Inject(REFUND_SERVICE)
    private readonly service: IRefundService,
  ) {}
  async execute(q: GetRefundQuery): Promise<RefundResponseDTO> {
    return this.service.getById(q.refundId);
  }
}
