import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateZoneCommand } from './update.command.js';
import { ZONE_SERVICE, type IZoneService } from '@application/services/interfaces/zone.service.interface';
import type { ZoneResponseDTO } from '@application/dtos/responses/zone/index.js';

@CommandHandler(UpdateZoneCommand)
export class UpdateZoneHandler implements ICommandHandler<UpdateZoneCommand, ZoneResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(c: UpdateZoneCommand): Promise<ZoneResponseDTO> { return this.service.update(c.dto, c.actorId); }
}
