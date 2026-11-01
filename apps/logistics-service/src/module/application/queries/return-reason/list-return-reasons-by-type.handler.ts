import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListReturnReasonsByTypeQuery } from './list-return-reasons-by-type.query.js';
import { RETURN_REASON_SERVICE, type IReturnReasonService } from '@application/services/interfaces/return-reason.service.interface';
import type { ReturnReasonListResponseDTO } from '@application/dtos/responses/return-reason/index.js';

@QueryHandler(ListReturnReasonsByTypeQuery)
export class ListReturnReasonsByTypeHandler implements IQueryHandler<ListReturnReasonsByTypeQuery, ReturnReasonListResponseDTO> {
  constructor(@Inject(RETURN_REASON_SERVICE) private readonly service: IReturnReasonService) {}
  async execute(q: ListReturnReasonsByTypeQuery): Promise<ReturnReasonListResponseDTO> { return this.service.listByType(q.reasonType); }
}
