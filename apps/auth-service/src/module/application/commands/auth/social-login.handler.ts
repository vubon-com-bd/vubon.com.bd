import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SocialLoginCommand } from './social-login.command';
import type { AuthSocialServiceInterface } from '../../services/interfaces/auth-social.service.interface';
import { AUTH_SOCIAL_SERVICE } from '../../tokens';

@CommandHandler(SocialLoginCommand)
export class SocialLoginHandler
  extends BaseCommandHandler<SocialLoginCommand, { authUrl: string; state: string }>
  implements ICommandHandler<SocialLoginCommand> {
  readonly commandType = 'SocialLoginCommand';
  constructor(
    @Inject(AUTH_SOCIAL_SERVICE) private readonly socialService: AuthSocialServiceInterface,
  ) { super(); }

  async execute(command: SocialLoginCommand) {
    return this.socialService.initiateLogin(command.input);
  }
}
