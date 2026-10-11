/**
 * Device Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DeviceEntity } from '../entities/device.entity.js';
import { DeviceIdVO } from '../value-objects/primitives/device-id.vo.js';
import { DeviceStatusVO } from '../value-objects/primitives/device-status.vo.js';
import { DeviceTokenVO } from '../value-objects/primitives/device-token.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const DEVICE_REPOSITORY = Symbol('DEVICE_REPOSITORY');

export interface DeviceListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'lastActiveAt';
  readonly sortDir?: 'asc' | 'desc';
}

export interface DevicePaginationResult {
  readonly items: readonly DeviceEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface DeviceRepository extends BaseRepository<DeviceEntity, string> {
  findByIdVO(id: DeviceIdVO): Promise<DeviceEntity | null>;
  findByUserId(userId: UserIdVO): Promise<readonly DeviceEntity[]>;
  findActiveByUserId(userId: UserIdVO): Promise<readonly DeviceEntity[]>;
  findByStatus(status: DeviceStatusVO): Promise<readonly DeviceEntity[]>;
  findByToken(token: DeviceTokenVO): Promise<DeviceEntity | null>;
  findPaginated(options: DeviceListOptions): Promise<DevicePaginationResult>;
  countByUserId(userId: UserIdVO): Promise<number>;
  existsByToken(token: DeviceTokenVO): Promise<boolean>;
  /** Stale devices for cleanup. */
  findStale(olderThanDays: number): Promise<readonly DeviceEntity[]>;
}
