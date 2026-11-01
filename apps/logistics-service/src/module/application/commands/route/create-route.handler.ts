import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateRouteCommand } from './create-route.command.js';
import { ROUTE_SERVICE, type IRouteService } from '@application/services/interfaces/route.service.interface';
import type { RouteResponseDTO } from '@application/dtos/responses/route/index.js';

@CommandHandler(CreateRouteCommand)
export class CreateRouteHandler implements ICommandHandler<CreateRouteCommand, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(c: CreateRouteCommand): Promise<RouteResponseDTO> { return this.service.create(c.dto, c.actorId); }
}
