/**
 * AuthService — Core authentication: login, register, logout, password flows
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthServiceInterface } from '../interfaces/auth.service.interface';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { AuthSessionServiceInterface } from '../interfaces/auth-session.service.interface';
import type { AuthTokenServiceInterface } from '../interfaces/auth-token.service.interface';
import type { PasswordHasherServiceInterface } from '../interfaces/password-hasher.service.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { UserPhoneVO } from '../../../domain/value-objects/primitives/user-phone.vo';
import { UserNameVO } from '../../../domain/value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../../domain/value-objects/primitives/user-type.vo';
import { UserEntity } from '../../../domain/entities/user.entity';
import {
  InvalidCredentialsError,
  UnauthorizedError,
} from '../../errors/auth.errors';
import { UserAlreadyExistsAppError } from '../../errors/user.errors';
import type { LoginRequestDTO } from '../../dtos/requests/auth/login.dto';
import type { RegisterRequestDTO } from '../../dtos/requests/auth/register.dto';
import type { LogoutRequestDTO } from '../../dtos/requests/auth/logout.dto';
import type { ForgotPasswordRequestDTO } from '../../dtos/requests/auth/forgot-password.dto';
import type { ResetPasswordRequestDTO } from '../../dtos/requests/auth/reset-password.dto';
import type { VerifyEmailRequestDTO } from '../../dtos/requests/auth/verify-email.dto';
import type {
  LoginResponseDTO,
  LoginMfaRequiredResponseDTO,
} from '../../dtos/responses/login-response.dto';
import type { RegisterResponseDTO } from '../../dtos/responses/register-response.dto';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';
import { USER_REPO } from '../../tokens';
import {
  AUTH_SESSION_SERVICE,
  AUTH_TOKEN_SERVICE,
  PASSWORD_HASHER,
} from '../../tokens';
import { ID_GENERATOR } from '../tokens';

@Injectable()
export class AuthService
  extends BaseService<UserEntity, UserId>
  implements AuthServiceInterface {
  readonly name = 'AuthService';

  constructor(
    @Inject(USER_REPO) private readonly userRepo: UserRepository,
    @Inject(AUTH_SESSION_SERVICE)
    private readonly sessionService: AuthSessionServiceInterface,
    @Inject(AUTH_TOKEN_SERVICE)
    private readonly tokenService: AuthTokenServiceInterface,
    @Inject(PASSWORD_HASHER)
    private readonly hasher: PasswordHasherServiceInterface,
    @Inject(ID_GENERATOR)
    private readonly idGen: IdGeneratorServiceInterface,
  ) {
    super();
  }

  async login(
    input: LoginRequestDTO,
    ctx?: { ip?: string; userAgent?: string },
  ): Promise<LoginResponseDTO | LoginMfaRequiredResponseDTO> {
    const email = UserEmailVO.of(input.identifier);
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError({ identifier: input.identifier });
    }
    const ok = await this.hasher.verify(input.password, user.passwordHash);
    if (!ok) {
      throw new InvalidCredentialsError({ userId: user.id });
    }
    user.assertCanLogin();

    const session = await this.sessionService.create({
      userId: user.id,
      ipAddress: ctx?.ip ?? 'unknown',
      userAgent: ctx?.userAgent ?? 'unknown',
      deviceId: input.deviceId,
    });
    const tokens = await this.tokenService.generatePair(user.id);

    return {
      success: true,
      user: this.userToResponse(user),
      session: this.sessionService.toResponse(session),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tokenType: 'Bearer',
      expiresAt: tokens.expiresAt,
    };
  }

  async register(
    input: RegisterRequestDTO,
    _ctx?: { ip?: string; userAgent?: string },
  ): Promise<RegisterResponseDTO> {
    const email = UserEmailVO.of(input.email);
    const exists = await this.userRepo.existsByEmail(email);
    if (exists) throw new UserAlreadyExistsAppError('email', input.email);

    const passwordHash = await this.hasher.hash(input.password);
    const now = new Date().toISOString();
    const displayName =
      [input.firstName, input.lastName].filter(Boolean).join(' ').trim() ||
      'User';

    const entity = UserEntity.create({
      id: this.idGen.generateUuid() as UserId,
      email,
      passwordHash,
      name: UserNameVO.of(displayName),
      phone: input.phone ? UserPhoneVO.of(input.phone) : undefined,
      status: UserStatusVO.of('pending'),
      type: UserTypeVO.of('customer'),
      roles: [],
      emailVerified: false,
      phoneVerified: false,
      createdAt: now,
      updatedAt: now,
    });

    const saved = await this.userRepo.save(entity);

    return {
      user: this.userToResponse(saved),
      verificationSent: true,
      nextStep: 'verify_email',
    };
  }

  async logout(input: LogoutRequestDTO): Promise<void> {
    if (input.sessionId) {
      await this.sessionService.revoke(input.sessionId, 'user_logout');
    }
    // If a refresh token identifier is present, revoke all tokens for the user.
    if (typeof input.refreshToken === 'string' && input.refreshToken.length > 0) {
      try {
        const entity = await this.tokenService.verify(
          input.refreshToken,
          'refresh',
        );
        await this.tokenService.revoke(entity.id);
      } catch {
        // Idempotent logout — swallow token errors.
      }
    }
  }

  async forgotPassword(_input: ForgotPasswordRequestDTO): Promise<void> {
    // Side effects (email enqueue) are handled by Sagas.
  }

  async resetPassword(input: ResetPasswordRequestDTO): Promise<void> {
    const entity = await this.tokenService.verify(input.token, 'password_reset');
    const user = await this.userRepo.findById(entity.subjectId as UserId);
    if (!user) throw new UnauthorizedError('User no longer exists');
    const passwordHash = await this.hasher.hash(input.newPassword);
    user.changePasswordHash(passwordHash);
    await this.userRepo.save(user);
    await this.tokenService.revoke(entity.id);
  }

  async verifyEmail(input: VerifyEmailRequestDTO): Promise<void> {
    const email = UserEmailVO.of(input.email);
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new UnauthorizedError('User not found');
    user.markEmailVerified();
    await this.userRepo.save(user);
  }

  private userToResponse(user: UserEntity): UserResponseDTO {
    return {
      id: user.id,
      email: user.email.value,
      phone: user.phone?.value,
      name: user.name.value,
      status: user.status.value as
        | 'active'
        | 'inactive'
        | 'suspended'
        | 'pending'
        | 'deleted',
      type: user.type.value,
      roles: user.roles.map((r) => r.value),
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      mfaEnabled: false,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
