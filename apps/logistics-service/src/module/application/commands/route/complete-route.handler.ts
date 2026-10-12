import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CompleteRouteCommand } from './complete-route.command.js';
import { ROUTE_SERVICE, type IRouteService } from '../../services/interfaces/route.service.interface.js';
import type { RouteResponseDTO } from '../../dtos/responses/route/route-response.dto.js';

@CommandHandler(CompleteRouteCommand)
export class CompleteRouteHandler implements ICommandHandler<CompleteRouteCommand, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(c: CompleteRouteCommand): Promise<RouteResponseDTO> { return this.service.complete(c.dto, c.actorId); }
}
