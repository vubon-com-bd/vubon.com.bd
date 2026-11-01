import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeactivateZoneCommand } from './deactivate.command.js';
import { ZONE_SERVICE, type IZoneService } from '@application/services/interfaces/zone.service.interface';
import type { ZoneResponseDTO } from '@application/dtos/responses/zone/index.js';

@CommandHandler(DeactivateZoneCommand)
export class DeactivateZoneHandler implements ICommandHandler<DeactivateZoneCommand, ZoneResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(c: DeactivateZoneCommand): Promise<ZoneResponseDTO> { return this.service.deactivate(c.dto, c.actorId); }
}
