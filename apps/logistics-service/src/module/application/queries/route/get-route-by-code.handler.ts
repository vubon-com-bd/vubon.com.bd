import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetRouteByCodeQuery } from './get-route-by-code.query.js';
import { ROUTE_SERVICE, type IRouteService } from '@application/services/interfaces/route.service.interface';
import type { RouteResponseDTO } from '@application/dtos/responses/route/index.js';

@QueryHandler(GetRouteByCodeQuery)
export class GetRouteByCodeHandler implements IQueryHandler<GetRouteByCodeQuery, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(q: GetRouteByCodeQuery): Promise<RouteResponseDTO> { return this.service.getByCode(q.code); }
}
