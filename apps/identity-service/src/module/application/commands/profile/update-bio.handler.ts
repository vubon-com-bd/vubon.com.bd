import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateBioCommand } from './update-bio.command.js';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto.js';
import type { UserProfileServiceInterface } from '../../services/interfaces/user-profile.service.interface.js';
import { USER_PROFILE_SERVICE } from '../../services/interfaces/user-profile.service.interface.js';

@CommandHandler(UpdateBioCommand)
export class UpdateBioHandler
  extends BaseCommandHandler<UpdateBioCommand, UserProfileResponseDTO>
  implements ICommandHandler<UpdateBioCommand>
{
  readonly commandType = 'user.update-bio';
  constructor(@Inject(USER_PROFILE_SERVICE) private readonly service: UserProfileServiceInterface) { super(); }
  async execute(command: UpdateBioCommand): Promise<UserProfileResponseDTO> {
    return this.service.upsert(command.userId, { bio: command.bio } as never);
  }
}
