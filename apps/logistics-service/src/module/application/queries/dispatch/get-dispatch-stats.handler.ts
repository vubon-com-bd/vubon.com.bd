import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetDispatchStatsQuery } from './get-dispatch-stats.query.js';
import { DISPATCH_SERVICE, type IDispatchService } from '@application/services/interfaces/dispatch.service.interface';
import type { DispatchStatsResponseDTO } from '@application/dtos/responses/dispatch/index.js';

@QueryHandler(GetDispatchStatsQuery)
export class GetDispatchStatsHandler implements IQueryHandler<GetDispatchStatsQuery, DispatchStatsResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(q: GetDispatchStatsQuery): Promise<DispatchStatsResponseDTO> { return this.service.getStats(); }
}
