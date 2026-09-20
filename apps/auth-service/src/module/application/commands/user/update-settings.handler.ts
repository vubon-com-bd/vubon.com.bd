import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateSettingsCommand } from './update-settings.command';
import type { UserSettingsServiceInterface } from '../../services/interfaces/user-settings.service.interface';
import type { UserSettingsResponseDTO } from '../../dtos/responses/user-settings-response.dto';
import type { UpdateSettingsRequestDTO } from '../../dtos/requests/user/update-settings.dto';

@CommandHandler(UpdateSettingsCommand)
export class UpdateSettingsHandler
  extends BaseCommandHandler<UpdateSettingsCommand, UserSettingsResponseDTO>
  implements ICommandHandler<UpdateSettingsCommand>
{
  readonly commandType = 'user.update-settings';

  constructor(
    @Inject('UserSettingsService') private readonly settingsService: UserSettingsServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateSettingsCommand): Promise<UserSettingsResponseDTO> {
    const input: UpdateSettingsRequestDTO = {
      theme: command.theme,
      language: command.language,
      timezone: command.timezone,
      notifications: command.notifications,
    };
    return this.settingsService.update(command.userId, input);
  }
}
