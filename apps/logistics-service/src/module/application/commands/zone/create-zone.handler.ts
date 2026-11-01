import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateZoneCommand } from './create-zone.command.js';
import { ZONE_SERVICE, type IZoneService } from '@application/services/interfaces/zone.service.interface';
import type { ZoneResponseDTO } from '@application/dtos/responses/zone/index.js';

@CommandHandler(CreateZoneCommand)
export class CreateZoneHandler implements ICommandHandler<CreateZoneCommand, ZoneResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(c: CreateZoneCommand): Promise<ZoneResponseDTO> { return this.service.create(c.dto, c.actorId); }
}
