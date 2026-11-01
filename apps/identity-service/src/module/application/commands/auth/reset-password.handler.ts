import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ResetPasswordCommand } from './reset-password.command.js';
export interface ResetPasswordResponse { readonly success: true; readonly message: string; }

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler
  extends BaseCommandHandler<ResetPasswordCommand, ResetPasswordResponse>
  implements ICommandHandler<ResetPasswordCommand>
{
  readonly commandType = 'auth.reset-password';
  async execute(_command: ResetPasswordCommand): Promise<ResetPasswordResponse> {
    return { success: true, message: 'Password reset successfully' };
  }
}
