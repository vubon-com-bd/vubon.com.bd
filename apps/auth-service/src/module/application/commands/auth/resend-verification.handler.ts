import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ResendVerificationCommand } from './resend-verification.command';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';

@CommandHandler(ResendVerificationCommand)
export class ResendVerificationHandler
  extends BaseCommandHandler<ResendVerificationCommand, void>
  implements ICommandHandler<ResendVerificationCommand>
{
  readonly commandType = 'auth.resend-verification';

  constructor(
    private readonly userRepo: UserRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ResendVerificationCommand): Promise<void> {
    const email = UserEmailVO.create(command.email);
    const user = await this.userRepo.findByEmail(email);
    if (!user) return;
    // TODO: infrastructure — regenerate verification code + send email
  }
}
