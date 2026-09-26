import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdatePreferencesCommand } from './update-preferences.command';
import type { UserPreferencesServiceInterface } from '../../services/interfaces/user-preferences.service.interface';
import type { PreferencesResponseDTO } from '../../dtos/responses/preferences-response.dto';

@CommandHandler(UpdatePreferencesCommand)
export class UpdatePreferencesHandler
  extends BaseCommandHandler<UpdatePreferencesCommand, PreferencesResponseDTO>
  implements ICommandHandler<UpdatePreferencesCommand>
{
  readonly commandType = 'user.preferences.update';

  constructor(
    private readonly preferencesService: UserPreferencesServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdatePreferencesCommand): Promise<PreferencesResponseDTO> {
    return this.preferencesService.update(command.userId, command.patch);
  }
}
