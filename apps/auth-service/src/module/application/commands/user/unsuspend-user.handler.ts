import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UnsuspendUserCommand } from './unsuspend-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import { USER_SERVICE } from '../../tokens';

@CommandHandler(UnsuspendUserCommand)
export class UnsuspendUserHandler
  extends BaseCommandHandler<UnsuspendUserCommand, void>
  implements ICommandHandler<UnsuspendUserCommand> {
  readonly commandType = 'UnsuspendUserCommand';
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserServiceInterface,
  ) { super(); }

  async execute(command: UnsuspendUserCommand): Promise<void> {
    await this.userService.unsuspend(command.input.userId as UserId);
  }
}
