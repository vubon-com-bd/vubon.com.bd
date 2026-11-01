import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { DeleteUserCommand } from './delete-user.command.js';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { UserNotFoundError } from '../../../domain/errors/user.errors.js';

export interface DeleteUserResponse { readonly success: true; readonly message: string; }

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler
  extends BaseCommandHandler<DeleteUserCommand, DeleteUserResponse>
  implements ICommandHandler<DeleteUserCommand>
{
  readonly commandType = 'user.delete';
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {
    super();
  }

  async execute(command: DeleteUserCommand): Promise<DeleteUserResponse> {
    const user = await this.userRepo.findById(command.input.userId);
    if (!user) throw new UserNotFoundError(command.input.userId);
    user.markDeleted(command.deletedBy);
    const saved = await this.userRepo.save(user);
    await this.eventBridge.publishFromEntity(saved);
    return { success: true, message: 'User deleted successfully' };
  }
}
