import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SsoLoginCommand } from './sso-login.command';
import type { AuthSsoServiceInterface } from '../../services/interfaces/auth-sso.service.interface';
import { AUTH_SSO_SERVICE } from '../../tokens';

@CommandHandler(SsoLoginCommand)
export class SsoLoginHandler
  extends BaseCommandHandler<SsoLoginCommand, { redirectUrl: string; state: string }>
  implements ICommandHandler<SsoLoginCommand> {
  readonly commandType = 'SsoLoginCommand';
  constructor(
    @Inject(AUTH_SSO_SERVICE) private readonly ssoService: AuthSsoServiceInterface,
  ) { super(); }

  async execute(command: SsoLoginCommand) {
    return this.ssoService.initiateLogin(command.input);
  }
}
