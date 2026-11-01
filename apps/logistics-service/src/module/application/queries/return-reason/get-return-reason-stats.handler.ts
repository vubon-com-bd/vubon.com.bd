import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetReturnReasonStatsQuery } from './get-return-reason-stats.query.js';
import { RETURN_REASON_SERVICE, type IReturnReasonService } from '@application/services/interfaces/return-reason.service.interface';
import type { ReturnReasonStatsResponseDTO } from '@application/dtos/responses/return-reason/index.js';

@QueryHandler(GetReturnReasonStatsQuery)
export class GetReturnReasonStatsHandler implements IQueryHandler<GetReturnReasonStatsQuery, ReturnReasonStatsResponseDTO> {
  constructor(@Inject(RETURN_REASON_SERVICE) private readonly service: IReturnReasonService) {}
  async execute(): Promise<ReturnReasonStatsResponseDTO> { return this.service.getStats(); }
}
