import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthOAuthEntity } from '../entities/auth-oauth.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { OAuthProviderVO } from '../value-objects/primitives/oauth-provider.vo';

export interface AuthOAuthRepository
  extends BaseRepository<AuthOAuthEntity, string> {
  findByUser(userId: UserIdVO): Promise<readonly AuthOAuthEntity[]>;
  findByProvider(
    userId: UserIdVO,
    provider: OAuthProviderVO,
  ): Promise<AuthOAuthEntity | null>;
}
