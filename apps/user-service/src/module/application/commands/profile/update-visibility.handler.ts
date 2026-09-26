import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateVisibilityCommand } from './update-visibility.command';
import type { UserProfileServiceInterface } from '../../services/interfaces/user-profile.service.interface';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto';

@CommandHandler(UpdateVisibilityCommand)
export class UpdateVisibilityHandler
  extends BaseCommandHandler<UpdateVisibilityCommand, ProfileResponseDTO>
  implements ICommandHandler<UpdateVisibilityCommand>
{
  readonly commandType = 'user.profile.update-visibility';

  constructor(
    private readonly profileService: UserProfileServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateVisibilityCommand): Promise<ProfileResponseDTO> {
    return this.profileService.changeVisibility(command.userId, command.visibility);
  }
}
