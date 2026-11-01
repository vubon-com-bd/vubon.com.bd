import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RefreshTokenCommand } from './refresh-token.command.js';
import type { RefreshTokenResponseDTO } from '../../dtos/responses/refresh-token-response.dto.js';
import type { AuthTokenServiceInterface } from '../../services/interfaces/auth-token.service.interface.js';
import { AUTH_TOKEN_SERVICE } from '../../services/interfaces/auth-token.service.interface.js';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  extends BaseCommandHandler<RefreshTokenCommand, RefreshTokenResponseDTO>
  implements ICommandHandler<RefreshTokenCommand>
{
  readonly commandType = 'auth.refresh-token';
  constructor(@Inject(AUTH_TOKEN_SERVICE) private readonly tokenService: AuthTokenServiceInterface) { super(); }
  async execute(command: RefreshTokenCommand): Promise<RefreshTokenResponseDTO> {
    const now = Math.floor(Date.now() / 1000);
    return {
      success: true,
      tokens: {
        accessToken: command.input.refreshToken,
        refreshToken: command.input.refreshToken,
        tokenType: 'Bearer',
        expiresIn: 900,
        expiresAt: now + 900,
      },
    };
  }
}
