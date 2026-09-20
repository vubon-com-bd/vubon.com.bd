import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthServiceInterface } from '../interfaces/auth.service.interface';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { AuthSessionRepository } from '../../../domain/repositories/auth-session.repository.interface';
import type { AuthTokenRepository } from '../../../domain/repositories/auth-token.repository.interface';
import { UserEntity } from '../../../domain/entities/user.entity';
import { AuthSessionEntity } from '../../../domain/entities/auth-session.entity';
import { AuthTokenEntity } from '../../../domain/entities/auth-token.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { UserPasswordVO } from '../../../domain/value-objects/primitives/user-password.vo';
import { UserNameVO } from '../../../domain/value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../../domain/value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../../../domain/value-objects/primitives/user-role.vo';
import { SessionTokenVO } from '../../../domain/value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../../../domain/value-objects/primitives/session-expiry.vo';
import { TokenValueVO } from '../../../domain/value-objects/primitives/token-value.vo';
import { TokenTypeVO } from '../../../domain/value-objects/primitives/token-type.vo';
import { TokenExpiryVO } from '../../../domain/value-objects/primitives/token-expiry.vo';
import { LoginFailedError, RegisterFailedError } from '../../errors/auth.errors';
import { SessionNotFoundError } from '../../errors/session.errors';
import type { LoginRequestDTO } from '../../dtos/requests/auth/login.dto';
import type { RegisterRequestDTO } from '../../dtos/requests/auth/register.dto';
import type { LoginResponseDTO } from '../../dtos/responses/login-response.dto';
import type { RegisterResponseDTO } from '../../dtos/responses/register-response.dto';
import type { PasswordHasherPort } from '../../ports/password-hasher.port';
import type { TokenGeneratorPort } from '../../ports/token-generator.port';
import type { SessionTokenGeneratorPort } from '../../ports/session-token-generator.port';
import type { UserVerificationRepository } from '../../../domain/repositories/user-verification.repository.interface';
import { UserVerificationEntity } from '../../../domain/entities/user-verification.entity';
import { VerificationTypeVO } from '../../../domain/value-objects/primitives/verification-type.vo';
import { VerificationStatusVO } from '../../../domain/value-objects/primitives/verification-status.vo';
import { VerificationCodeVO } from '../../../domain/value-objects/primitives/verification-code.vo';
import { randomUUID } from 'node:crypto';

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const ACCESS_TTL_MS = 15 * 60 * 1000;
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

@Injectable()
export class AuthService
  extends BaseService<UserEntity, string>
  implements AuthServiceInterface
{
  readonly name = 'AuthService';

  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
    @Inject('AuthSessionRepository') private readonly sessionRepo: AuthSessionRepository,
    @Inject('AuthTokenRepository') private readonly tokenRepo: AuthTokenRepository,
    @Inject('PasswordHasherPort') private readonly passwordHasher: PasswordHasherPort,
    @Inject('TokenGeneratorPort') private readonly tokenGenerator: TokenGeneratorPort,
    @Inject('SessionTokenGeneratorPort')
    private readonly sessionTokenGenerator: SessionTokenGeneratorPort,
    @Inject('UserVerificationRepository')
    private readonly verificationRepo: UserVerificationRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async login(input: LoginRequestDTO): Promise<LoginResponseDTO> {
    const email = UserEmailVO.create(String(input.identifier));
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new LoginFailedError('invalid credentials');

    const passwordHash = await this.userRepo.getPasswordHash(user.id);
    if (!passwordHash) throw new LoginFailedError('invalid credentials');

    const passwordStr = String(input.password ?? '');
    const valid = await this.passwordHasher.compare(passwordStr, passwordHash);
    if (!valid) throw new LoginFailedError('invalid credentials');

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

    // ✅ Save access + refresh tokens in auth_tokens table
    const now = Date.now();
    await this.tokenRepo.save(
      AuthTokenEntity.create({
        userId: user.id,
        tokenValue: TokenValueVO.create(accessToken),
        tokenType: TokenTypeVO.create('access'),
        expiry: TokenExpiryVO.fromNow(ACCESS_TTL_MS),
        issuedAt: new Date(now),
        revokedAt: null,
      }),
    );
    await this.tokenRepo.save(
      AuthTokenEntity.create({
        userId: user.id,
        tokenValue: TokenValueVO.create(refreshToken),
        tokenType: TokenTypeVO.create('refresh'),
        expiry: TokenExpiryVO.fromNow(REFRESH_TTL_MS),
        issuedAt: new Date(now),
        revokedAt: null,
      }),
    );

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
    if (exists) throw new RegisterFailedError(input.email);

    UserPasswordVO.create(input.password);
    const passwordHash = await this.passwordHasher.hash(input.password);
    const userId = UserIdVO.create(randomUUID());
    const now = new Date().toISOString();

    const userEntity = UserEntity.reconstitute(
      userId,
      {
        email,
        name: UserNameVO.create(
          [input.firstName, input.lastName].filter(Boolean).join(' ') ||
            input.username ||
            input.email,
        ),
        phone: null,
        status: UserStatusVO.create('active'),
        type: UserTypeVO.create('individual'),
        role: UserRoleVO.create('user'),
        emailVerified: false,
      },
      now,
      now,
      null,
    );

    const saved = await this.userRepo.createWithPassword(userEntity, passwordHash);

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationEntity = UserVerificationEntity.create({
      userId: saved.id,
      type: VerificationTypeVO.create('email'),
      code: VerificationCodeVO.create(verificationCode),
      status: VerificationStatusVO.create('pending'),
      verifiedAt: null,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    await this.verificationRepo.save(verificationEntity);
    console.log(`🔐 Verification code for ${saved.email.value}: ${verificationCode}`);

    return {
      success: true,
      user: {
        id: saved.id.value,
        userId: saved.id.value,
        provider: 'local',
        method: 'email_password',
        identifier: saved.email.value,
        type: saved.type.value,
        status: saved.status.value,
        isEmailVerified: saved.emailVerified,
        isPhoneVerified: false,
        isMfaEnabled: false,
        createdAt: saved.createdAt,
        updatedAt: saved.updatedAt,
      },
      requiresVerification: true,
      message: 'Registration successful. Please verify your email.',
      verificationChannel: 'email',
    };
  }

  async logout(sessionId: string): Promise<void> {
    const session = await this.sessionRepo.findById(sessionId);
    if (!session) throw new SessionNotFoundError(sessionId);
    const revoked = session.revoke('user_logout');
    await this.sessionRepo.save(revoked);
    await this.publishEvents(revoked);
  }

  private async publishEvents(entity: {
    pullDomainEvents(): readonly unknown[];
  }): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
