/**
 * User Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserEntity } from '../entities/user.entity.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import type { UserEmailVO } from '../value-objects/primitives/user-email.vo.js';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly role?: string;
  readonly emailVerified?: boolean;
  readonly phoneVerified?: boolean;
  readonly search?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface UserListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'lastLoginAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: UserListFilter;
}

export interface UserPaginationResult {
  readonly items: readonly UserEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface UserStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly byRole: Readonly<Record<string, number>>;
  readonly activeCount: number;
  readonly suspendedCount: number;
  readonly verifiedCount: number;
}

export interface UserRepository extends BaseRepository<UserEntity, string> {
  findByIdVO(id: UserIdVO): Promise<UserEntity | null>;
  findByEmail(email: UserEmailVO): Promise<UserEntity | null>;
  findByEmailRaw(email: string): Promise<UserEntity | null>;
  findByPhone(phone: string): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;

  findPaginated(options: UserListOptions): Promise<UserPaginationResult>;
  getStats(fromDate?: string, toDate?: string): Promise<UserStats>;

  findActive(): Promise<readonly UserEntity[]>;
  findByRole(role: string): Promise<readonly UserEntity[]>;

  // Cron support
  findInactive(olderThanDays: number): Promise<readonly UserEntity[]>;
  findUnverified(olderThanHours: number): Promise<readonly UserEntity[]>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
