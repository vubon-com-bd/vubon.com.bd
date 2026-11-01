import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateZoneCommand } from './activate.command.js';
import { ZONE_SERVICE, type IZoneService } from '@application/services/interfaces/zone.service.interface';
import type { ZoneResponseDTO } from '@application/dtos/responses/zone/index.js';

@CommandHandler(ActivateZoneCommand)
export class ActivateZoneHandler implements ICommandHandler<ActivateZoneCommand, ZoneResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(c: ActivateZoneCommand): Promise<ZoneResponseDTO> { return this.service.activate(c.dto, c.actorId); }
}
