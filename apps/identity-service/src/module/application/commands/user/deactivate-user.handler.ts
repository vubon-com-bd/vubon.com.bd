import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeactivateUserCommand } from './deactivate-user.command.js';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface.js';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.interface.js';
import { UserNotFoundError } from '../../../domain/errors/user.errors.js';

export interface DeactivateUserResponse { readonly success: true; readonly deactivated: boolean; }

@CommandHandler(DeactivateUserCommand)
export class DeactivateUserHandler
  extends BaseCommandHandler<DeactivateUserCommand, DeactivateUserResponse>
  implements ICommandHandler<DeactivateUserCommand>
{
  readonly commandType = 'user.deactivate';
  constructor(@Inject(USER_REPOSITORY) private readonly userRepo: UserRepository) { super(); }

  async execute(command: DeactivateUserCommand): Promise<DeactivateUserResponse> {
    const user = await this.userRepo.findById(command.input.userId);
    if (!user) throw new UserNotFoundError(command.input.userId);
    user.deactivate(command.input.reason);
    await this.userRepo.save(user);
    return { success: true, deactivated: true };
  }
}
