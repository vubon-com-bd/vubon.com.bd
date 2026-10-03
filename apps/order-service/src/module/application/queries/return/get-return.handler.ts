import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetReturnQuery } from './get-return.query.js';
import { ORDER_RETURN_SERVICE, type IOrderReturnService } from '../../services/interfaces/order-return.service.interface.js';
import type { ReturnResponseDTO } from '../../dtos/responses/return-response.dto.js';

@QueryHandler(GetReturnQuery)
export class GetReturnHandler implements IQueryHandler<GetReturnQuery, ReturnResponseDTO> {
  constructor(@Inject(ORDER_RETURN_SERVICE) private readonly service: IOrderReturnService) {}
  async execute(q: GetReturnQuery): Promise<ReturnResponseDTO> {
    return this.service.getById(q.returnId);
  }
}
