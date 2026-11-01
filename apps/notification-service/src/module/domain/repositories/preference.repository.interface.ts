/**
 * Preference Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { PreferenceEntity } from '@domain/entities/preference.entity.js';
import type { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import type { UserIdVO } from '@domain/primitives/user-id.vo.js';

// ─── DI Token ─────────────────────────────
export const PREFERENCE_REPOSITORY = Symbol('PREFERENCE_REPOSITORY');

// ─── Filter ───────────────────────────────
export interface PreferenceListFilter {
  readonly timezone?: string;
  readonly locale?: string;
  readonly locked?: boolean;
}

// ─── List Options ─────────────────────────
export interface PreferenceListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: PreferenceListFilter;
}

// ─── Pagination Result ────────────────────
export interface PreferencePaginationResult {
  readonly items: readonly PreferenceEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Stats ────────────────────────────────
export interface PreferenceStats {
  readonly total: number;
  readonly lockedCount: number;
  readonly quietHoursEnabledCount: number;
  readonly byTimezone: Readonly<Record<string, number>>;
}

// ─── Main Interface ───────────────────────
export interface PreferenceRepository extends BaseRepository<PreferenceEntity, string> {
  findByIdVO(id: PreferenceIdVO): Promise<PreferenceEntity | null>;
  findByUser(userId: UserIdVO | string): Promise<PreferenceEntity | null>;
  findLocked(): Promise<readonly PreferenceEntity[]>;
  findByTimezone(timezone: string): Promise<readonly PreferenceEntity[]>;

  findPaginated(options: PreferenceListOptions): Promise<PreferencePaginationResult>;

  /** Cron-friendly queries */
  findByQuietHoursActive(hour: number): Promise<readonly PreferenceEntity[]>;

  countLocked(): Promise<number>;
  getStats(): Promise<PreferenceStats>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
