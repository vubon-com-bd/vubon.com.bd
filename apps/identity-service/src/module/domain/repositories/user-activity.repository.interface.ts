/**
 * User Activity Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserActivityEntity } from '../entities/user-activity.entity.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const USER_ACTIVITY_REPOSITORY = Symbol('USER_ACTIVITY_REPOSITORY');

export interface UserActivityListFilter {
  readonly userId?: string;
  readonly type?: string;
  readonly securityOnly?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface UserActivityListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'occurredAt' | 'createdAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: UserActivityListFilter;
}

export interface UserActivityPaginationResult {
  readonly items: readonly UserActivityEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface UserActivityRepository extends BaseRepository<UserActivityEntity, string> {
  findByUserId(userId: UserIdVO, limit?: number): Promise<readonly UserActivityEntity[]>;
  findByType(type: string, limit?: number): Promise<readonly UserActivityEntity[]>;
  findSecurityEvents(userId: UserIdVO, limit?: number): Promise<readonly UserActivityEntity[]>;
  findRecent(userId: UserIdVO, sinceMs: number): Promise<readonly UserActivityEntity[]>;

  findPaginated(options: UserActivityListOptions): Promise<UserActivityPaginationResult>;

  // Cron support
  purge(cutoffIso: string): Promise<number>;
  softDelete(id: string): Promise<void>;
}
