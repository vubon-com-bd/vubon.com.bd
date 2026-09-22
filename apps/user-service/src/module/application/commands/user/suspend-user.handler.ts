import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SuspendUserCommand } from './suspend-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';

@CommandHandler(SuspendUserCommand)
export class SuspendUserHandler
  extends BaseCommandHandler<SuspendUserCommand, void>
  implements ICommandHandler<SuspendUserCommand>
{
  readonly commandType = 'user.suspend';

  constructor(
    private readonly userService: UserServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SuspendUserCommand): Promise<void> {
    await this.userService.suspend(command.userId, command.reason);
  }
}
