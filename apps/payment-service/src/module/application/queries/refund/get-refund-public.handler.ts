import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetRefundPublicQuery } from './get-refund-public.query.js';
import {
  REFUND_SERVICE,
  type IRefundService,
} from '../../services/interfaces/refund.service.interface.js';
import type { RefundPublicResponseDTO } from '../../dtos/responses/refund-response.dto.js';

@QueryHandler(GetRefundPublicQuery)
export class GetRefundPublicHandler
  implements IQueryHandler<GetRefundPublicQuery, RefundPublicResponseDTO>
{
  constructor(@Inject(REFUND_SERVICE) private readonly service: IRefundService) {}

  async execute(q: GetRefundPublicQuery): Promise<RefundPublicResponseDTO> {
    return this.service.getPublic(q.refundId);
  }
}
