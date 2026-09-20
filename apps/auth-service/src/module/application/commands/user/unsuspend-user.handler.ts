import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UnsuspendUserCommand } from './unsuspend-user.command';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { UserOperationFailedError } from '../../errors/user.errors';

@CommandHandler(UnsuspendUserCommand)
export class UnsuspendUserHandler
  extends BaseCommandHandler<UnsuspendUserCommand, void>
  implements ICommandHandler<UnsuspendUserCommand>
{
  readonly commandType = 'user.unsuspend';

  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UnsuspendUserCommand): Promise<void> {
    const entity = await this.userRepo.findById(UserIdVO.create(command.userId));
    if (!entity) {
      throw new UserOperationFailedError(`user not found: ${command.userId}`);
    }
    const activated = entity.activate();
    await this.userRepo.save(activated);
  }
}
