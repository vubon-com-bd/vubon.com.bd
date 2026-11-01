import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ArchiveZoneCommand } from './archive.command.js';
import { ZONE_SERVICE, type IZoneService } from '@application/services/interfaces/zone.service.interface';
import type { ZoneResponseDTO } from '@application/dtos/responses/zone/index.js';

@CommandHandler(ArchiveZoneCommand)
export class ArchiveZoneHandler implements ICommandHandler<ArchiveZoneCommand, ZoneResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(c: ArchiveZoneCommand): Promise<ZoneResponseDTO> { return this.service.archive(c.dto, c.actorId); }
}
