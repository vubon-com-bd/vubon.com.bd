import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthOAuthServiceInterface } from '../interfaces/auth-oauth.service.interface';
import type { AuthOAuthRepository } from '../../../domain/repositories/auth-oauth.repository.interface';
import { AuthOAuthEntity } from '../../../domain/entities/auth-oauth.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { OAuthProviderVO } from '../../../domain/value-objects/primitives/oauth-provider.vo';

@Injectable()
export class AuthOAuthService
  extends BaseService<AuthOAuthEntity, string>
  implements AuthOAuthServiceInterface
{
  readonly name = 'AuthOAuthService';

  constructor(
    @Inject('AuthOAuthRepository') private readonly oauthRepo: AuthOAuthRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async authorize(
    provider: string,
    scope: string,
  ): Promise<{ url: string; state: string }> {
    const state = `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
    void scope;
    return {
      url: `https://oauth.example.com/${provider}/authorize?state=${state}`,
      state,
    };
  }

  async callback(provider: string, code: string, state: string): Promise<void> {
    void provider;
    void code;
    void state;
    throw new Error('OAuth callback orchestration not yet wired');
  }

  async revoke(userId: string, provider: string): Promise<void> {
    const userIdVO = UserIdVO.create(userId);
    const providerVO = OAuthProviderVO.create(provider);
    const existing = await this.oauthRepo.findByProvider(userIdVO, providerVO);
    if (!existing) return;
    const revoked = existing.revoke();
    await this.oauthRepo.save(revoked);
  }
}
