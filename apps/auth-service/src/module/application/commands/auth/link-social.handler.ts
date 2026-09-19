import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { LinkSocialCommand } from './link-social.command';
import type { AuthSocialServiceInterface } from '../../services/interfaces/auth-social.service.interface';

@CommandHandler(LinkSocialCommand)
export class LinkSocialHandler
  extends BaseCommandHandler<LinkSocialCommand, void>
  implements ICommandHandler<LinkSocialCommand>
{
  readonly commandType = 'auth.link-social';

  constructor(
    private readonly socialService: AuthSocialServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: LinkSocialCommand): Promise<void> {
    await this.socialService.link(command.userId, {
      provider: command.provider,
      providerUserId: command.providerUserId,
    });
  }
}
