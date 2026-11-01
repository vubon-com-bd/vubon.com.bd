import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateVisibilityCommand } from './update-visibility.command.js';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto.js';
import type { UserProfileServiceInterface } from '../../services/interfaces/user-profile.service.interface.js';
import { USER_PROFILE_SERVICE } from '../../services/interfaces/user-profile.service.interface.js';

@CommandHandler(UpdateVisibilityCommand)
export class UpdateVisibilityHandler
  extends BaseCommandHandler<UpdateVisibilityCommand, UserProfileResponseDTO>
  implements ICommandHandler<UpdateVisibilityCommand>
{
  readonly commandType = 'user.update-visibility';
  constructor(@Inject(USER_PROFILE_SERVICE) private readonly service: UserProfileServiceInterface) { super(); }
  async execute(command: UpdateVisibilityCommand): Promise<UserProfileResponseDTO> {
    return this.service.upsert(command.userId, { visibility: command.visibility } as never);
  }
}
