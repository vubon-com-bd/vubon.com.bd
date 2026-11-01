import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelRouteCommand } from './cancel.command.js';
import { ROUTE_SERVICE, type IRouteService } from '@application/services/interfaces/route.service.interface';
import type { RouteResponseDTO } from '@application/dtos/responses/route/index.js';

@CommandHandler(CancelRouteCommand)
export class CancelRouteHandler implements ICommandHandler<CancelRouteCommand, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(c: CancelRouteCommand): Promise<RouteResponseDTO> { return this.service.cancel(c.dto, c.actorId); }
}
