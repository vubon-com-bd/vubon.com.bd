import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAvatarCommand } from './update-avatar.command.js';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto.js';
import type { UserProfileServiceInterface } from '../../services/interfaces/user-profile.service.interface.js';
import { USER_PROFILE_SERVICE } from '../../services/interfaces/user-profile.service.interface.js';

@CommandHandler(UpdateAvatarCommand)
export class UpdateAvatarHandler
  extends BaseCommandHandler<UpdateAvatarCommand, UserProfileResponseDTO>
  implements ICommandHandler<UpdateAvatarCommand>
{
  readonly commandType = 'user.update-avatar';
  constructor(@Inject(USER_PROFILE_SERVICE) private readonly service: UserProfileServiceInterface) { super(); }
  async execute(command: UpdateAvatarCommand): Promise<UserProfileResponseDTO> {
    return this.service.upsert(command.userId, { avatarUrl: command.avatarUrl } as never);
  }
}
