import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateProfileCommand } from './update-profile.command';
import type { UserProfileServiceInterface } from '../../services/interfaces/user-profile.service.interface';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto';
import type { UpdateProfileRequestDTO } from '../../dtos/requests/user/update-profile.dto';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  extends BaseCommandHandler<UpdateProfileCommand, UserProfileResponseDTO>
  implements ICommandHandler<UpdateProfileCommand>
{
  readonly commandType = 'user.update-profile';

  constructor(
    @Inject('UserProfileService') private readonly profileService: UserProfileServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateProfileCommand): Promise<UserProfileResponseDTO> {
    const input: UpdateProfileRequestDTO = {
      firstName: command.firstName,
      lastName: command.lastName,
      bio: command.bio,
      avatarUrl: command.avatarUrl,
    };
    return this.profileService.update(command.userId, input);
  }
}
