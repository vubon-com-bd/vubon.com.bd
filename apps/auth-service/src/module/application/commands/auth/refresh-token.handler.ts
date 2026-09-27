import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RefreshTokenCommand } from './refresh-token.command.js';
import type { AuthTokenServiceInterface } from '../../services/interfaces/auth-token.service.interface.js';
import type { AuthTokenResponseDTO } from '../../dtos/responses/auth-token-response.dto.js';
import { AUTH_TOKEN_SERVICE } from '../../tokens.js';

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
