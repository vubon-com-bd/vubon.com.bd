import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListDispatchesQuery } from './list-dispatches.query.js';
import { DISPATCH_SERVICE, type IDispatchService } from '@application/services/interfaces/dispatch.service.interface';
import type { DispatchListResponseDTO } from '@application/dtos/responses/dispatch/index.js';

@QueryHandler(ListDispatchesQuery)
export class ListDispatchesHandler implements IQueryHandler<ListDispatchesQuery, DispatchListResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(q: ListDispatchesQuery): Promise<DispatchListResponseDTO> { return this.service.list(q.options); }
}
