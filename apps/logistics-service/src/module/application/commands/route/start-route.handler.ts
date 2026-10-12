import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartRouteCommand } from './start-route.command.js';
import { ROUTE_SERVICE, type IRouteService } from '../../services/interfaces/route.service.interface.js';
import type { RouteResponseDTO } from '../../dtos/responses/route/route-response.dto.js';

@CommandHandler(StartRouteCommand)
export class StartRouteHandler implements ICommandHandler<StartRouteCommand, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(c: StartRouteCommand): Promise<RouteResponseDTO> { return this.service.start(c.dto, c.actorId); }
}
