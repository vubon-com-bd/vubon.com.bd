import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetRouteQuery } from './get-route.query.js';
import { ROUTE_SERVICE, type IRouteService } from '@application/services/interfaces/route.service.interface';
import type { RouteResponseDTO } from '@application/dtos/responses/route/index.js';

@QueryHandler(GetRouteQuery)
export class GetRouteHandler implements IQueryHandler<GetRouteQuery, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(q: GetRouteQuery): Promise<RouteResponseDTO> { return this.service.getById(q.routeId); }
}
