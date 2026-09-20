import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SocialCallbackCommand } from './social-callback.command';
import type { AuthOAuthServiceInterface } from '../../services/interfaces/auth-oauth.service.interface';

@CommandHandler(SocialCallbackCommand)
export class SocialCallbackHandler
  extends BaseCommandHandler<SocialCallbackCommand, void>
  implements ICommandHandler<SocialCallbackCommand>
{
  readonly commandType = 'auth.social-callback';

  constructor(
    @Inject('AuthOAuthService') @Inject('AuthOAuthService') private readonly oauthService: AuthOAuthServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SocialCallbackCommand): Promise<void> {
    await this.oauthService.callback(command.provider, command.code, command.state);
  }
}
