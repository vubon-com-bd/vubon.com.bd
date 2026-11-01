import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateProfileCommand } from './update-profile.command.js';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto.js';
import type { UserProfileServiceInterface } from '../../services/interfaces/user-profile.service.interface.js';
import { USER_PROFILE_SERVICE } from '../../services/interfaces/user-profile.service.interface.js';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  extends BaseCommandHandler<UpdateProfileCommand, UserProfileResponseDTO>
  implements ICommandHandler<UpdateProfileCommand>
{
  readonly commandType = 'user.update-profile';
  constructor(@Inject(USER_PROFILE_SERVICE) private readonly service: UserProfileServiceInterface) { super(); }

  async execute(command: UpdateProfileCommand): Promise<UserProfileResponseDTO> {
    return this.service.upsert(command.userId, command.input as never);
  }
}
