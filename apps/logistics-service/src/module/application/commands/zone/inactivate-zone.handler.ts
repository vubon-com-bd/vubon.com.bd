import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InactivateZoneCommand } from './inactivate-zone.command.js';
import { ZONE_SERVICE, type IZoneService } from '../../services/interfaces/zone.service.interface.js';
import type { ZoneResponseDTO } from '../../dtos/responses/zone/zone-response.dto.js';

@CommandHandler(InactivateZoneCommand)
export class InactivateZoneHandler implements ICommandHandler<InactivateZoneCommand, ZoneResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(c: InactivateZoneCommand): Promise<ZoneResponseDTO> { return this.service.inactivate(c.dto, c.actorId); }
}
