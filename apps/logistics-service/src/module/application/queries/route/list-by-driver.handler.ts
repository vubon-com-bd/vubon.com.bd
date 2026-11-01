import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListByDriverRouteQuery } from './list-by-driver.query.js';
import { ROUTE_SERVICE, type IRouteService } from '@application/services/interfaces/route.service.interface';
import type { RouteListResponseDTO } from '@application/dtos/responses/route/index.js';

@QueryHandler(ListByDriverRouteQuery)
export class ListByDriverRouteHandler implements IQueryHandler<ListByDriverRouteQuery, RouteListResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(q: ListByDriverRouteQuery): Promise<RouteListResponseDTO> { return this.service.listByDriver(q.driverId); }
}
