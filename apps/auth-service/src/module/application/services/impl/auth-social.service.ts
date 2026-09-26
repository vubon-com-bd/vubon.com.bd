/**
 * AuthSocialService — Social login, link, unlink
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthSocialServiceInterface } from '../interfaces/auth-social.service.interface';
import type { AuthSocialRepository } from '../../../domain/repositories/auth-social.repository.interface';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import type { AuthTokenServiceInterface } from '../interfaces/auth-token.service.interface';
import type { AuthSessionServiceInterface } from '../interfaces/auth-session.service.interface';
import { AuthSocialEntity } from '../../../domain/entities/auth-social.entity';
import { SocialProviderVO } from '../../../domain/value-objects/primitives/social-provider.vo';
import { SocialStatusVO } from '../../../domain/value-objects/primitives/social-status.vo';
import {
  SocialAlreadyLinkedAppError,
  SocialNotLinkedAppError,
} from '../../errors/social.errors';
import type { SocialLoginRequestDTO } from '../../dtos/requests/auth/social-login.dto';
import type { SocialCallbackRequestDTO } from '../../dtos/requests/auth/social-callback.dto';
import type { LinkSocialRequestDTO } from '../../dtos/requests/auth/link-social.dto';
import type { UnlinkSocialRequestDTO } from '../../dtos/requests/auth/unlink-social.dto';
import type { SocialLoginResponseDTO } from '../../dtos/responses/social-login-response.dto';
import type { UserResponseDTO } from '../../dtos/responses/user-response.dto';
import { USER_REPO } from '../../tokens';
import { ID_GENERATOR } from '../tokens';
import { AUTH_TOKEN_SERVICE, AUTH_SESSION_SERVICE } from '../../tokens';
import { AUTH_SOCIAL_REPO } from '../../tokens';

@Injectable()
export class AuthSocialService
  extends BaseService<AuthSocialEntity, string>
  implements AuthSocialServiceInterface {
  readonly name = 'AuthSocialService';

  constructor(
    @Inject(AUTH_SOCIAL_REPO) private readonly repo: AuthSocialRepository,
    @Inject(USER_REPO) private readonly userRepo: UserRepository,
    @Inject(AUTH_TOKEN_SERVICE) private readonly tokenService: AuthTokenServiceInterface,
    @Inject(AUTH_SESSION_SERVICE) private readonly sessionService: AuthSessionServiceInterface,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) {
    super();
  }

  async initiateLogin(
    input: SocialLoginRequestDTO,
  ): Promise<{ authUrl: string; state: string }> {
    const state = this.idGen.generateUuid();
    const authUrl = `https://oauth.${input.provider}.com/authorize?state=${state}`;
    return { authUrl, state };
  }

  async handleCallback(
    input: SocialCallbackRequestDTO,
  ): Promise<SocialLoginResponseDTO> {
    const provider = SocialProviderVO.of(input.provider);
    const existing = await this.repo.findByProvider(provider, input.code);
    if (!existing) {
      throw new SocialNotLinkedAppError('new', input.provider);
    }
    const user = await this.userRepo.findById(existing.userId);
    if (!user) throw new SocialNotLinkedAppError('missing', input.provider);

    const session = await this.sessionService.create({
      userId: user.id,
      ipAddress: 'unknown',
      userAgent: 'unknown',
      deviceId: input.deviceId,
    });
    const tokens = await this.tokenService.generatePair(user.id);

    return {
      success: true,
      isNewUser: false,
      user: this.userToResponse(user),
      session: this.sessionService.toResponse(session),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tokenType: 'Bearer',
      expiresAt: tokens.expiresAt,
    };
  }

  async link(userId: UserId, input: LinkSocialRequestDTO): Promise<void> {
    const provider = SocialProviderVO.of(input.provider);
    const already = await this.repo.existsByProvider(userId, provider);
    if (already) throw new SocialAlreadyLinkedAppError(userId, input.provider);

    const now = Date.now();
    // `SocialAccountLinkInputSchema` shape: { userId, provider, code, redirectUri }.
    // `code` is used as the provider user id in this adapter.
    const entity = AuthSocialEntity.create({
      id: this.idGen.generate(),
      userId,
      provider,
      providerUserId: input.code,
      status: SocialStatusVO.of('active'),
      linkedAt: now,
      createdAt: new Date(now).toISOString(),
      updatedAt: new Date(now).toISOString(),
    });
    await this.repo.save(entity);
  }

  async unlink(userId: UserId, input: UnlinkSocialRequestDTO): Promise<void> {
    const provider = SocialProviderVO.of(input.provider);
    const found = await this.repo.findByUser(userId);
    const target = found.find((e) => e.provider.equals(provider));
    if (!target) throw new SocialNotLinkedAppError(userId, input.provider);
    target.unlink(Date.now());
    await this.repo.save(target);
  }

  async listForUser(userId: UserId): Promise<readonly AuthSocialEntity[]> {
    return this.repo.findByUser(userId);
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
