import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListDispatchesQuery } from './list-dispatches.query.js';
import { DISPATCH_SERVICE, type IDispatchService } from '../../services/interfaces/dispatch.service.interface.js';
import type { DispatchListResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';
@QueryHandler(ListDispatchesQuery)
export class ListDispatchesHandler implements IQueryHandler<ListDispatchesQuery, DispatchListResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(q: ListDispatchesQuery): Promise<DispatchListResponseDTO> { return this.service.list(q.options); }
}
