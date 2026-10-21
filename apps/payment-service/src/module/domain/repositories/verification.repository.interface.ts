/**
 * Verification Repository Interface
 * @module payment-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VerificationEntity } from '@domain/entities/verification.entity';
import type { VerificationIdVO } from '@domain/primitives/verification-id.vo';

export const VERIFICATION_REPOSITORY = Symbol('VERIFICATION_REPOSITORY');

export interface VerificationListFilter {
  readonly paymentId?: string;
  readonly status?: string;
  readonly method?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface VerificationListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'expiresAt' | 'attempts';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VerificationListFilter;
}

export interface VerificationPaginationResult {
  readonly items: readonly VerificationEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VerificationRepository
  extends BaseRepository<VerificationEntity, string> {
  findByIdVO(id: VerificationIdVO): Promise<VerificationEntity | null>;
  findByPayment(paymentId: string): Promise<readonly VerificationEntity[]>;
  findPending(): Promise<readonly VerificationEntity[]>;
  findExpired(): Promise<readonly VerificationEntity[]>;
  findPaginated(
    options: VerificationListOptions,
  ): Promise<VerificationPaginationResult>;

  // Cron-support
  findStale(olderThanMinutes: number): Promise<readonly VerificationEntity[]>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
