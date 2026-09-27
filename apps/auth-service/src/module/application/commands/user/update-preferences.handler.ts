import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdatePreferencesCommand } from './update-preferences.command.js';
import type { UserPreferencesServiceInterface } from '../../services/interfaces/user-preferences.service.interface.js';
import type { UserPreferencesResponseDTO } from '../../dtos/responses/user-preferences-response.dto.js';
import { USER_PREFERENCES_SERVICE } from '../../tokens.js';

@CommandHandler(UpdatePreferencesCommand)
export class UpdatePreferencesHandler
  extends BaseCommandHandler<UpdatePreferencesCommand, UserPreferencesResponseDTO>
  implements ICommandHandler<UpdatePreferencesCommand> {
  readonly commandType = 'UpdatePreferencesCommand';
  constructor(
    @Inject(USER_PREFERENCES_SERVICE)
    private readonly preferencesService: UserPreferencesServiceInterface,
  ) { super(); }

  async execute(command: UpdatePreferencesCommand): Promise<UserPreferencesResponseDTO> {
    const entity = await this.preferencesService.update(command.userId, command.input);
    return this.preferencesService.toResponse(entity);
  }
}
