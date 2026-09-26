import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SocialCallbackCommand } from './social-callback.command';
import type { AuthSocialServiceInterface } from '../../services/interfaces/auth-social.service.interface';
import type { SocialLoginResponseDTO } from '../../dtos/responses/social-login-response.dto';
import { AUTH_SOCIAL_SERVICE } from '../../tokens';

@CommandHandler(SocialCallbackCommand)
export class SocialCallbackHandler
  extends BaseCommandHandler<SocialCallbackCommand, SocialLoginResponseDTO>
  implements ICommandHandler<SocialCallbackCommand> {
  readonly commandType = 'SocialCallbackCommand';
  constructor(
    @Inject(AUTH_SOCIAL_SERVICE) private readonly socialService: AuthSocialServiceInterface,
  ) { super(); }

  async execute(command: SocialCallbackCommand): Promise<SocialLoginResponseDTO> {
    return this.socialService.handleCallback(command.input);
  }
}
