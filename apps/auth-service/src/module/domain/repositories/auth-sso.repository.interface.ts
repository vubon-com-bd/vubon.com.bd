import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AuthSsoEntity } from '../entities/auth-sso.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { SsoProviderVO } from '../value-objects/primitives/sso-provider.vo';

export interface AuthSsoRepository
  extends BaseRepository<AuthSsoEntity, string> {
  findByUser(userId: UserIdVO): Promise<readonly AuthSsoEntity[]>;
  findByProvider(
    userId: UserIdVO,
    provider: SsoProviderVO,
  ): Promise<AuthSsoEntity | null>;
  findByExternalId(externalId: string): Promise<AuthSsoEntity | null>;
}
