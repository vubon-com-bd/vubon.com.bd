import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ResendVerificationCommand } from './resend-verification.command';
import type { UserVerificationServiceInterface } from '../../services/interfaces/user-verification.service.interface';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { USER_REPO, USER_VERIFICATION_SERVICE } from '../../tokens';

@CommandHandler(ResendVerificationCommand)
export class ResendVerificationHandler
  extends BaseCommandHandler<ResendVerificationCommand, void>
  implements ICommandHandler<ResendVerificationCommand> {
  readonly commandType = 'ResendVerificationCommand';

  constructor(
    @Inject(USER_REPO) private readonly userRepo: UserRepository,
    @Inject(USER_VERIFICATION_SERVICE)
    private readonly verificationService: UserVerificationServiceInterface,
  ) {
    super();
  }

  async execute(command: ResendVerificationCommand): Promise<void> {
    // DTO shape: { identifier, channel? }
    // identifier may be email or phone; treat as email for this handler.
    const email = UserEmailVO.of(command.input.identifier);
    const user = await this.userRepo.findByEmail(email);
    if (!user) return; // silent — don't leak user existence

    await this.verificationService.request({
      userId: user.id,
      type: 'email',
    });
  }
}
