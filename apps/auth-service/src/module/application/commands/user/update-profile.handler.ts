import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateProfileCommand } from './update-profile.command';
import type { UserProfileServiceInterface } from '../../services/interfaces/user-profile.service.interface';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto';
import { USER_PROFILE_SERVICE } from '../../tokens';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  extends BaseCommandHandler<UpdateProfileCommand, UserProfileResponseDTO>
  implements ICommandHandler<UpdateProfileCommand> {
  readonly commandType = 'UpdateProfileCommand';
  constructor(
    @Inject(USER_PROFILE_SERVICE)
    private readonly profileService: UserProfileServiceInterface,
  ) { super(); }

  async execute(command: UpdateProfileCommand): Promise<UserProfileResponseDTO> {
    const profile = await this.profileService.update(command.userId, command.input);
    return this.profileService.toResponse(profile);
  }
}
