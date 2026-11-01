import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ArchiveRouteCommand } from './archive.command.js';
import { ROUTE_SERVICE, type IRouteService } from '@application/services/interfaces/route.service.interface';
import type { RouteResponseDTO } from '@application/dtos/responses/route/index.js';

@CommandHandler(ArchiveRouteCommand)
export class ArchiveRouteHandler implements ICommandHandler<ArchiveRouteCommand, RouteResponseDTO> {
  constructor(@Inject(ROUTE_SERVICE) private readonly service: IRouteService) {}
  async execute(c: ArchiveRouteCommand): Promise<RouteResponseDTO> { return this.service.archive(c.dto, c.actorId); }
}
