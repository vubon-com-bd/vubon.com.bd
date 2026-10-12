/**
 * Device Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { DeviceEntity } from '../entities/device.entity.js';
import type { DeviceIdVO } from '../value-objects/primitives/device-id.vo.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const DEVICE_REPOSITORY = Symbol('DEVICE_REPOSITORY');

export interface DeviceListFilter {
  readonly userId?: string;
  readonly type?: string;
  readonly trusted?: boolean;
  readonly fingerprint?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface DeviceListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'lastActiveAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DeviceListFilter;
}

export interface DevicePaginationResult {
  readonly items: readonly DeviceEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface DeviceStats {
  readonly total: number;
  readonly trustedCount: number;
  readonly byType: Readonly<Record<string, number>>;
}

export interface DeviceRepository extends BaseRepository<DeviceEntity, string> {
  findByIdVO(id: DeviceIdVO): Promise<DeviceEntity | null>;
  findByUserId(userId: UserIdVO): Promise<readonly DeviceEntity[]>;
  findByFingerprint(userId: UserIdVO, fingerprint: string): Promise<DeviceEntity | null>;
  countByUserId(userId: UserIdVO): Promise<number>;

  findPaginated(options: DeviceListOptions): Promise<DevicePaginationResult>;
  getStats(userId?: string): Promise<DeviceStats>;

  // Cron support
  findStale(inactiveDays: number, nowMs?: number): Promise<readonly DeviceEntity[]>;
  findOldestByUserId(userId: UserIdVO): Promise<DeviceEntity | null>;
  findExpiredTrust(nowMs?: number): Promise<readonly DeviceEntity[]>;
  removeExpiredTrust(nowMs?: number): Promise<number>;

  softDelete(id: string): Promise<void>;
}
