import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SsoLoginCommand } from './sso-login.command';
import type { AuthSsoServiceInterface } from '../../services/interfaces/auth-sso.service.interface';
import type { SsoLoginResponseDTO } from '../../dtos/responses/sso-login-response.dto';

@CommandHandler(SsoLoginCommand)
export class SsoLoginHandler
  extends BaseCommandHandler<SsoLoginCommand, SsoLoginResponseDTO>
  implements ICommandHandler<SsoLoginCommand>
{
  readonly commandType = 'auth.sso-login';

  constructor(
    @Inject('AuthSsoService') @Inject('AuthSsoService') private readonly ssoService: AuthSsoServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SsoLoginCommand): Promise<SsoLoginResponseDTO> {
    return this.ssoService.login(command.provider, command.externalId);
  }
}
