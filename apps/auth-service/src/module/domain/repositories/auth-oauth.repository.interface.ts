/**
 * AuthOAuthRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { AuthOAuthEntity } from '../entities/auth-oauth.entity';
import { OAuthProviderVO } from '../value-objects/primitives/oauth-provider.vo';

export interface AuthOAuthRepository extends BaseRepository<AuthOAuthEntity, string> {
  findByUser(userId: UserId): Promise<readonly AuthOAuthEntity[]>;
  findByProvider(
    provider: OAuthProviderVO,
    providerUserId: string,
  ): Promise<AuthOAuthEntity | null>;
}
