import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListByWarehouseRouteQuery } from './list-by-warehouse.query.js';
import { ROUTE_SERVICE, type IRouteService } from '@application/services/interfaces/route.service.interface';
import type { RouteListResponseDTO } from '@application/dtos/responses/route/index.js';

@QueryHandler(ListByWarehouseRouteQuery)
export class ListByWarehouseRouteHandler implements IQueryHandler<ListByWarehouseRouteQuery, RouteListResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(q: ListByWarehouseRouteQuery): Promise<RouteListResponseDTO> { return this.service.listByWarehouse(q.warehouseId); }
}
