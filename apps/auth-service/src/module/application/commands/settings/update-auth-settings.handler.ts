import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAuthSettingsCommand } from './update-auth-settings.command';
import type { AuthSettingsServiceInterface } from '../../services/interfaces/auth-settings.service.interface';
import type { AuthSettingsResponseDTO } from '../../dtos/responses/auth-settings-response.dto';

@CommandHandler(UpdateAuthSettingsCommand)
export class UpdateAuthSettingsHandler
  extends BaseCommandHandler<UpdateAuthSettingsCommand, AuthSettingsResponseDTO>
  implements ICommandHandler<UpdateAuthSettingsCommand>
{
  readonly commandType = 'settings.update-auth';

  constructor(
    private readonly settingsService: AuthSettingsServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateAuthSettingsCommand): Promise<AuthSettingsResponseDTO> {
    return this.settingsService.update(command.userId, {
      mfaRequired: command.mfaRequired,
      sessionTimeoutMinutes: command.sessionTimeoutMinutes,
      passwordExpiryDays: command.passwordExpiryDays,
      loginNotifications: command.loginNotifications,
    });
  }
}
