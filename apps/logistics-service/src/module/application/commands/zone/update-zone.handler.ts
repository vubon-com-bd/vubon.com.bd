import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateZoneCommand } from './update-zone.command.js';
import { ZONE_SERVICE, type IZoneService } from '../../services/interfaces/zone.service.interface.js';
import type { ZoneResponseDTO } from '../../dtos/responses/zone/zone-response.dto.js';

@CommandHandler(UpdateZoneCommand)
export class UpdateZoneHandler implements ICommandHandler<UpdateZoneCommand, ZoneResponseDTO> {
  constructor(@Inject(ZONE_SERVICE) private readonly service: IZoneService) {}
  async execute(c: UpdateZoneCommand): Promise<ZoneResponseDTO> { return this.service.update(c.dto, c.actorId); }
}
