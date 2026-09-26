import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SsoCallbackCommand } from './sso-callback.command';
import type { AuthSsoServiceInterface } from '../../services/interfaces/auth-sso.service.interface';
import type { SsoLoginResponseDTO } from '../../dtos/responses/sso-login-response.dto';
import { AUTH_SSO_SERVICE } from '../../tokens';

@CommandHandler(SsoCallbackCommand)
export class SsoCallbackHandler
  extends BaseCommandHandler<SsoCallbackCommand, SsoLoginResponseDTO>
  implements ICommandHandler<SsoCallbackCommand> {
  readonly commandType = 'SsoCallbackCommand';
  constructor(
    @Inject(AUTH_SSO_SERVICE) private readonly ssoService: AuthSsoServiceInterface,
  ) { super(); }

  async execute(command: SsoCallbackCommand): Promise<SsoLoginResponseDTO> {
    return this.ssoService.handleCallback(command.input);
  }
}
