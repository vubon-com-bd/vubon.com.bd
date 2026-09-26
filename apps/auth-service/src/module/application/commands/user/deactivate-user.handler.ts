import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeactivateUserCommand } from './deactivate-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import { USER_SERVICE } from '../../tokens';

@CommandHandler(DeactivateUserCommand)
export class DeactivateUserHandler
  extends BaseCommandHandler<DeactivateUserCommand, void>
  implements ICommandHandler<DeactivateUserCommand> {
  readonly commandType = 'DeactivateUserCommand';
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserServiceInterface,
  ) { super(); }

  async execute(command: DeactivateUserCommand): Promise<void> {
    await this.userService.deactivate(
      command.input.userId as UserId,
      command.input.reason,
    );
  }
}
