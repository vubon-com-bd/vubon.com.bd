/**
 * AuthSsoService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthSsoServiceInterface } from '../interfaces/auth-sso.service.interface';
import type { AuthSsoRepository } from '../../../domain/repositories/auth-sso.repository.interface';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import type { AuthTokenServiceInterface } from '../interfaces/auth-token.service.interface';
import type { AuthSessionServiceInterface } from '../interfaces/auth-session.service.interface';
import { AuthSsoEntity } from '../../../domain/entities/auth-sso.entity';
import { SsoProviderVO } from '../../../domain/value-objects/primitives/sso-provider.vo';
import { SsoFailedAppError } from '../../errors/sso.errors';
import type { SsoLoginRequestDTO } from '../../dtos/requests/auth/sso-login.dto';
import type { SsoCallbackRequestDTO } from '../../dtos/requests/auth/sso-callback.dto';
import type { SsoLoginResponseDTO } from '../../dtos/responses/sso-login-response.dto';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';
import { USER_REPO } from '../../tokens';
import { ID_GENERATOR } from '../tokens';
import { AUTH_TOKEN_SERVICE, AUTH_SESSION_SERVICE } from '../../tokens';
import { AUTH_SSO_REPO } from '../../tokens';

@Injectable()
export class AuthSsoService
  extends BaseService<AuthSsoEntity, string>
  implements AuthSsoServiceInterface {
  readonly name = 'AuthSsoService';

  constructor(
    @Inject(AUTH_SSO_REPO) private readonly repo: AuthSsoRepository,
    @Inject(USER_REPO) private readonly userRepo: UserRepository,
    @Inject(AUTH_TOKEN_SERVICE) private readonly tokenService: AuthTokenServiceInterface,
    @Inject(AUTH_SESSION_SERVICE) private readonly sessionService: AuthSessionServiceInterface,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) {
    super();
  }

  async initiateLogin(
    input: SsoLoginRequestDTO,
  ): Promise<{ redirectUrl: string; state: string }> {
    const state = this.idGen.generateUuid();
    // `SsoLoginRequestSchema` shape: { providerId, relayState?, returnUrl? }
    const redirectUrl = `https://sso.example.com/login?providerId=${encodeURIComponent(
      input.providerId,
    )}&state=${state}`;
    return { redirectUrl, state };
  }

  async handleCallback(
    input: SsoCallbackRequestDTO,
  ): Promise<SsoLoginResponseDTO> {
    const provider = SsoProviderVO.of(input.provider);
    const providerUserId = input.code ?? input.samlResponse ?? '';
    if (!providerUserId) {
      throw new SsoFailedAppError(input.provider, 'missing code');
    }
    const binding = await this.repo.findByProviderAndTenant(
      provider,
      input.tenantId,
      providerUserId,
    );
    if (!binding) {
      throw new SsoFailedAppError(input.provider, 'no binding');
    }
    const user = await this.userRepo.findById(binding.userId);
    if (!user) throw new SsoFailedAppError(input.provider, 'user not found');

    const session = await this.sessionService.create({
      userId: user.id,
      ipAddress: 'unknown',
      userAgent: 'unknown',
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
      tenantId: input.tenantId,
    };
  }

  async listForUser(userId: UserId): Promise<readonly AuthSsoEntity[]> {
    return this.repo.findByUser(userId);
  }

  async revoke(userId: UserId, tenantId: string): Promise<void> {
    const list = await this.repo.findByUser(userId);
    const target = list.find((e) => e.tenantId === tenantId);
    if (target) {
      target.revoke();
      await this.repo.save(target);
    }
  }

  private userToResponse(user: {
    id: string;
    email: { value: string };
    phone?: { value: string };
    name: { value: string };
    status: { value: string };
    type: { value: string };
    roles: readonly { value: string }[];
    emailVerified: boolean;
    phoneVerified: boolean;
    createdAt: string;
    updatedAt: string;
  }): UserResponseDTO {
    return {
      id: user.id,
      email: user.email.value,
      phone: user.phone?.value,
      name: user.name.value,
      status: user.status.value as UserResponseDTO['status'],
      type: user.type.value as UserResponseDTO['type'],
      roles: user.roles.map((r) => r.value),
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      mfaEnabled: false,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
