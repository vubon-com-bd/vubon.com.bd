import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateSettingsCommand } from './update-settings.command';
import type { UserSettingsServiceInterface } from '../../services/interfaces/user-settings.service.interface';
import type { SettingsResponseDTO } from '../../dtos/responses/settings-response.dto';

@CommandHandler(UpdateSettingsCommand)
export class UpdateSettingsHandler
  extends BaseCommandHandler<UpdateSettingsCommand, SettingsResponseDTO>
  implements ICommandHandler<UpdateSettingsCommand>
{
  readonly commandType = 'user.settings.update';

  constructor(
    private readonly settingsService: UserSettingsServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateSettingsCommand): Promise<SettingsResponseDTO> {
    return this.settingsService.update(command.userId, command.patch);
  }
}
