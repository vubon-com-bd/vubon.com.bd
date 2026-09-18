import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthSocialEntity } from '../entities/auth-social.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { SocialProviderVO } from '../value-objects/primitives/social-provider.vo';

export interface AuthSocialRepository
  extends BaseRepository<AuthSocialEntity, string> {
  findByUser(userId: UserIdVO): Promise<readonly AuthSocialEntity[]>;
  findByProvider(
    userId: UserIdVO,
    provider: SocialProviderVO,
  ): Promise<AuthSocialEntity | null>;
}
