import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveRouteStopCommand } from './remove-route-stop.command.js';
import { ROUTE_SERVICE, type IRouteService } from '../../services/interfaces/route.service.interface.js';
import type { RouteResponseDTO } from '../../dtos/responses/route/route-response.dto.js';

@CommandHandler(RemoveRouteStopCommand)
export class RemoveRouteStopHandler implements ICommandHandler<RemoveRouteStopCommand, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(c: RemoveRouteStopCommand): Promise<RouteResponseDTO> { return this.service.removeStop(c.dto, c.actorId); }
}
