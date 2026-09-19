import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RefreshTokenCommand } from './refresh-token.command';
import type { AuthTokenServiceInterface } from '../../services/interfaces/auth-token.service.interface';
import type { AuthTokenResponseDTO } from '../../dtos/responses/auth-token-response.dto';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  extends BaseCommandHandler<RefreshTokenCommand, AuthTokenResponseDTO>
  implements ICommandHandler<RefreshTokenCommand>
{
  readonly commandType = 'auth.refresh-token';

  constructor(
    private readonly tokenService: AuthTokenServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RefreshTokenCommand): Promise<AuthTokenResponseDTO> {
    return this.tokenService.refresh(command.refreshToken);
  }
}
