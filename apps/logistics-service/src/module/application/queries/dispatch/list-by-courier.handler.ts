import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListByCourierDispatchQuery } from './list-by-courier.query.js';
import { DISPATCH_SERVICE, type IDispatchService } from '@application/services/interfaces/dispatch.service.interface';
import type { DispatchListResponseDTO } from '@application/dtos/responses/dispatch/index.js';

@QueryHandler(ListByCourierDispatchQuery)
export class ListByCourierDispatchHandler implements IQueryHandler<ListByCourierDispatchQuery, DispatchListResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(q: ListByCourierDispatchQuery): Promise<DispatchListResponseDTO> { return this.service.listByCourier(q.courierId); }
}
