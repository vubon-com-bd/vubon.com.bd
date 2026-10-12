import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateSettingsCommand } from './update-settings.command.js';
import type { UserSettingsResponseDTO } from '../../dtos/responses/user-settings-response.dto.js';
import type { UserSettingsServiceInterface } from '../../services/interfaces/user-settings.service.interface.js';
import { USER_SETTINGS_SERVICE } from '../../services/interfaces/user-settings.service.interface.js';

@CommandHandler(UpdateSettingsCommand)
export class UpdateSettingsHandler
  extends BaseCommandHandler<UpdateSettingsCommand, UserSettingsResponseDTO>
  implements ICommandHandler<UpdateSettingsCommand>
{
  readonly commandType = 'user.update-settings';
  constructor(@Inject(USER_SETTINGS_SERVICE) private readonly service: UserSettingsServiceInterface) { super(); }

  async execute(command: UpdateSettingsCommand): Promise<UserSettingsResponseDTO> {
    return this.service.update(command.userId, command.input as never);
  }
}
