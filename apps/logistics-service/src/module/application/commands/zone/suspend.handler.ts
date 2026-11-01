import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SuspendZoneCommand } from './suspend.command.js';
import { ZONE_SERVICE, type IZoneService } from '@application/services/interfaces/zone.service.interface';
import type { ZoneResponseDTO } from '@application/dtos/responses/zone/index.js';

@CommandHandler(SuspendZoneCommand)
export class SuspendZoneHandler implements ICommandHandler<SuspendZoneCommand, ZoneResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(c: SuspendZoneCommand): Promise<ZoneResponseDTO> { return this.service.suspend(c.dto, c.actorId); }
}
