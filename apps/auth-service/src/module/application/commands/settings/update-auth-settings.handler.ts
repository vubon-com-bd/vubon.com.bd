import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAuthSettingsCommand } from './update-auth-settings.command';
import type { AuthSettingsServiceInterface } from '../../services/interfaces/auth-settings.service.interface';
import type { AuthSettingsResponseDTO } from '../../dtos/responses/auth-settings-response.dto';
import { AUTH_SETTINGS_SERVICE } from '../../tokens';

@CommandHandler(UpdateAuthSettingsCommand)
export class UpdateAuthSettingsHandler
  extends BaseCommandHandler<UpdateAuthSettingsCommand, AuthSettingsResponseDTO>
  implements ICommandHandler<UpdateAuthSettingsCommand> {
  readonly commandType = 'UpdateAuthSettingsCommand';
  constructor(
    @Inject(AUTH_SETTINGS_SERVICE)
    private readonly settingsService: AuthSettingsServiceInterface,
  ) { super(); }

  async execute(
    command: UpdateAuthSettingsCommand,
  ): Promise<AuthSettingsResponseDTO> {
    return this.settingsService.updateSettings(command.userId, command.input);
  }
}
