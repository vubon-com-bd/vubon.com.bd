import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SuspendZoneCommand } from './suspend-zone.command.js';
import { ZONE_SERVICE, type IZoneService } from '../../services/interfaces/zone.service.interface.js';
import type { ZoneResponseDTO } from '../../dtos/responses/zone/zone-response.dto.js';

@CommandHandler(SuspendZoneCommand)
export class SuspendZoneHandler implements ICommandHandler<SuspendZoneCommand, ZoneResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(c: SuspendZoneCommand): Promise<ZoneResponseDTO> { return this.service.suspend(c.dto, c.actorId); }
}
