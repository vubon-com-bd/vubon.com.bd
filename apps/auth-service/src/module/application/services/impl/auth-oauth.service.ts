/**
 * AuthOAuthService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthOAuthServiceInterface } from '../interfaces/auth-oauth.service.interface';
import type { AuthOAuthRepository } from '../../../domain/repositories/auth-oauth.repository.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import { AuthOAuthEntity } from '../../../domain/entities/auth-oauth.entity';
import { OAuthFailedAppError } from '../../errors/oauth.errors';
import { ID_GENERATOR } from '../tokens';
import { AUTH_OAUTH_REPO } from '../../tokens';

@Injectable()
export class AuthOAuthService
  extends BaseService<AuthOAuthEntity, string>
  implements AuthOAuthServiceInterface {
  readonly name = 'AuthOAuthService';

  constructor(
    @Inject(AUTH_OAUTH_REPO) private readonly repo: AuthOAuthRepository,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) {
    super();
  }

  async authorize(input: {
    provider: string;
    redirectUri: string;
    scopes?: readonly string[];
  }): Promise<{ authUrl: string; state: string }> {
    const state = this.idGen.generateUuid();
    const scope = (input.scopes ?? []).join(' ');
    const authUrl =
      `https://oauth.${input.provider}.com/authorize?redirect_uri=${encodeURIComponent(
        input.redirectUri,
      )}&state=${state}&scope=${encodeURIComponent(scope)}`;
    return { authUrl, state };
  }

  async exchangeCode(input: {
    provider: string;
    code: string;
    state: string;
    redirectUri: string;
  }): Promise<{
    userId: UserId;
    scopes: readonly string[];
    expiresAt?: number;
  }> {
    if (!input.code) {
      throw new OAuthFailedAppError(input.provider, 'missing code');
    }
    // Real provider call handled in Infrastructure adapter.
    throw new OAuthFailedAppError(
      input.provider,
      'exchange handled in infrastructure',
    );
  }

  async refresh(_userId: UserId, _provider: string): Promise<void> {
    // Real impl calls provider refresh endpoint via Infrastructure.
    // No-op at application layer.
  }

  async revoke(userId: UserId, provider: string): Promise<void> {
    const list = await this.repo.findByUser(userId);
    const target = list.find((e) => e.provider.value === provider);
    if (target) {
      target.revoke();
      await this.repo.save(target);
    }
  }

  async listForUser(userId: UserId): Promise<readonly AuthOAuthEntity[]> {
    return this.repo.findByUser(userId);
  }
}
