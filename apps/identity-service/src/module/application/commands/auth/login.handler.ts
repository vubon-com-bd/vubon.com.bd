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
import { USER_REPOSITORY, type UserRepository } from '../../../domain/repositories/user.repository.interface.js';
import type { AuthSessionServiceInterface } from '../../services/interfaces/auth-session.service.interface.js';
import { AUTH_SESSION_SERVICE } from '../../services/interfaces/auth-session.service.interface.js';
import type { AuthTokenServiceInterface } from '../../services/interfaces/auth-token.service.interface.js';
import { AUTH_TOKEN_SERVICE } from '../../services/interfaces/auth-token.service.interface.js';
import type { AuthMfaServiceInterface } from '../../services/interfaces/auth-mfa.service.interface.js';
import { AUTH_MFA_SERVICE } from '../../services/interfaces/auth-mfa.service.interface.js';
import { UserNotFoundByEmailError } from '../../../domain/errors/user.errors.js';
import { CREDENTIAL_REPOSITORY, type CredentialRepository } from '../../../domain/repositories/credential.repository.interface.js';
import { PASSWORD_HASHER_SERVICE, type PasswordHasherServiceInterface } from '../../services/interfaces/password-hasher.service.interface.js';
import { InvalidCredentialsError } from '../../../domain/errors/auth.errors.js';

@CommandHandler(LoginCommand)
export class LoginHandler
  extends BaseCommandHandler<LoginCommand, LoginResponseDTO>
  implements ICommandHandler<LoginCommand>
{
  readonly commandType = 'auth.login';
  private readonly logger = new Logger(LoginHandler.name);

  constructor(
    @Inject(CREDENTIAL_REPOSITORY) private readonly credentialRepo: CredentialRepository,
    @Inject(PASSWORD_HASHER_SERVICE) private readonly passwordHasher: PasswordHasherServiceInterface,
    @Inject(AUTH_REPOSITORY) private readonly authRepo: AuthRepository,
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(AUTH_SESSION_SERVICE) private readonly sessionService: AuthSessionServiceInterface,
    @Inject(AUTH_TOKEN_SERVICE) private readonly tokenService: AuthTokenServiceInterface,
    @Inject(AUTH_MFA_SERVICE) private readonly mfaService: AuthMfaServiceInterface,
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

    // 2. MFA gate: if enabled and no code provided → return challenge
    if (auth.isMfaEnabled && !command.input.mfaCode) {
      const challenge = await this.mfaService.challenge(auth.id);
      this.logger.log(`MFA required for authId=${auth.id}`);
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
        session: {
          id: '',
          userId: auth.userId.value,
          status: 'pending',
          createdAt: new Date().toISOString(),
          lastAccessedAt: new Date().toISOString(),
          expiresAt: new Date().toISOString(),
          isCurrent: false,
        },
        tokens: {
          accessToken: '',
          refreshToken: '',
          tokenType: 'Bearer',
          expiresIn: 0,
          expiresAt: 0,
        },
        requiresMfa: true,
        challengeId: challenge.challengeId,
        mfaMethods: challenge.mfaMethods,
      };
    }

    // 2.5 Verify password
    if (!command.input.password) {
      throw new InvalidCredentialsError();
    }
    const credential = await this.credentialRepo.findByAuthIdRaw(auth.id);
    if (!credential) {
      this.logger.warn(`No credential found for authId=${auth.id}`);
      throw new InvalidCredentialsError();
    }
    const isValid = await this.passwordHasher.verify(command.input.password, credential.passwordHash.value);
    if (!isValid) {
      this.logger.warn(`Invalid password for authId=${auth.id}`);
      throw new InvalidCredentialsError();
    }

    // 3. Create session
    const session = await this.sessionService.create(auth.userId.value, {
      authId: auth.id,
      ipAddress: command.ipAddress,
      userAgent: command.userAgent,
      rememberMe: command.input.rememberMe ?? false,
    });

    // 4. Issue tokens
    // Fetch user roles for JWT
    let roles: readonly string[] = ['customer'];
    try {
      const user = await this.userRepo.findById(auth.userId.value);
      if (user && Array.isArray((user as unknown as { roles?: readonly { value: string }[] }).roles)) {
        roles = ((user as unknown as { roles: readonly { value: string }[] }).roles).map((r) => r.value);
      }
    } catch (err) {
      this.logger.warn(`Role fetch failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }

    const tokens = await this.tokenService.issue({
      userId: auth.userId.value,
      sessionId: session.id,
      roles,
    });

    // 5. Update last login
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
