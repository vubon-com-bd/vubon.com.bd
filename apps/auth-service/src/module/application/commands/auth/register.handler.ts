import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RegisterCommand } from './register.command';
import type { AuthServiceInterface } from '../../services/interfaces/auth.service.interface';
import type { RegisterResponseDTO } from '../../dtos/responses/register-response.dto';
import type { RegisterRequestDTO } from '../../dtos/requests/auth/register.dto';

@CommandHandler(RegisterCommand)
export class RegisterHandler
  extends BaseCommandHandler<RegisterCommand, RegisterResponseDTO>
  implements ICommandHandler<RegisterCommand>
{
  readonly commandType = 'auth.register';

  constructor(
    private readonly authService: AuthServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RegisterCommand): Promise<RegisterResponseDTO> {
    const input: RegisterRequestDTO = {
      email: command.email,
      password: command.password,
      confirmPassword: command.confirmPassword,
      acceptTerms: command.acceptTerms,
      acceptMarketing: command.acceptMarketing,
      phone: command.phone,
      username: command.username,
      firstName: command.firstName,
      lastName: command.lastName,
      deviceId: command.deviceId,
    };
    return this.authService.register(input);
  }
}
