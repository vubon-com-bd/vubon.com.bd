import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteUserCommand } from './delete-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler
  extends BaseCommandHandler<DeleteUserCommand, void>
  implements ICommandHandler<DeleteUserCommand>
{
  readonly commandType = 'user.delete';

  constructor(
    @Inject('UserService') private readonly userService: UserServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeleteUserCommand): Promise<void> {
    await this.userService.delete(command.userId);
  }
}
