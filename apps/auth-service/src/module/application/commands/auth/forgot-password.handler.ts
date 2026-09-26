import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ForgotPasswordCommand } from './forgot-password.command';
import type { AuthServiceInterface } from '../../services/interfaces/auth.service.interface';
import { AUTH_SERVICE } from '../../tokens';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  extends BaseCommandHandler<ForgotPasswordCommand, void>
  implements ICommandHandler<ForgotPasswordCommand> {
  readonly commandType = 'ForgotPasswordCommand';
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthServiceInterface,
  ) { super(); }

  async execute(command: ForgotPasswordCommand): Promise<void> {
    await this.authService.forgotPassword(command.input);
  }
}
