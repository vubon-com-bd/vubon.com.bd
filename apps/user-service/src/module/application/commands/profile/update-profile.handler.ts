import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateProfileCommand } from './update-profile.command';
import type { UserProfileServiceInterface } from '../../services/interfaces/user-profile.service.interface';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  extends BaseCommandHandler<UpdateProfileCommand, ProfileResponseDTO>
  implements ICommandHandler<UpdateProfileCommand>
{
  readonly commandType = 'user.profile.update';

  constructor(
    private readonly profileService: UserProfileServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateProfileCommand): Promise<ProfileResponseDTO> {
    if (command.avatarUrl !== undefined) {
      return this.profileService.updateAvatar(command.userId, command.avatarUrl);
    }
    if (command.bio !== undefined) {
      return this.profileService.updateBio(command.userId, command.bio);
    }
    return this.profileService.updateBio(command.userId, null);
  }
}
