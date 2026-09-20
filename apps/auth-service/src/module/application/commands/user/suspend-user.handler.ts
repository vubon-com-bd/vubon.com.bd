import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SuspendUserCommand } from './suspend-user.command';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { UserOperationFailedError } from '../../errors/user.errors';

@CommandHandler(SuspendUserCommand)
export class SuspendUserHandler
  extends BaseCommandHandler<SuspendUserCommand, void>
  implements ICommandHandler<SuspendUserCommand>
{
  readonly commandType = 'user.suspend';

  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SuspendUserCommand): Promise<void> {
    const entity = await this.userRepo.findById(UserIdVO.create(command.userId));
    if (!entity) {
      throw new UserOperationFailedError(`user not found: ${command.userId}`);
    }
    void command.reason;
    void command.until;
    throw new Error('suspend orchestration not yet wired');
  }
}
