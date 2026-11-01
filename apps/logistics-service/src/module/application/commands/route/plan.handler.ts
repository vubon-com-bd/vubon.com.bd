import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PlanRouteCommand } from './plan.command.js';
import { ROUTE_SERVICE, type IRouteService } from '@application/services/interfaces/route.service.interface';
import type { RouteResponseDTO } from '@application/dtos/responses/route/index.js';

@CommandHandler(PlanRouteCommand)
export class PlanRouteHandler implements ICommandHandler<PlanRouteCommand, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(c: PlanRouteCommand): Promise<RouteResponseDTO> { return this.service.plan(c.dto, c.actorId); }
}
