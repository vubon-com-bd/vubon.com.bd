/**
 * AuthSsoRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { AuthSsoEntity } from '../entities/auth-sso.entity';
import { SsoProviderVO } from '../value-objects/primitives/sso-provider.vo';

export interface AuthSsoRepository extends BaseRepository<AuthSsoEntity, string> {
  findByUser(userId: UserId): Promise<readonly AuthSsoEntity[]>;
  findByProviderAndTenant(
    provider: SsoProviderVO,
    tenantId: string,
    providerUserId: string,
  ): Promise<AuthSsoEntity | null>;
}
