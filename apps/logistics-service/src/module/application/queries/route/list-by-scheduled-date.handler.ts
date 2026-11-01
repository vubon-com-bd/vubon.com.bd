import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListByScheduledDateRouteQuery } from './list-by-scheduled-date.query.js';
import { ROUTE_SERVICE, type IRouteService } from '@application/services/interfaces/route.service.interface';
import type { RouteListResponseDTO } from '@application/dtos/responses/route/index.js';

@QueryHandler(ListByScheduledDateRouteQuery)
export class ListByScheduledDateRouteHandler implements IQueryHandler<ListByScheduledDateRouteQuery, RouteListResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(q: ListByScheduledDateRouteQuery): Promise<RouteListResponseDTO> { return this.service.listByScheduledDate(q.scheduledDate); }
}
