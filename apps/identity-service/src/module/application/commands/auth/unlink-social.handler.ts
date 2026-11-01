import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UnlinkSocialCommand } from './unlink-social.command.js';
export interface UnlinkSocialResponse { readonly success: true; readonly unlinked: boolean; }

@CommandHandler(UnlinkSocialCommand)
export class UnlinkSocialHandler
  extends BaseCommandHandler<UnlinkSocialCommand, UnlinkSocialResponse>
  implements ICommandHandler<UnlinkSocialCommand>
{
  readonly commandType = 'auth.unlink-social';
  async execute(_command: UnlinkSocialCommand): Promise<UnlinkSocialResponse> {
    return { success: true, unlinked: true };
  }
}
