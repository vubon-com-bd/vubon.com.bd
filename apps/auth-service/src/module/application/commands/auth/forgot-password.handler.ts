import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ForgotPasswordCommand } from './forgot-password.command';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  extends BaseCommandHandler<ForgotPasswordCommand, void>
  implements ICommandHandler<ForgotPasswordCommand>
{
  readonly commandType = 'auth.forgot-password';

  constructor(
    private readonly userRepo: UserRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ForgotPasswordCommand): Promise<void> {
    const email = UserEmailVO.create(command.email);
    const user = await this.userRepo.findByEmail(email);
    // Silent success — prevent user enumeration
    if (!user) return;
    // TODO: infrastructure hook — generate reset token + send email
  }
}
