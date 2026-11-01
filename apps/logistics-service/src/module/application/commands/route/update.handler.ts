import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateRouteCommand } from './update.command.js';
import { ROUTE_SERVICE, type IRouteService } from '@application/services/interfaces/route.service.interface';
import type { RouteResponseDTO } from '@application/dtos/responses/route/index.js';

@CommandHandler(UpdateRouteCommand)
export class UpdateRouteHandler implements ICommandHandler<UpdateRouteCommand, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(c: UpdateRouteCommand): Promise<RouteResponseDTO> { return this.service.update(c.dto, c.actorId); }
}
