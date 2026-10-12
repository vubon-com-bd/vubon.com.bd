import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateZoneCommand } from './activate-zone.command.js';
import { ZONE_SERVICE, type IZoneService } from '../../services/interfaces/zone.service.interface.js';
import type { ZoneResponseDTO } from '../../dtos/responses/zone/zone-response.dto.js';

@CommandHandler(ActivateZoneCommand)
export class ActivateZoneHandler implements ICommandHandler<ActivateZoneCommand, ZoneResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(c: ActivateZoneCommand): Promise<ZoneResponseDTO> { return this.service.activate(c.dto, c.actorId); }
}
