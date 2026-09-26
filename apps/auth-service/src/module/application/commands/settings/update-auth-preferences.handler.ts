import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAuthPreferencesCommand } from './update-auth-preferences.command';
import type { AuthSettingsServiceInterface } from '../../services/interfaces/auth-settings.service.interface';
import { AUTH_SETTINGS_SERVICE } from '../../tokens';

@CommandHandler(UpdateAuthPreferencesCommand)
export class UpdateAuthPreferencesHandler
  extends BaseCommandHandler<UpdateAuthPreferencesCommand, void>
  implements ICommandHandler<UpdateAuthPreferencesCommand> {
  readonly commandType = 'UpdateAuthPreferencesCommand';
  constructor(
    @Inject(AUTH_SETTINGS_SERVICE)
    private readonly settingsService: AuthSettingsServiceInterface,
  ) { super(); }

  async execute(command: UpdateAuthPreferencesCommand): Promise<void> {
    await this.settingsService.updatePreferences(command.userId, command.input);
  }
}
