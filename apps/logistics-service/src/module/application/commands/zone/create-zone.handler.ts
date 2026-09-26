import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateZoneCommand } from './create-zone.command';
import type { ZoneServiceInterface } from '../../services/interfaces/zone.service.interface';
import type { ZoneResponseDTO } from '../../dtos/responses/zone-response.dto';

@CommandHandler(CreateZoneCommand)
export class CreateZoneHandler
  extends BaseCommandHandler<CreateZoneCommand, ZoneResponseDTO>
  implements ICommandHandler<CreateZoneCommand>
{
  readonly commandType = 'logistics.zone.create';

  constructor(private readonly zoneService: ZoneServiceInterface) {
    super();
  }

  async execute(command: CreateZoneCommand): Promise<ZoneResponseDTO> {
    return this.zoneService.create({
      code: command.code,
      name: command.name,
      type: command.zoneType,
      divisions: [...command.divisions],
      districts: [...command.districts],
    } as never);
  }
}
