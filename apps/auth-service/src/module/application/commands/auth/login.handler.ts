/**
 * LoginHandler
 * @module auth-service/application/commands/auth
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { LoginCommand } from './login.command';
import type { AuthServiceInterface } from '../../services/interfaces/auth.service.interface';
import type { LoginResponseDTO, LoginMfaRequiredResponseDTO } from '../../dtos/responses/login-response.dto';
import { AUTH_SERVICE } from '../../tokens';

@CommandHandler(LoginCommand)
export class LoginHandler
  extends BaseCommandHandler<LoginCommand, LoginResponseDTO | LoginMfaRequiredResponseDTO>
  implements ICommandHandler<LoginCommand> {
  readonly commandType = 'LoginCommand';

  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthServiceInterface,
  ) {
    super();
  }

  async execute(
    command: LoginCommand,
  ): Promise<LoginResponseDTO | LoginMfaRequiredResponseDTO> {
    return this.authService.login(command.input, command.ctx);
  }
}
