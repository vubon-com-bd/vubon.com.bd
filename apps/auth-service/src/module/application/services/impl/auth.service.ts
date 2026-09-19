import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthServiceInterface } from '../interfaces/auth.service.interface';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { AuthSessionRepository } from '../../../domain/repositories/auth-session.repository.interface';
import { UserEntity } from '../../../domain/entities/user.entity';
import { AuthSessionEntity } from '../../../domain/entities/auth-session.entity';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { UserPasswordVO } from '../../../domain/value-objects/primitives/user-password.vo';
import { SessionTokenVO } from '../../../domain/value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../../../domain/value-objects/primitives/session-expiry.vo';
import { LoginFailedError, RegisterFailedError } from '../../errors/auth.errors';
import { SessionNotFoundError } from '../../errors/session.errors';
import type { LoginRequestDTO } from '../../dtos/requests/auth/login.dto';
import type { RegisterRequestDTO } from '../../dtos/requests/auth/register.dto';
import type { LoginResponseDTO } from '../../dtos/responses/login-response.dto';
import type { RegisterResponseDTO } from '../../dtos/responses/register-response.dto';
import type { PasswordHasherPort } from '../../ports/password-hasher.port';
import type { TokenGeneratorPort } from '../../ports/token-generator.port';
import type { SessionTokenGeneratorPort } from '../../ports/session-token-generator.port';

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const ACCESS_TTL_MS = 15 * 60 * 1000;

@Injectable()
export class AuthService
  extends BaseService<UserEntity, string>
  implements AuthServiceInterface
{
  readonly name = 'AuthService';

  constructor(
    private readonly userRepo: UserRepository,
    private readonly sessionRepo: AuthSessionRepository,
    private readonly passwordHasher: PasswordHasherPort,
    private readonly tokenGenerator: TokenGeneratorPort,
    private readonly sessionTokenGenerator: SessionTokenGeneratorPort,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async login(input: LoginRequestDTO): Promise<LoginResponseDTO> {
    const identifierStr = String(input.identifier);
    const email = UserEmailVO.create(identifierStr);
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new LoginFailedError('invalid credentials');
    }

    const passwordStr = String(input.password ?? '');
    const valid = await this.passwordHasher.compare(passwordStr, '');
    if (!valid) {
      throw new LoginFailedError('invalid credentials');
    }

    const sessionEntity = AuthSessionEntity.create({
      userId: user.id,
      token: SessionTokenVO.create(this.sessionTokenGenerator.generate()),
      expiry: SessionExpiryVO.fromNow(SESSION_TTL_MS),
      ip: '0.0.0.0',
      userAgent: 'unknown',
      deviceId: input.deviceId ?? null,
      revokedAt: null,
      revokeReason: null,
    });

    const accessToken = await this.tokenGenerator.generateAccessToken({
      sub: user.id.value,
      type: 'access',
      jti: sessionEntity.id,
    });
    const refreshToken = await this.tokenGenerator.generateRefreshToken({
      sub: user.id.value,
      type: 'refresh',
      jti: sessionEntity.id,
    });

    await this.sessionRepo.save(sessionEntity);
    await this.publishEvents(sessionEntity);

    const now = Date.now();

    return {
      success: true,
      user: {
        id: user.id.value,
        userId: user.id.value,
        type: user.type.value,
        provider: 'local',
        method: 'email_password',
        status: user.status.value,
        identifier: user.email.value,
        isEmailVerified: user.emailVerified,
        isPhoneVerified: false,
        isMfaEnabled: false,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      session: {
        id: sessionEntity.id,
        status: 'active',
        ipAddress: sessionEntity.ip,
        userAgent: sessionEntity.userAgent,
        deviceId: sessionEntity.deviceId ?? undefined,
        createdAt: sessionEntity.createdAt,
        expiresAt: new Date(now + SESSION_TTL_MS).toISOString(),
        lastAccessedAt: sessionEntity.createdAt,
        isCurrent: true,
      },
      accessToken,
      refreshToken,
      expiresAt: now + ACCESS_TTL_MS,
      tokenType: 'Bearer',
      requiresMfa: false,
      requiresVerification: !user.emailVerified,
    };
  }

  async register(input: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const email = UserEmailVO.create(input.email);
    const exists = await this.userRepo.existsByEmail(email);
    if (exists) {
      throw new RegisterFailedError(input.email);
    }

    UserPasswordVO.create(input.password);

    throw new RegisterFailedError(
      'registration persistence not yet wired (infrastructure pending)',
    );
  }

  async logout(sessionId: string): Promise<void> {
    const session = await this.sessionRepo.findById(sessionId);
    if (!session) {
      throw new SessionNotFoundError(sessionId);
    }
    const revoked = session.revoke('user_logout');
    await this.sessionRepo.save(revoked);
    await this.publishEvents(revoked);
  }

  private async publishEvents(entity: { pullDomainEvents(): readonly unknown[] }): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
