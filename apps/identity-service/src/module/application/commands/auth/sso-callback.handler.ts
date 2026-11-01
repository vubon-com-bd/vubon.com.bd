import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SsoCallbackCommand } from './sso-callback.command.js';
import type { SsoLoginResponseDTO } from '../../dtos/responses/sso-login-response.dto.js';
import type { AuthSsoServiceInterface } from '../../services/interfaces/auth-sso.service.interface.js';
import { AUTH_SSO_SERVICE } from '../../services/interfaces/auth-sso.service.interface.js';

@CommandHandler(SsoCallbackCommand)
export class SsoCallbackHandler
  extends BaseCommandHandler<SsoCallbackCommand, SsoLoginResponseDTO>
  implements ICommandHandler<SsoCallbackCommand>
{
  readonly commandType = 'auth.sso-callback';
  constructor(@Inject(AUTH_SSO_SERVICE) private readonly service: AuthSsoServiceInterface) { super(); }
  async execute(command: SsoCallbackCommand): Promise<SsoLoginResponseDTO> {
    return this.service.login(command.input);
  }
}
