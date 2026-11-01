import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetReturnReasonByCodeQuery } from './get-return-reason-by-code.query.js';
import { RETURN_REASON_SERVICE, type IReturnReasonService } from '@application/services/interfaces/return-reason.service.interface';
import type { ReturnReasonResponseDTO } from '@application/dtos/responses/return-reason/index.js';

@QueryHandler(GetReturnReasonByCodeQuery)
export class GetReturnReasonByCodeHandler implements IQueryHandler<GetReturnReasonByCodeQuery, ReturnReasonResponseDTO> {
  constructor(@Inject(RETURN_REASON_SERVICE) private readonly service: IReturnReasonService) {}
  async execute(q: GetReturnReasonByCodeQuery): Promise<ReturnReasonResponseDTO> { return this.service.getByCode(q.code); }
}
