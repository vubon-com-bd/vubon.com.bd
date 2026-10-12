import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SuspendUserCommand } from './suspend-user.command.js';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { UserNotFoundError } from '../../../domain/errors/user.errors.js';

export interface SuspendUserResponse { readonly success: true; readonly suspended: boolean; }

@CommandHandler(SuspendUserCommand)
export class SuspendUserHandler
  extends BaseCommandHandler<SuspendUserCommand, SuspendUserResponse>
  implements ICommandHandler<SuspendUserCommand>
{
  readonly commandType = 'user.suspend';
  constructor(@Inject(USER_REPOSITORY) private readonly userRepo: UserRepository) { super(); }

  async execute(command: SuspendUserCommand): Promise<SuspendUserResponse> {
    const user = await this.userRepo.findById(command.input.userId);
    if (!user) throw new UserNotFoundError(command.input.userId);
    user.suspend(command.input.reason);
    await this.userRepo.save(user);
    return { success: true, suspended: true };
  }
}
