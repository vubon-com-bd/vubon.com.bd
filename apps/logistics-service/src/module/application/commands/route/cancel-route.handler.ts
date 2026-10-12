import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelRouteCommand } from './cancel-route.command.js';
import { ROUTE_SERVICE, type IRouteService } from '../../services/interfaces/route.service.interface.js';
import type { RouteResponseDTO } from '../../dtos/responses/route/route-response.dto.js';

@CommandHandler(CancelRouteCommand)
export class CancelRouteHandler implements ICommandHandler<CancelRouteCommand, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(c: CancelRouteCommand): Promise<RouteResponseDTO> { return this.service.cancel(c.dto, c.actorId); }
}
