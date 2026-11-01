import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListInTransitDispatchQuery } from './list-in-transit.query.js';
import { DISPATCH_SERVICE, type IDispatchService } from '@application/services/interfaces/dispatch.service.interface';
import type { DispatchListResponseDTO } from '@application/dtos/responses/dispatch/index.js';

@QueryHandler(ListInTransitDispatchQuery)
export class ListInTransitDispatchHandler implements IQueryHandler<ListInTransitDispatchQuery, DispatchListResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(q: ListInTransitDispatchQuery): Promise<DispatchListResponseDTO> { return this.service.listInTransit(); }
}
