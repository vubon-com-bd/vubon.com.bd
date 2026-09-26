import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ChangePasswordCommand } from './change-password.command';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { PasswordHasherServiceInterface } from '../../services/interfaces/password-hasher.service.interface';
import { UserNotFoundAppError } from '../../errors/user.errors';
import { InvalidCredentialsError } from '../../errors/auth.errors';
import { USER_REPO } from '../../tokens';
import { PASSWORD_HASHER } from '../../tokens';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  extends BaseCommandHandler<ChangePasswordCommand, void>
  implements ICommandHandler<ChangePasswordCommand> {
  readonly commandType = 'ChangePasswordCommand';
  constructor(
    @Inject(USER_REPO) private readonly userRepo: UserRepository,
    @Inject(PASSWORD_HASHER) private readonly hasher: PasswordHasherServiceInterface,
  ) { super(); }

  async execute(command: ChangePasswordCommand): Promise<void> {
    const user = await this.userRepo.findById(command.userId);
    if (!user) throw new UserNotFoundAppError(command.userId);

    const anyInput = command.input as { currentPassword?: string; newPassword?: string };
    if (anyInput.currentPassword) {
      const ok = await this.hasher.verify(anyInput.currentPassword, user.passwordHash);
      if (!ok) throw new InvalidCredentialsError({ userId: user.id });
    }
    if (!anyInput.newPassword) throw new InvalidCredentialsError({ reason: 'newPassword missing' });

    const hash = await this.hasher.hash(anyInput.newPassword);
    user.changePasswordHash(hash);
    await this.userRepo.save(user);
  }
}
