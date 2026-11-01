import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListByDriverDispatchQuery } from './list-by-driver.query.js';
import { DISPATCH_SERVICE, type IDispatchService } from '@application/services/interfaces/dispatch.service.interface';
import type { DispatchListResponseDTO } from '@application/dtos/responses/dispatch/index.js';

@QueryHandler(ListByDriverDispatchQuery)
export class ListByDriverDispatchHandler implements IQueryHandler<ListByDriverDispatchQuery, DispatchListResponseDTO> {
  constructor(@Inject(DISPATCH_SERVICE) private readonly service: IDispatchService) {}
  async execute(q: ListByDriverDispatchQuery): Promise<DispatchListResponseDTO> { return this.service.listByDriver(q.driverId); }
}
