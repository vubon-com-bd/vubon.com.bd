/**
 * DeleteUserHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteUserCommand } from './delete-user.command.js';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import {
  UserNotFoundApplicationError,
  UserDeletionFailedError,
} from '../../errors/user.errors.js';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler
  implements ICommandHandler<DeleteUserCommand, { success: true }>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async execute(command: DeleteUserCommand): Promise<{ success: true }> {
    const { userId, hardDelete } = command;

    const id = UserIdVO.create(userId);
    const user = await this.userRepo.findById(id.value);
    if (!user) {
      throw new UserNotFoundApplicationError(userId);
    }

    try {
      const now = new Date().toISOString();
      user.delete(now);

      if (hardDelete) {
        await this.userRepo.delete(id.value);
      } else {
        await this.userRepo.save(user);
      }
      return { success: true };
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new UserDeletionFailedError(userId, reason);
    }
  }
}
