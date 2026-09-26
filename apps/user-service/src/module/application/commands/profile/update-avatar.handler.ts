import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAvatarCommand } from './update-avatar.command';
import type { UserProfileServiceInterface } from '../../services/interfaces/user-profile.service.interface';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto';

@CommandHandler(UpdateAvatarCommand)
export class UpdateAvatarHandler
  extends BaseCommandHandler<UpdateAvatarCommand, ProfileResponseDTO>
  implements ICommandHandler<UpdateAvatarCommand>
{
  readonly commandType = 'user.profile.update-avatar';

  constructor(
    private readonly profileService: UserProfileServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateAvatarCommand): Promise<ProfileResponseDTO> {
    return this.profileService.updateAvatar(command.userId, command.avatarUrl);
  }
}
