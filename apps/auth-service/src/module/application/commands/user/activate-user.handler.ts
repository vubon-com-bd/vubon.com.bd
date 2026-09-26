import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ActivateUserCommand } from './activate-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import { USER_SERVICE } from '../../tokens';

@CommandHandler(ActivateUserCommand)
export class ActivateUserHandler
  extends BaseCommandHandler<ActivateUserCommand, void>
  implements ICommandHandler<ActivateUserCommand> {
  readonly commandType = 'ActivateUserCommand';
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserServiceInterface,
  ) { super(); }

  async execute(command: ActivateUserCommand): Promise<void> {
    await this.userService.activate(command.input.userId as UserId);
  }
}
