import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SsoCallbackCommand } from './sso-callback.command';
import type { AuthSsoServiceInterface } from '../../services/interfaces/auth-sso.service.interface';
import type { SsoLoginResponseDTO } from '../../dtos/responses/sso-login-response.dto';

@CommandHandler(SsoCallbackCommand)
export class SsoCallbackHandler
  extends BaseCommandHandler<SsoCallbackCommand, SsoLoginResponseDTO>
  implements ICommandHandler<SsoCallbackCommand>
{
  readonly commandType = 'auth.sso-callback';

  constructor(
    private readonly ssoService: AuthSsoServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SsoCallbackCommand): Promise<SsoLoginResponseDTO> {
    return this.ssoService.callback(command.provider, command.token);
  }
}
