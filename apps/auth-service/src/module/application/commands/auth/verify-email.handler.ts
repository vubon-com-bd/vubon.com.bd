import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyEmailCommand } from './verify-email.command';
import type { UserVerificationServiceInterface } from '../../services/interfaces/user-verification.service.interface';

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler
  extends BaseCommandHandler<VerifyEmailCommand, void>
  implements ICommandHandler<VerifyEmailCommand>
{
  readonly commandType = 'auth.verify-email';

  constructor(
    @Inject('UserVerificationService') @Inject('UserVerificationService') private readonly verificationService: UserVerificationServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: VerifyEmailCommand): Promise<void> {
    await this.verificationService.verify(command.userId, 'email', command.code);
  }
}
