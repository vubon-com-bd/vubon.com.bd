import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CompleteRouteCommand } from './complete.command.js';
import { ROUTE_SERVICE, type IRouteService } from '@application/services/interfaces/route.service.interface';
import type { RouteResponseDTO } from '@application/dtos/responses/route/index.js';

@CommandHandler(CompleteRouteCommand)
export class CompleteRouteHandler implements ICommandHandler<CompleteRouteCommand, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(c: CompleteRouteCommand): Promise<RouteResponseDTO> { return this.service.complete(c.dto, c.actorId); }
}
