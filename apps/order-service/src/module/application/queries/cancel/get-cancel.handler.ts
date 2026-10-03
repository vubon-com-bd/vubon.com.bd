import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCancelQuery } from './get-cancel.query.js';
import { ORDER_CANCEL_SERVICE, type IOrderCancelService } from '../../services/interfaces/order-cancel.service.interface.js';
import type { CancelResponseDTO } from '../../dtos/responses/cancel-response.dto.js';

@QueryHandler(GetCancelQuery)
export class GetCancelHandler implements IQueryHandler<GetCancelQuery, CancelResponseDTO> {
  constructor(@Inject(ORDER_CANCEL_SERVICE) private readonly service: IOrderCancelService) {}
  async execute(q: GetCancelQuery): Promise<CancelResponseDTO> {
    return this.service.getById(q.cancelId);
  }
}
