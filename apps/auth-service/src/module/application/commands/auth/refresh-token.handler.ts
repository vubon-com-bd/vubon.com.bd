import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RefreshTokenCommand } from './refresh-token.command';
import type { AuthTokenServiceInterface } from '../../services/interfaces/auth-token.service.interface';
import type { AuthTokenResponseDTO } from '../../dtos/responses/auth-token-response.dto';
import { AUTH_TOKEN_SERVICE } from '../../tokens';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  extends BaseCommandHandler<RefreshTokenCommand, AuthTokenResponseDTO>
  implements ICommandHandler<RefreshTokenCommand> {
  readonly commandType = 'RefreshTokenCommand';
  constructor(
    @Inject(AUTH_TOKEN_SERVICE) private readonly tokenService: AuthTokenServiceInterface,
  ) { super(); }

  async execute(command: RefreshTokenCommand): Promise<AuthTokenResponseDTO> {
    return this.tokenService.refresh(command.input.refreshToken);
  }
}
