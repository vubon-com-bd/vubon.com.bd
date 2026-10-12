import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SocialLoginCommand } from './social-login.command.js';
import type { SocialLoginResponseDTO } from '../../dtos/responses/social-login-response.dto.js';
import type { AuthSocialServiceInterface } from '../../services/interfaces/auth-social.service.interface.js';
import { AUTH_SOCIAL_SERVICE } from '../../services/interfaces/auth-social.service.interface.js';

@CommandHandler(SocialLoginCommand)
export class SocialLoginHandler
  extends BaseCommandHandler<SocialLoginCommand, SocialLoginResponseDTO>
  implements ICommandHandler<SocialLoginCommand>
{
  readonly commandType = 'auth.social-login';
  constructor(@Inject(AUTH_SOCIAL_SERVICE) private readonly service: AuthSocialServiceInterface) { super(); }
  async execute(command: SocialLoginCommand): Promise<SocialLoginResponseDTO> {
    return this.service.login(command.input);
  }
}
