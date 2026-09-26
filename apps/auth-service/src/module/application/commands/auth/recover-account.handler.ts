import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RecoverAccountCommand } from './recover-account.command';
import type { AuthRecoveryCodeServiceInterface } from '../../services/interfaces/auth-recovery-code.service.interface';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { PasswordHasherServiceInterface } from '../../services/interfaces/password-hasher.service.interface';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { UnauthorizedError } from '../../errors/auth.errors';
import { USER_REPO } from '../../tokens';
import { PASSWORD_HASHER } from '../../tokens';
import { AUTH_RECOVERY_CODE_SERVICE } from '../../tokens';

@CommandHandler(RecoverAccountCommand)
export class RecoverAccountHandler
  extends BaseCommandHandler<RecoverAccountCommand, void>
  implements ICommandHandler<RecoverAccountCommand> {
  readonly commandType = 'RecoverAccountCommand';
  constructor(
    @Inject(USER_REPO) private readonly userRepo: UserRepository,
    @Inject(PASSWORD_HASHER) private readonly hasher: PasswordHasherServiceInterface,
    @Inject(AUTH_RECOVERY_CODE_SERVICE)
    private readonly recoveryService: AuthRecoveryCodeServiceInterface,
  ) { super(); }

  async execute(command: RecoverAccountCommand): Promise<void> {
    const email = UserEmailVO.of(command.input.email);
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new UnauthorizedError('Invalid recovery attempt');

    const ok = await this.recoveryService.consume(
      user.id,
      command.input.recoveryCode,
    );
    if (!ok) throw new UnauthorizedError('Invalid recovery code');

    const passwordHash = await this.hasher.hash(command.input.newPassword);
    user.changePasswordHash(passwordHash);
    await this.userRepo.save(user);
  }
}
