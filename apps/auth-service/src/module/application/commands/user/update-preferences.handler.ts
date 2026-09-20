import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdatePreferencesCommand } from './update-preferences.command';
import type { UserPreferencesServiceInterface } from '../../services/interfaces/user-preferences.service.interface';
import type { UserPreferencesResponseDTO } from '../../dtos/responses/user-preferences-response.dto';
import type { UpdatePreferencesRequestDTO } from '../../dtos/requests/user/update-preferences.dto';

@CommandHandler(UpdatePreferencesCommand)
export class UpdatePreferencesHandler
  extends BaseCommandHandler<UpdatePreferencesCommand, UserPreferencesResponseDTO>
  implements ICommandHandler<UpdatePreferencesCommand>
{
  readonly commandType = 'user.update-preferences';

  constructor(
    @Inject('UserPreferencesService') private readonly preferencesService: UserPreferencesServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdatePreferencesCommand): Promise<UserPreferencesResponseDTO> {
    const input: UpdatePreferencesRequestDTO = {
      newsletter: command.newsletter,
      promotions: command.promotions,
      orderUpdates: command.orderUpdates,
      productRecommendations: command.productRecommendations,
      securityAlerts: command.securityAlerts,
    };
    return this.preferencesService.update(command.userId, input);
  }
}
