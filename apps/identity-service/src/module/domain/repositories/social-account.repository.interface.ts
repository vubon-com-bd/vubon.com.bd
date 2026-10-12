/**
 * Social Account Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { SocialAccountEntity } from '../entities/social-account.entity.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const SOCIAL_ACCOUNT_REPOSITORY = Symbol('SOCIAL_ACCOUNT_REPOSITORY');

export interface SocialAccountListFilter {
  readonly userId?: string;
  readonly authId?: string;
  readonly provider?: string;
  readonly isActive?: boolean;
  readonly email?: string;
}

export interface SocialAccountListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'lastUsedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: SocialAccountListFilter;
}

export interface SocialAccountPaginationResult {
  readonly items: readonly SocialAccountEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface SocialAccountStats {
  readonly total: number;
  readonly activeCount: number;
  readonly byProvider: Readonly<Record<string, number>>;
}

export interface SocialAccountRepository extends BaseRepository<SocialAccountEntity, string> {
  findByUserId(userId: UserIdVO): Promise<readonly SocialAccountEntity[]>;
  findByProviderAndProviderUserId(
    provider: string,
    providerUserId: string,
  ): Promise<SocialAccountEntity | null>;
  findByUserIdAndProvider(
    userId: UserIdVO,
    provider: string,
  ): Promise<SocialAccountEntity | null>;

  findPaginated(options: SocialAccountListOptions): Promise<SocialAccountPaginationResult>;
  getStats(): Promise<SocialAccountStats>;

  // Cron support
  findInactive(olderThanDays: number): Promise<readonly SocialAccountEntity[]>;

  softDelete(id: string): Promise<void>;
}
