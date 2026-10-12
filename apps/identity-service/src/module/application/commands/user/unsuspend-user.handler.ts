import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UnsuspendUserCommand } from './unsuspend-user.command.js';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { UserNotFoundError } from '../../../domain/errors/user.errors.js';

export interface UnsuspendUserResponse { readonly success: true; readonly unsuspended: boolean; }

@CommandHandler(UnsuspendUserCommand)
export class UnsuspendUserHandler
  extends BaseCommandHandler<UnsuspendUserCommand, UnsuspendUserResponse>
  implements ICommandHandler<UnsuspendUserCommand>
{
  readonly commandType = 'user.unsuspend';
  constructor(@Inject(USER_REPOSITORY) private readonly userRepo: UserRepository) { super(); }

  async execute(command: UnsuspendUserCommand): Promise<UnsuspendUserResponse> {
    const user = await this.userRepo.findById(command.input.userId);
    if (!user) throw new UserNotFoundError(command.input.userId);
    user.unsuspend();
    await this.userRepo.save(user);
    return { success: true, unsuspended: true };
  }
}
