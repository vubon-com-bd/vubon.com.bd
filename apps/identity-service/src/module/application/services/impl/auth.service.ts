/**
 * Auth Service Implementation
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthServiceInterface } from '../interfaces/auth.service.interface.js';
import type { AuthRepository } from '../../../domain/repositories/auth.repository.interface.js';
import { AUTH_REPOSITORY } from '../../../domain/repositories/auth.repository.interface.js';
import type { LoginRequestDTO } from '../../dtos/requests/auth/login.dto.js';
import type { RegisterRequestDTO } from '../../dtos/requests/auth/register.dto.js';
import type { LoginResponseDTO } from '../../dtos/responses/login-response.dto.js';
import type { RegisterResponseDTO } from '../../dtos/responses/register-response.dto.js';
import type { AuthSessionServiceInterface } from '../interfaces/auth-session.service.interface.js';
import type { AuthTokenServiceInterface } from '../interfaces/auth-token.service.interface.js';
import type { AuthMfaServiceInterface } from '../interfaces/auth-mfa.service.interface.js';
import { AUTH_SESSION_SERVICE } from '../interfaces/auth-session.service.interface.js';
import { AUTH_TOKEN_SERVICE } from '../interfaces/auth-token.service.interface.js';
import { AUTH_MFA_SERVICE } from '../interfaces/auth-mfa.service.interface.js';
import { UserNotFoundByEmailError } from '../../../domain/errors/user.errors.js';

@Injectable()
export class AuthService extends BaseService implements AuthServiceInterface {
  readonly name = 'AuthService';

  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepo: AuthRepository,
    @Inject(AUTH_SESSION_SERVICE) private readonly sessionService: AuthSessionServiceInterface,
    @Inject(AUTH_TOKEN_SERVICE) private readonly tokenService: AuthTokenServiceInterface,
    @Inject(AUTH_MFA_SERVICE) private readonly mfaService: AuthMfaServiceInterface,
  ) {
    super();
  }

  async login(input: LoginRequestDTO): Promise<LoginResponseDTO> {
    const auth = await this.authRepo.findByIdentifier(input.identifier);
    if (!auth) {
      throw new UserNotFoundByEmailError(input.identifier);
    }

    if (auth.isMfaEnabled && !input.mfaCode) {
      const challenge = await this.mfaService.challenge(auth.id);
      return {
        success: true,
        user: {
          id: auth.userId.value,
          email: auth.identifier.normalized,
          status: 'active',
          type: 'individual',
          roles: ['customer'],
          emailVerified: auth.isEmailVerified,
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

    const session = await this.sessionService.create(auth.userId.value, {
      rememberMe: input.rememberMe ?? false,
    });

    const tokens = await this.tokenService.issue({
      userId: auth.userId.value,
      sessionId: session.id,
    });

    auth.recordLogin(undefined);
    await this.authRepo.save(auth);

    return {
      success: true,
      user: {
        id: auth.userId.value,
        email: auth.identifier.normalized,
        status: 'active',
        type: 'individual',
        roles: ['customer'],
        emailVerified: auth.isEmailVerified,
        createdAt: auth.createdAt,
      },
      session,
      tokens,
    };
  }

  async register(input: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const existing = await this.authRepo.findByIdentifier(input.email);
    if (existing) {
      throw new UserNotFoundByEmailError(input.email);
    }

    return {
      success: true,
      user: {
        id: '',
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        status: 'pending',
        type: 'individual',
        roles: ['customer'],
        emailVerified: false,
        createdAt: new Date().toISOString(),
      },
      requiresVerification: true,
      verificationChannel: 'email',
      message: 'Registration successful. Please verify your email.',
    };
  }
}
