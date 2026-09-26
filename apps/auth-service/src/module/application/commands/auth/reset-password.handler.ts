import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ResetPasswordCommand } from './reset-password.command';
import type { AuthServiceInterface } from '../../services/interfaces/auth.service.interface';
import { AUTH_SERVICE } from '../../tokens';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler
  extends BaseCommandHandler<ResetPasswordCommand, void>
  implements ICommandHandler<ResetPasswordCommand> {
  readonly commandType = 'ResetPasswordCommand';
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthServiceInterface,
  ) { super(); }

  async execute(command: ResetPasswordCommand): Promise<void> {
    await this.authService.resetPassword(command.input);
  }
}
