import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListActiveReturnReasonsQuery } from './list-active-return-reasons.query.js';
import { RETURN_REASON_SERVICE, type IReturnReasonService } from '@application/services/interfaces/return-reason.service.interface';
import type { ReturnReasonListResponseDTO } from '@application/dtos/responses/return-reason/index.js';

@QueryHandler(ListActiveReturnReasonsQuery)
export class ListActiveReturnReasonsHandler implements IQueryHandler<ListActiveReturnReasonsQuery, ReturnReasonListResponseDTO> {
  constructor(@Inject(RETURN_REASON_SERVICE) private readonly service: IReturnReasonService) {}
  async execute(): Promise<ReturnReasonListResponseDTO> { return this.service.listActive(); }
}
