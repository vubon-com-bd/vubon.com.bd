import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SocialLoginCommand } from './social-login.command';
import type { AuthSocialServiceInterface } from '../../services/interfaces/auth-social.service.interface';
import type { SocialLoginResponseDTO } from '../../dtos/responses/social-login-response.dto';

@CommandHandler(SocialLoginCommand)
export class SocialLoginHandler
  extends BaseCommandHandler<SocialLoginCommand, SocialLoginResponseDTO>
  implements ICommandHandler<SocialLoginCommand>
{
  readonly commandType = 'auth.social-login';

  constructor(
    private readonly socialService: AuthSocialServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SocialLoginCommand): Promise<SocialLoginResponseDTO> {
    return this.socialService.login({
      provider: command.provider,
      providerUserId: command.providerUserId,
    });
  }
}
