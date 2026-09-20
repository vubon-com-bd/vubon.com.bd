import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ForgotPasswordCommand } from './forgot-password.command';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { AuthTokenRepository } from '../../../domain/repositories/auth-token.repository.interface';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { TokenValueVO } from '../../../domain/value-objects/primitives/token-value.vo';
import { TokenTypeVO } from '../../../domain/value-objects/primitives/token-type.vo';
import { TokenExpiryVO } from '../../../domain/value-objects/primitives/token-expiry.vo';
import { AuthTokenEntity } from '../../../domain/entities/auth-token.entity';
import { randomBytes } from 'node:crypto';

const RESET_TTL_MS = 60 * 60 * 1000; // 1 hour

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  extends BaseCommandHandler<ForgotPasswordCommand, void>
  implements ICommandHandler<ForgotPasswordCommand>
{
  readonly commandType = 'auth.forgot-password';

  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
    @Inject('AuthTokenRepository') private readonly tokenRepo: AuthTokenRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ForgotPasswordCommand): Promise<void> {
    const email = UserEmailVO.create(command.email);
    const user = await this.userRepo.findByEmail(email);

    // Silent success — prevent user enumeration
    if (!user) return;

    // Generate reset token
    const rawToken = randomBytes(32).toString('hex');

    // Revoke existing reset tokens
    await this.tokenRepo.revokeAllForUser(user.id);

    // Save new reset token
    const tokenEntity = AuthTokenEntity.create({
      userId: user.id,
      tokenValue: TokenValueVO.create(rawToken),
      tokenType: TokenTypeVO.create('reset'),
      expiry: TokenExpiryVO.fromNow(RESET_TTL_MS),
      issuedAt: new Date(),
      revokedAt: null,
    });

    await this.tokenRepo.save(tokenEntity);

    // Log token (email sending not wired)
    console.log(`🔐 Reset token for ${email.value}: ${rawToken}`);
  }
}
