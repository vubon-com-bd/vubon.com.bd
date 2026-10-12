import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CompleteRouteStopCommand } from './complete-route-stop.command.js';
import { ROUTE_SERVICE, type IRouteService } from '../../services/interfaces/route.service.interface.js';
import type { RouteResponseDTO } from '../../dtos/responses/route/route-response.dto.js';

@CommandHandler(CompleteRouteStopCommand)
export class CompleteRouteStopHandler implements ICommandHandler<CompleteRouteStopCommand, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(c: CompleteRouteStopCommand): Promise<RouteResponseDTO> { return this.service.completeStop(c.dto, c.actorId); }
}
