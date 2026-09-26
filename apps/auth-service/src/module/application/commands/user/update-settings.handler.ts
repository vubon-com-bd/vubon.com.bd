import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateSettingsCommand } from './update-settings.command';
import type { UserSettingsServiceInterface } from '../../services/interfaces/user-settings.service.interface';
import type { UserSettingsResponseDTO } from '../../dtos/responses/user-settings-response.dto';
import { USER_SETTINGS_SERVICE } from '../../tokens';

@CommandHandler(UpdateSettingsCommand)
export class UpdateSettingsHandler
  extends BaseCommandHandler<UpdateSettingsCommand, UserSettingsResponseDTO>
  implements ICommandHandler<UpdateSettingsCommand> {
  readonly commandType = 'UpdateSettingsCommand';
  constructor(
    @Inject(USER_SETTINGS_SERVICE)
    private readonly settingsService: UserSettingsServiceInterface,
  ) { super(); }

  async execute(command: UpdateSettingsCommand): Promise<UserSettingsResponseDTO> {
    const entity = await this.settingsService.update(command.userId, command.input);
    return this.settingsService.toResponse(entity);
  }
}
