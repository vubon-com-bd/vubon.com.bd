import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ResetPasswordCommand } from './reset-password.command';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { AuthTokenRepository } from '../../../domain/repositories/auth-token.repository.interface';
import { UserPasswordVO } from '../../../domain/value-objects/primitives/user-password.vo';
import { TokenValueVO } from '../../../domain/value-objects/primitives/token-value.vo';
import { InvalidTokenError } from '../../../domain/errors/token.errors';
import type { PasswordHasherPort } from '../../ports/password-hasher.port';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler
  extends BaseCommandHandler<ResetPasswordCommand, void>
  implements ICommandHandler<ResetPasswordCommand>
{
  readonly commandType = 'auth.reset-password';

  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
    @Inject('AuthTokenRepository') private readonly tokenRepo: AuthTokenRepository,
    @Inject('PasswordHasherPort') private readonly passwordHasher: PasswordHasherPort,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ResetPasswordCommand): Promise<void> {
    // 1. Validate password strength
    UserPasswordVO.create(command.newPassword);

    // 2. Find token in DB
    const tokenVO = TokenValueVO.create(command.token);
    const tokenEntity = await this.tokenRepo.findByValue(tokenVO);

    if (!tokenEntity) {
      throw new InvalidTokenError('reset token not found');
    }
    if (tokenEntity.isRevoked || tokenEntity.isExpired) {
      throw new InvalidTokenError('reset token expired or revoked');
    }

    // 3. Hash new password
    const passwordHash = await this.passwordHasher.hash(command.newPassword);

    // 4. Update user password
    await this.userRepo.updatePassword(tokenEntity.userId, passwordHash);

    // 5. Revoke token (single-use)
    const revoked = tokenEntity.revoke();
    await this.tokenRepo.save(revoked);
  }
}
