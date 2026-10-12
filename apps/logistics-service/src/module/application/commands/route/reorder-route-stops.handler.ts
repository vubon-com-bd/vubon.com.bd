import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReorderRouteStopsCommand } from './reorder-route-stops.command.js';
import { ROUTE_SERVICE, type IRouteService } from '../../services/interfaces/route.service.interface.js';
import type { RouteResponseDTO } from '../../dtos/responses/route/route-response.dto.js';

@CommandHandler(ReorderRouteStopsCommand)
export class ReorderRouteStopsHandler implements ICommandHandler<ReorderRouteStopsCommand, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(c: ReorderRouteStopsCommand): Promise<RouteResponseDTO> { return this.service.reorderStops(c.dto, c.actorId); }
}
