import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteUserCommand } from './delete-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';
import { USER_SERVICE } from '../../tokens';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler
  extends BaseCommandHandler<DeleteUserCommand, void>
  implements ICommandHandler<DeleteUserCommand> {
  readonly commandType = 'DeleteUserCommand';
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserServiceInterface,
  ) { super(); }

  async execute(command: DeleteUserCommand): Promise<void> {
    await this.userService.delete(command.userId, command.input.reason);
  }
}
