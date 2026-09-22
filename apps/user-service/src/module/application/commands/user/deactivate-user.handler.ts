import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeactivateUserCommand } from './deactivate-user.command';
import type { UserServiceInterface } from '../../services/interfaces/user.service.interface';

@CommandHandler(DeactivateUserCommand)
export class DeactivateUserHandler
  extends BaseCommandHandler<DeactivateUserCommand, void>
  implements ICommandHandler<DeactivateUserCommand>
{
  readonly commandType = 'user.deactivate';

  constructor(
    private readonly userService: UserServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeactivateUserCommand): Promise<void> {
    await this.userService.deactivate(command.userId, command.reason);
  }
}
