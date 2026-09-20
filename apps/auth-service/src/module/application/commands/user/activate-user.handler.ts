import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ActivateUserCommand } from './activate-user.command';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { UserOperationFailedError } from '../../errors/user.errors';

@CommandHandler(ActivateUserCommand)
export class ActivateUserHandler
  extends BaseCommandHandler<ActivateUserCommand, void>
  implements ICommandHandler<ActivateUserCommand>
{
  readonly commandType = 'user.activate';

  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ActivateUserCommand): Promise<void> {
    const entity = await this.userRepo.findById(UserIdVO.create(command.userId));
    if (!entity) {
      throw new UserOperationFailedError(`user not found: ${command.userId}`);
    }
    const activated = entity.activate();
    await this.userRepo.save(activated);
    const events = activated.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
