import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RestrictZoneCommand } from './restrict.command.js';
import { ZONE_SERVICE, type IZoneService } from '@application/services/interfaces/zone.service.interface';
import type { ZoneResponseDTO } from '@application/dtos/responses/zone/index.js';

@CommandHandler(RestrictZoneCommand)
export class RestrictZoneHandler implements ICommandHandler<RestrictZoneCommand, ZoneResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(c: RestrictZoneCommand): Promise<ZoneResponseDTO> { return this.service.restrict(c.dto, c.actorId); }
}
