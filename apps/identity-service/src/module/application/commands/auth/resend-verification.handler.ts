import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ResendVerificationCommand } from './resend-verification.command.js';
export interface ResendVerificationResponse { readonly success: true; readonly message: string; }

@CommandHandler(ResendVerificationCommand)
export class ResendVerificationHandler
  extends BaseCommandHandler<ResendVerificationCommand, ResendVerificationResponse>
  implements ICommandHandler<ResendVerificationCommand>
{
  readonly commandType = 'auth.resend-verification';
  async execute(_command: ResendVerificationCommand): Promise<ResendVerificationResponse> {
    return { success: true, message: 'Verification email sent' };
  }
}
