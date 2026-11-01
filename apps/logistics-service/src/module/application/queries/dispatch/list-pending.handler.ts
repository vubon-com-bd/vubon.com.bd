import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPendingDispatchQuery } from './list-pending.query.js';
import { DISPATCH_SERVICE, type IDispatchService } from '@application/services/interfaces/dispatch.service.interface';
import type { DispatchListResponseDTO } from '@application/dtos/responses/dispatch/index.js';

@QueryHandler(ListPendingDispatchQuery)
export class ListPendingDispatchHandler implements IQueryHandler<ListPendingDispatchQuery, DispatchListResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(q: ListPendingDispatchQuery): Promise<DispatchListResponseDTO> { return this.service.listPending(); }
}
