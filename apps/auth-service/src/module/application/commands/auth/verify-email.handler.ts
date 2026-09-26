import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyEmailCommand } from './verify-email.command';
import type { AuthServiceInterface } from '../../services/interfaces/auth.service.interface';
import { AUTH_SERVICE } from '../../tokens';

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler
  extends BaseCommandHandler<VerifyEmailCommand, void>
  implements ICommandHandler<VerifyEmailCommand> {
  readonly commandType = 'VerifyEmailCommand';
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthServiceInterface,
  ) { super(); }

  async execute(command: VerifyEmailCommand): Promise<void> {
    await this.authService.verifyEmail(command.input);
  }
}
