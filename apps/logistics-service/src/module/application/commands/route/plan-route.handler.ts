import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PlanRouteCommand } from './plan-route.command.js';
import { ROUTE_SERVICE, type IRouteService } from '../../services/interfaces/route.service.interface.js';
import type { RouteResponseDTO } from '../../dtos/responses/route/route-response.dto.js';

@CommandHandler(PlanRouteCommand)
export class PlanRouteHandler implements ICommandHandler<PlanRouteCommand, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(c: PlanRouteCommand): Promise<RouteResponseDTO> { return this.service.plan(c.dto, c.actorId); }
}
