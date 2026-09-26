import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UnsuspendUserCommand } from './unsuspend-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';

@CommandHandler(UnsuspendUserCommand)
export class UnsuspendUserHandler
  extends BaseCommandHandler<UnsuspendUserCommand, void>
  implements ICommandHandler<UnsuspendUserCommand>
{
  readonly commandType = 'user.unsuspend';

  constructor(
    private readonly userService: UserServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UnsuspendUserCommand): Promise<void> {
    await this.userService.unsuspend(command.userId);
  }
}
