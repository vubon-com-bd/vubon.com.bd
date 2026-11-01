import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ResetPreferencesCommand } from './reset-preferences.command.js';
import type { UserPreferencesResponseDTO } from '../../dtos/responses/user-preferences-response.dto.js';
import type { UserPreferencesServiceInterface } from '../../services/interfaces/user-preferences.service.interface.js';
import { USER_PREFERENCES_SERVICE } from '../../services/interfaces/user-preferences.service.interface.js';

@CommandHandler(ResetPreferencesCommand)
export class ResetPreferencesHandler
  extends BaseCommandHandler<ResetPreferencesCommand, UserPreferencesResponseDTO | null>
  implements ICommandHandler<ResetPreferencesCommand>
{
  readonly commandType = 'user.reset-preferences';
  constructor(@Inject(USER_PREFERENCES_SERVICE) private readonly service: UserPreferencesServiceInterface) { super(); }
  async execute(command: ResetPreferencesCommand): Promise<UserPreferencesResponseDTO | null> {
    if (command.scope === 'all' || command.scope === 'marketing') {
      await this.service.unsubscribeAll(command.userId);
    }
    return this.service.findForUser(command.userId);
  }
}
