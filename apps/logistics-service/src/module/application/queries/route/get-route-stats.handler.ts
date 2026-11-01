import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetRouteStatsQuery } from './get-route-stats.query.js';
import { ROUTE_SERVICE, type IRouteService } from '@application/services/interfaces/route.service.interface';
import type { RouteStatsResponseDTO } from '@application/dtos/responses/route/index.js';

@QueryHandler(GetRouteStatsQuery)
export class GetRouteStatsHandler implements IQueryHandler<GetRouteStatsQuery, RouteStatsResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(): Promise<RouteStatsResponseDTO> { return this.service.getStats(); }
}
