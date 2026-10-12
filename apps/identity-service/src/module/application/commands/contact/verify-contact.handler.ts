import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyContactCommand } from './verify-contact.command.js';

export interface VerifyContactResponse { readonly success: true; readonly verified: boolean; }

@CommandHandler(VerifyContactCommand)
export class VerifyContactHandler
  extends BaseCommandHandler<VerifyContactCommand, VerifyContactResponse>
  implements ICommandHandler<VerifyContactCommand>
{
  readonly commandType = 'user.verify-contact';
  async execute(_command: VerifyContactCommand): Promise<VerifyContactResponse> {
    return { success: true, verified: true };
  }
}
