/**
 * DeviceToken Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { DeviceTokenEntity } from '@domain/entities/device-token.entity.js';
import type { DeviceIdVO } from '@domain/primitives/device-id.vo.js';

export const DEVICE_TOKEN_REPOSITORY = Symbol('DEVICE_TOKEN_REPOSITORY');

export interface DeviceTokenRepository extends BaseRepository<DeviceTokenEntity, string> {
  findByDevice(deviceId: DeviceIdVO | string): Promise<readonly DeviceTokenEntity[]>;
  findActiveByDevice(deviceId: string): Promise<readonly DeviceTokenEntity[]>;
  findByToken(token: string): Promise<DeviceTokenEntity | null>;
  findActiveTokensForUser(userId: string): Promise<readonly DeviceTokenEntity[]>;
  countActiveByDevice(deviceId: string): Promise<number>;
  revokeAllForDevice(deviceId: string, revokedAt: string): Promise<number>;
  deleteByDevice(deviceId: string): Promise<number>;
}
