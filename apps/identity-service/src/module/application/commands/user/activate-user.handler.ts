import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ActivateUserCommand } from './activate-user.command.js';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { UserNotFoundError } from '../../../domain/errors/user.errors.js';

export interface ActivateUserResponse { readonly success: true; readonly activated: boolean; }

@CommandHandler(ActivateUserCommand)
export class ActivateUserHandler
  extends BaseCommandHandler<ActivateUserCommand, ActivateUserResponse>
  implements ICommandHandler<ActivateUserCommand>
{
  readonly commandType = 'user.activate';
  constructor(@Inject(USER_REPOSITORY) private readonly userRepo: UserRepository) { super(); }

  async execute(command: ActivateUserCommand): Promise<ActivateUserResponse> {
    const user = await this.userRepo.findById(command.input.userId);
    if (!user) throw new UserNotFoundError(command.input.userId);
    user.activate();
    await this.userRepo.save(user);
    return { success: true, activated: true };
  }
}
