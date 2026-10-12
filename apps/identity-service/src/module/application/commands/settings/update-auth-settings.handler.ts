import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAuthSettingsCommand } from './update-auth-settings.command.js';
import type { AuthSettingsResponseDTO } from '../../dtos/responses/auth-settings-response.dto.js';
import type { AuthSettingsServiceInterface } from '../../services/interfaces/auth-settings.service.interface.js';
import { AUTH_SETTINGS_SERVICE } from '../../services/interfaces/auth-settings.service.interface.js';

@CommandHandler(UpdateAuthSettingsCommand)
export class UpdateAuthSettingsHandler
  extends BaseCommandHandler<UpdateAuthSettingsCommand, AuthSettingsResponseDTO>
  implements ICommandHandler<UpdateAuthSettingsCommand>
{
  readonly commandType = 'settings.update-auth';
  constructor(@Inject(AUTH_SETTINGS_SERVICE) private readonly service: AuthSettingsServiceInterface) { super(); }

  async execute(command: UpdateAuthSettingsCommand): Promise<AuthSettingsResponseDTO> {
    return this.service.update(command.input);
  }
}
