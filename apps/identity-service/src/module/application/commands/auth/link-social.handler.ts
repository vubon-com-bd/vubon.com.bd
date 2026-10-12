import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { LinkSocialCommand } from './link-social.command.js';
export interface LinkSocialResponse { readonly success: true; readonly linked: boolean; }

@CommandHandler(LinkSocialCommand)
export class LinkSocialHandler
  extends BaseCommandHandler<LinkSocialCommand, LinkSocialResponse>
  implements ICommandHandler<LinkSocialCommand>
{
  readonly commandType = 'auth.link-social';
  async execute(_command: LinkSocialCommand): Promise<LinkSocialResponse> {
    return { success: true, linked: true };
  }
}
