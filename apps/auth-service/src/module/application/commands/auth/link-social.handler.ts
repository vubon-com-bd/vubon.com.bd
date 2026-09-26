import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { LinkSocialCommand } from './link-social.command';
import type { AuthSocialServiceInterface } from '../../services/interfaces/auth-social.service.interface';
import { AUTH_SOCIAL_SERVICE } from '../../tokens';

@CommandHandler(LinkSocialCommand)
export class LinkSocialHandler
  extends BaseCommandHandler<LinkSocialCommand, void>
  implements ICommandHandler<LinkSocialCommand> {
  readonly commandType = 'LinkSocialCommand';
  constructor(
    @Inject(AUTH_SOCIAL_SERVICE) private readonly socialService: AuthSocialServiceInterface,
  ) { super(); }

  async execute(command: LinkSocialCommand): Promise<void> {
    await this.socialService.link(command.userId, command.input);
  }
}
