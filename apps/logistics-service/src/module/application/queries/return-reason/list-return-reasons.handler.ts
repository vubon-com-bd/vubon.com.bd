import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListReturnReasonsQuery } from './list-return-reasons.query.js';
import { RETURN_REASON_SERVICE, type IReturnReasonService } from '@application/services/interfaces/return-reason.service.interface';
import type { ReturnReasonListResponseDTO } from '@application/dtos/responses/return-reason/index.js';

@QueryHandler(ListReturnReasonsQuery)
export class ListReturnReasonsHandler implements IQueryHandler<ListReturnReasonsQuery, ReturnReasonListResponseDTO> {
  constructor(@Inject(RETURN_REASON_SERVICE) private readonly service: IReturnReasonService) {}
  async execute(q: ListReturnReasonsQuery): Promise<ReturnReasonListResponseDTO> { return this.service.list(q.options); }
}
