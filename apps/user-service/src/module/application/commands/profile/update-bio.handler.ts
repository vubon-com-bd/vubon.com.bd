import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateBioCommand } from './update-bio.command';
import type { UserProfileServiceInterface } from '../../services/interfaces/user-profile.service.interface';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto';

@CommandHandler(UpdateBioCommand)
export class UpdateBioHandler
  extends BaseCommandHandler<UpdateBioCommand, ProfileResponseDTO>
  implements ICommandHandler<UpdateBioCommand>
{
  readonly commandType = 'user.profile.update-bio';

  constructor(
    private readonly profileService: UserProfileServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateBioCommand): Promise<ProfileResponseDTO> {
    return this.profileService.updateBio(command.userId, command.bio);
  }
}
