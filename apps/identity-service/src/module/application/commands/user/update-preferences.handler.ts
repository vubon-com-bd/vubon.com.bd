import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdatePreferencesCommand } from './update-preferences.command.js';
import type { UserPreferencesResponseDTO } from '../../dtos/responses/user-preferences-response.dto.js';
import type { UserPreferencesServiceInterface } from '../../services/interfaces/user-preferences.service.interface.js';
import { USER_PREFERENCES_SERVICE } from '../../services/interfaces/user-preferences.service.interface.js';

@CommandHandler(UpdatePreferencesCommand)
export class UpdatePreferencesHandler
  extends BaseCommandHandler<UpdatePreferencesCommand, UserPreferencesResponseDTO>
  implements ICommandHandler<UpdatePreferencesCommand>
{
  readonly commandType = 'user.update-preferences';
  constructor(@Inject(USER_PREFERENCES_SERVICE) private readonly service: UserPreferencesServiceInterface) { super(); }

  async execute(command: UpdatePreferencesCommand): Promise<UserPreferencesResponseDTO> {
    return this.service.update(command.userId, command.input as never);
  }
}
