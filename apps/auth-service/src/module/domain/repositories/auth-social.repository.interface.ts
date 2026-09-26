/**
 * AuthSocialRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { AuthSocialEntity } from '../entities/auth-social.entity';
import { SocialProviderVO } from '../value-objects/primitives/social-provider.vo';

export interface AuthSocialRepository extends BaseRepository<AuthSocialEntity, string> {
  findByUser(userId: UserId): Promise<readonly AuthSocialEntity[]>;
  findByProvider(
    provider: SocialProviderVO,
    providerUserId: string,
  ): Promise<AuthSocialEntity | null>;
  existsByProvider(
    userId: UserId,
    provider: SocialProviderVO,
  ): Promise<boolean>;
}
