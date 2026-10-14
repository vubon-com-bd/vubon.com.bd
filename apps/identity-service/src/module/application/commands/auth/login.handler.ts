/**
 * Login Handler
 * @module identity-service/application/commands/auth
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { LoginCommand } from './login.command.js';
import type { LoginResponseDTO } from '../../dtos/responses/login-response.dto.js';
import type { AuthRepository } from '../../../domain/repositories/auth.repository.interface.js';
import { AUTH_REPOSITORY } from '../../../domain/repositories/auth.repository.interface.js';
import type { AuthSessionServiceInterface } from '../../services/interfaces/auth-session.service.interface.js';
import { AUTH_SESSION_SERVICE } from '../../services/interfaces/auth-session.service.interface.js';
import type { AuthTokenServiceInterface } from '../../services/interfaces/auth-token.service.interface.js';
import { AUTH_TOKEN_SERVICE } from '../../services/interfaces/auth-token.service.interface.js';
import { UserNotFoundByEmailError } from '../../../domain/errors/user.errors.js';

@CommandHandler(LoginCommand)
export class LoginHandler
  extends BaseCommandHandler<LoginCommand, LoginResponseDTO>
  implements ICommandHandler<LoginCommand>
{
  readonly commandType = 'auth.login';
  private readonly logger = new Logger(LoginHandler.name);

  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepo: AuthRepository,
    @Inject(AUTH_SESSION_SERVICE) private readonly sessionService: AuthSessionServiceInterface,
    @Inject(AUTH_TOKEN_SERVICE) private readonly tokenService: AuthTokenServiceInterface,
    private readonly eventBridge: DomainEventBridgeService,
  ) {
    super();
  }

  async execute(command: LoginCommand): Promise<LoginResponseDTO> {
    const identifier = command.input.identifier.trim();
    this.logger.log(`Login attempt: identifier=${identifier}`);

    // 1. Find auth by identifier
    const auth = await this.authRepo.findByIdentifier(identifier);
    if (!auth) {
      this.logger.warn(`Auth not found for identifier: ${identifier}`);
      throw new UserNotFoundByEmailError(identifier);
    }

    // 2. Create session
    const session = await this.sessionService.create(auth.userId.value, {
      ipAddress: command.ipAddress,
      userAgent: command.userAgent,
      rememberMe: command.input.rememberMe ?? false,
    });

    // 3. Issue tokens
    const tokens = await this.tokenService.issue({
      userId: auth.userId.value,
      sessionId: session.id,
    });

    // 4. Update last login
    auth.recordLogin(undefined);
    const saved = await this.authRepo.save(auth);
    await this.eventBridge.publishFromEntity(saved);

    this.logger.log(`Login success: userId=${auth.userId.value}`);

    return {
      success: true,
      user: {
        id: auth.userId.value,
        email: auth.identifier.normalized,
        status: 'active',
        type: 'individual',
        roles: ['customer'],
        emailVerified: auth.isEmailVerified,
        phoneVerified: auth.isPhoneVerified,
        isMfaEnabled: auth.isMfaEnabled,
        createdAt: auth.createdAt,
      },
      session,
      tokens,
    };
  }
}
