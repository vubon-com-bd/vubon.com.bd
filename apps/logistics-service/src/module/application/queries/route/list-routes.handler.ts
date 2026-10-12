import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListRoutesQuery } from './list-routes.query.js';
import { ROUTE_SERVICE, type IRouteService } from '../../services/interfaces/route.service.interface.js';
import type { RouteListResponseDTO } from '../../dtos/responses/route/route-response.dto.js';
@QueryHandler(ListRoutesQuery)
export class ListRoutesHandler implements IQueryHandler<ListRoutesQuery, RouteListResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(q: ListRoutesQuery): Promise<RouteListResponseDTO> { return this.service.list(q.options); }
}
