import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateUserCommand } from './update-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';
import type { UpdateUserRequestDTO } from '../../dtos/requests/user/update-user.dto';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  extends BaseCommandHandler<UpdateUserCommand, UserResponseDTO>
  implements ICommandHandler<UpdateUserCommand>
{
  readonly commandType = 'user.update';

  constructor(
    @Inject('UserService') private readonly userService: UserServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateUserCommand): Promise<UserResponseDTO> {
    const input: UpdateUserRequestDTO = {
      emailVerified: command.emailVerified,
      type: command.userType,
      status: command.userStatus,
      phone: command.phone,
      isMfaEnabled: command.isMfaEnabled,
      username: command.username,
      phoneVerified: command.phoneVerified,
    };
    return this.userService.update(command.userId, input);
  }
}
