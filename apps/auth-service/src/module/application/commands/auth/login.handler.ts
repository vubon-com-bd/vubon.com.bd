import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { LoginCommand } from './login.command';
import type { AuthServiceInterface } from '../../services/interfaces/auth.service.interface';
import type { LoginResponseDTO } from '../../dtos/responses/login-response.dto';
import type { LoginRequestDTO } from '../../dtos/requests/auth/login.dto';

@CommandHandler(LoginCommand)
export class LoginHandler
  extends BaseCommandHandler<LoginCommand, LoginResponseDTO>
  implements ICommandHandler<LoginCommand>
{
  readonly commandType = 'auth.login';

  constructor(
    @Inject('AuthService') private readonly authService: AuthServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: LoginCommand): Promise<LoginResponseDTO> {
    const input: LoginRequestDTO = {
      identifier: command.identifier,
      password: command.password,
      rememberMe: command.rememberMe,
      deviceId: command.deviceId,
      mfaCode: command.mfaCode,
      provider: undefined,
      method: undefined,
    };
    return this.authService.login(input);
  }
}
