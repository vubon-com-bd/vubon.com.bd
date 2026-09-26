import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateZoneCommand } from './update-zone.command';
import type { ZoneServiceInterface } from '../../services/interfaces/zone.service.interface';
import type { ZoneResponseDTO } from '../../dtos/responses/zone-response.dto';

@CommandHandler(UpdateZoneCommand)
export class UpdateZoneHandler
  extends BaseCommandHandler<UpdateZoneCommand, ZoneResponseDTO>
  implements ICommandHandler<UpdateZoneCommand>
{
  readonly commandType = 'logistics.zone.update';

  constructor(private readonly zoneService: ZoneServiceInterface) {
    super();
  }

  async execute(command: UpdateZoneCommand): Promise<ZoneResponseDTO> {
    return this.zoneService.update({
      zoneId: command.zoneId,
      name: command.name,
      divisions: command.divisions ? [...command.divisions] : undefined,
      districts: command.districts ? [...command.districts] : undefined,
    } as never);
  }
}
