import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SocialCallbackCommand } from './social-callback.command.js';
import type { SocialLoginResponseDTO } from '../../dtos/responses/social-login-response.dto.js';
import type { AuthSocialServiceInterface } from '../../services/interfaces/auth-social.service.interface.js';
import { AUTH_SOCIAL_SERVICE } from '../../services/interfaces/auth-social.service.interface.js';

@CommandHandler(SocialCallbackCommand)
export class SocialCallbackHandler
  extends BaseCommandHandler<SocialCallbackCommand, SocialLoginResponseDTO>
  implements ICommandHandler<SocialCallbackCommand>
{
  readonly commandType = 'auth.social-callback';
  constructor(@Inject(AUTH_SOCIAL_SERVICE) private readonly service: AuthSocialServiceInterface) { super(); }
  async execute(command: SocialCallbackCommand): Promise<SocialLoginResponseDTO> {
    return this.service.login(command.input);
  }
}
