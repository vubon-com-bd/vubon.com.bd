import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RegisterCommand } from './register.command';
import type { AuthServiceInterface } from '../../services/interfaces/auth.service.interface';
import type { RegisterResponseDTO } from '../../dtos/responses/register-response.dto';
import { AUTH_SERVICE } from '../../tokens';

@CommandHandler(RegisterCommand)
export class RegisterHandler
  extends BaseCommandHandler<RegisterCommand, RegisterResponseDTO>
  implements ICommandHandler<RegisterCommand> {
  readonly commandType = 'RegisterCommand';
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthServiceInterface,
  ) { super(); }

  async execute(command: RegisterCommand): Promise<RegisterResponseDTO> {
    return this.authService.register(command.input, command.ctx);
  }
}
