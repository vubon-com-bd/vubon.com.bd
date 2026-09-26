import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ActivateUserCommand } from './activate-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';

@CommandHandler(ActivateUserCommand)
export class ActivateUserHandler
  extends BaseCommandHandler<ActivateUserCommand, void>
  implements ICommandHandler<ActivateUserCommand>
{
  readonly commandType = 'user.activate';

  constructor(
    private readonly userService: UserServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ActivateUserCommand): Promise<void> {
    await this.userService.activate(command.userId);
  }
}
