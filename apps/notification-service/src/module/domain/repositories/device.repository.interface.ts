/**
 * Device Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { DeviceEntity } from '@domain/entities/device.entity.js';
import type { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import type { UserIdVO } from '@domain/primitives/user-id.vo.js';

// ─── DI Token ─────────────────────────────
export const DEVICE_REPOSITORY = Symbol('DEVICE_REPOSITORY');

// ─── Filter ───────────────────────────────
export interface DeviceListFilter {
  readonly userId?: string;
  readonly type?: string;
  readonly status?: string;
  readonly platform?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

// ─── List Options ─────────────────────────
export interface DeviceListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'lastActiveAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DeviceListFilter;
}

// ─── Pagination Result ────────────────────
export interface DevicePaginationResult {
  readonly items: readonly DeviceEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Stats ────────────────────────────────
export interface DeviceStats {
  readonly total: number;
  readonly activeCount: number;
  readonly blockedCount: number;
  readonly staleCount: number;
  readonly byType: Readonly<Record<string, number>>;
  readonly byPlatform: Readonly<Record<string, number>>;
}

// ─── Main Interface ───────────────────────
export interface DeviceRepository extends BaseRepository<DeviceEntity, string> {
  findByIdVO(id: DeviceIdVO): Promise<DeviceEntity | null>;
  findByUser(userId: UserIdVO | string): Promise<readonly DeviceEntity[]>;
  findByToken(token: string): Promise<DeviceEntity | null>;
  findByStatus(status: string): Promise<readonly DeviceEntity[]>;
  findByPlatform(platform: string): Promise<readonly DeviceEntity[]>;

  findPaginated(options: DeviceListOptions): Promise<DevicePaginationResult>;

  /** Cron-friendly queries */
  findStale(cutoff: string): Promise<readonly DeviceEntity[]>;
  findBlocked(): Promise<readonly DeviceEntity[]>;
  findActiveForUser(userId: string): Promise<readonly DeviceEntity[]>;

  countForUser(userId: string): Promise<number>;
  countActiveForUser(userId: string): Promise<number>;
  getStats(): Promise<DeviceStats>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
  purgeUnregisteredOlderThan(cutoff: string): Promise<number>;
}
