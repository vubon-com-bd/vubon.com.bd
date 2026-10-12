import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateZoneCommand } from './create-zone.command.js';
import { ZONE_SERVICE, type IZoneService } from '../../services/interfaces/zone.service.interface.js';
import type { ZoneResponseDTO } from '../../dtos/responses/zone/zone-response.dto.js';

@CommandHandler(CreateZoneCommand)
export class CreateZoneHandler implements ICommandHandler<CreateZoneCommand, ZoneResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(c: CreateZoneCommand): Promise<ZoneResponseDTO> { return this.service.create(c.dto, c.actorId); }
}
