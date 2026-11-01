import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetReturnReasonQuery } from './get-return-reason.query.js';
import { RETURN_REASON_SERVICE, type IReturnReasonService } from '@application/services/interfaces/return-reason.service.interface';
import type { ReturnReasonResponseDTO } from '@application/dtos/responses/return-reason/index.js';

@QueryHandler(GetReturnReasonQuery)
export class GetReturnReasonHandler implements IQueryHandler<GetReturnReasonQuery, ReturnReasonResponseDTO> {
  constructor(@Inject(RETURN_REASON_SERVICE) private readonly service: IReturnReasonService) {}
  async execute(q: GetReturnReasonQuery): Promise<ReturnReasonResponseDTO> { return this.service.getById(q.reasonId); }
}
