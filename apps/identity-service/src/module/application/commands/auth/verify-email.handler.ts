import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyEmailCommand } from './verify-email.command.js';
export interface VerifyEmailResponse { readonly success: true; readonly verified: boolean; }

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler
  extends BaseCommandHandler<VerifyEmailCommand, VerifyEmailResponse>
  implements ICommandHandler<VerifyEmailCommand>
{
  readonly commandType = 'auth.verify-email';
  async execute(_command: VerifyEmailCommand): Promise<VerifyEmailResponse> {
    return { success: true, verified: true };
  }
}
