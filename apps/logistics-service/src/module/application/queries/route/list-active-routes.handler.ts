import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListActiveRoutesQuery } from './list-active-routes.query.js';
import { ROUTE_SERVICE, type IRouteService } from '@application/services/interfaces/route.service.interface';
import type { RouteListResponseDTO } from '@application/dtos/responses/route/index.js';

@QueryHandler(ListActiveRoutesQuery)
export class ListActiveRoutesHandler implements IQueryHandler<ListActiveRoutesQuery, RouteListResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(): Promise<RouteListResponseDTO> { return this.service.listActive(); }
}
