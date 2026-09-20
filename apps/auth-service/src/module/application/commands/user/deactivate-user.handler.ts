import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeactivateUserCommand } from './deactivate-user.command';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { UserStatusVO } from '../../../domain/value-objects/primitives/user-status.vo';
import { UserOperationFailedError } from '../../errors/user.errors';

@CommandHandler(DeactivateUserCommand)
export class DeactivateUserHandler
  extends BaseCommandHandler<DeactivateUserCommand, void>
  implements ICommandHandler<DeactivateUserCommand>
{
  readonly commandType = 'user.deactivate';

  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeactivateUserCommand): Promise<void> {
    const entity = await this.userRepo.findById(UserIdVO.create(command.userId));
    if (!entity) {
      throw new UserOperationFailedError(`user not found: ${command.userId}`);
    }
    void UserStatusVO.create('inactive');
    void command.reason;
    throw new Error('deactivate orchestration not yet wired');
  }
}
