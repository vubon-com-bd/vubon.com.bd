import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddRouteStopCommand } from './add-route-stop.command.js';
import { ROUTE_SERVICE, type IRouteService } from '../../services/interfaces/route.service.interface.js';
import type { RouteResponseDTO } from '../../dtos/responses/route/route-response.dto.js';

@CommandHandler(AddRouteStopCommand)
export class AddRouteStopHandler implements ICommandHandler<AddRouteStopCommand, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(c: AddRouteStopCommand): Promise<RouteResponseDTO> { return this.service.addStop(c.dto, c.actorId); }
}
