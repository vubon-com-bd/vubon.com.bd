/**
 * User KYC Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserKycEntity } from '../entities/user-kyc.entity.js';
import type { KycIdVO } from '../value-objects/primitives/kyc-id.vo.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const USER_KYC_REPOSITORY = Symbol('USER_KYC_REPOSITORY');

export interface UserKycListFilter {
  readonly userId?: string;
  readonly status?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface UserKycListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'submittedAt' | 'verifiedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: UserKycListFilter;
}

export interface UserKycPaginationResult {
  readonly items: readonly UserKycEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface UserKycStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly pendingCount: number;
  readonly verifiedCount: number;
  readonly rejectedCount: number;
}

export interface UserKycRepository extends BaseRepository<UserKycEntity, string> {
  findByIdVO(id: KycIdVO): Promise<UserKycEntity | null>;
  findByUserId(userId: UserIdVO): Promise<UserKycEntity | null>;
  findByUserIdRaw(userId: string): Promise<UserKycEntity | null>;

  findPaginated(options: UserKycListOptions): Promise<UserKycPaginationResult>;
  getStats(fromDate?: string, toDate?: string): Promise<UserKycStats>;

  // Cron support
  findPending(olderThanHours: number): Promise<readonly UserKycEntity[]>;
  findExpiring(withinDays: number): Promise<readonly UserKycEntity[]>;

  softDelete(id: string): Promise<void>;
}
