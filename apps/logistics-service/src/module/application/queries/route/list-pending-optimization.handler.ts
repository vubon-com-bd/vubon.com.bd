import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPendingOptimizationQuery } from './list-pending-optimization.query.js';
import { ROUTE_SERVICE, type IRouteService } from '@application/services/interfaces/route.service.interface';
import type { RouteListResponseDTO } from '@application/dtos/responses/route/index.js';

@QueryHandler(ListPendingOptimizationQuery)
export class ListPendingOptimizationHandler implements IQueryHandler<ListPendingOptimizationQuery, RouteListResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(): Promise<RouteListResponseDTO> { return this.service.listPendingOptimization(); }
}
