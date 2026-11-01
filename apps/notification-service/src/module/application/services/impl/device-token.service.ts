/**
 * DeviceTokenService
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  DEVICE_TOKEN_REPOSITORY,
  type DeviceTokenRepository,
} from '@domain/repositories/device-token.repository.interface.js';
import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import type { DeviceTokenEntity } from '@domain/entities/device-token.entity.js';

import type {
  IDeviceTokenService,
  DeviceTokenResponseDTO,
} from '@application/services/interfaces/device-token.service.interface.js';

@Injectable()
export class DeviceTokenService implements IDeviceTokenService {
  private readonly logger = new Logger(DeviceTokenService.name);

  constructor(
    @Inject(DEVICE_TOKEN_REPOSITORY)
    private readonly repo: DeviceTokenRepository,
  ) {}

  async listByDevice(deviceId: string): Promise<readonly DeviceTokenResponseDTO[]> {
    const vo = DeviceIdVO.create(deviceId);
    const items = await this.repo.findByDevice(vo);
    return items.map((e) => this.toDTO(e));
  }

  async listActiveByDevice(deviceId: string): Promise<readonly DeviceTokenResponseDTO[]> {
    const items = await this.repo.findActiveByDevice(deviceId);
    return items.map((e) => this.toDTO(e));
  }

  async listActiveTokensForUser(userId: string): Promise<readonly DeviceTokenResponseDTO[]> {
    const items = await this.repo.findActiveTokensForUser(userId);
    return items.map((e) => this.toDTO(e));
  }

  async countActiveByDevice(deviceId: string): Promise<number> {
    return this.repo.countActiveByDevice(deviceId);
  }

  async revokeAllForDevice(deviceId: string, actorId?: string): Promise<number> {
    const now = new Date().toISOString();
    const count = await this.repo.revokeAllForDevice(deviceId, now);
    this.logger.log(`Revoked ${count} tokens for device=${deviceId} by ${actorId ?? 'system'}`);
    return count;
  }

  private toDTO(e: DeviceTokenEntity): DeviceTokenResponseDTO {
    return {
      id: e.id,
      deviceId: e.deviceId.value,
      tokenMasked: e.token.masked,
      platform: e.platform.value,
      active: e.active,
      revokedAt: e.revokedAt,
      createdAt: e.createdAt,
    };
  }
}
