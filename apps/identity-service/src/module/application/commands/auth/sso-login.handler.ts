import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SsoLoginCommand } from './sso-login.command.js';
import type { SsoLoginResponseDTO } from '../../dtos/responses/sso-login-response.dto.js';
import type { AuthSsoServiceInterface } from '../../services/interfaces/auth-sso.service.interface.js';
import { AUTH_SSO_SERVICE } from '../../services/interfaces/auth-sso.service.interface.js';

@CommandHandler(SsoLoginCommand)
export class SsoLoginHandler
  extends BaseCommandHandler<SsoLoginCommand, SsoLoginResponseDTO>
  implements ICommandHandler<SsoLoginCommand>
{
  readonly commandType = 'auth.sso-login';
  constructor(@Inject(AUTH_SSO_SERVICE) private readonly service: AuthSsoServiceInterface) { super(); }
  async execute(command: SsoLoginCommand): Promise<SsoLoginResponseDTO> {
    return this.service.login(command.input);
  }
}
