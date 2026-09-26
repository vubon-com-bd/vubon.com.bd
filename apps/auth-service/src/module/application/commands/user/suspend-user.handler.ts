import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SuspendUserCommand } from './suspend-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import { USER_SERVICE } from '../../tokens';

@CommandHandler(SuspendUserCommand)
export class SuspendUserHandler
  extends BaseCommandHandler<SuspendUserCommand, void>
  implements ICommandHandler<SuspendUserCommand> {
  readonly commandType = 'SuspendUserCommand';
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserServiceInterface,
  ) { super(); }

  async execute(command: SuspendUserCommand): Promise<void> {
    await this.userService.suspend(
      command.input.userId as UserId,
      command.input.reason,
      command.input.until,
    );
  }
}
