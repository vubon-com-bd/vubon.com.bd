import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateUserCommand } from './update-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  extends BaseCommandHandler<UpdateUserCommand, UserResponseDTO>
  implements ICommandHandler<UpdateUserCommand>
{
  readonly commandType = 'user.update';

  constructor(
    private readonly userService: UserServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateUserCommand): Promise<UserResponseDTO> {
    return this.userService.update(command.userId, {
      emailVerified: command.emailVerified,
      type: command.userType,
      status: command.userStatus,
      phone: command.phone,
      username: command.username,
    });
  }
}
