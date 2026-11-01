/**
 * DeviceService
 * @module notification-service/application/services/impl
 *
 * Real business logic:
 *  - CanRegisterDeviceSpecification
 *  - Max device limit enforcement
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  DEVICE_REPOSITORY,
  type DeviceRepository,
  type DeviceListOptions,
} from '@domain/repositories/device.repository.interface.js';
import { DeviceEntity } from '@domain/entities/device.entity.js';
import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { DeviceTypeVO } from '@domain/primitives/device-type.vo.js';
import { DeviceStatusVO } from '@domain/primitives/device-status.vo.js';
import { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';
import { DeviceVO } from '@domain/value-objects/composites/device.vo.js';
import { NOTIFICATION_DEVICE } from '@vubon/shared-constants/platform';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { DeviceMapper } from '@application/mappers/device.mapper.js';
import {
  DeviceNotFoundApplicationError,
  DeviceRegistrationError,
  DeviceLimitExceededApplicationError,
  DeviceTokenConflictError,
  DeviceUpdateError,
} from '@application/errors/device.errors.js';
import { NotImplementedError } from '@application/errors/not-implemented.error.js';

import type {
  IDeviceService,
  DeviceListOptionsDTO,
} from '@application/services/interfaces/device.service.interface.js';
import type {
  RegisterDeviceRequestDTO,
  UpdateDeviceTokenRequestDTO,
  UnregisterDeviceRequestDTO,
} from '@application/dtos/requests/device/index.js';
import type {
  DeviceResponseDTO,
  DeviceSummaryResponseDTO,
  DeviceListResponseDTO,
} from '@application/dtos/responses/device-response.dto.js';

@Injectable()
export class DeviceService implements IDeviceService {
  private readonly logger = new Logger(DeviceService.name);

  constructor(
    @Inject(DEVICE_REPOSITORY)
    private readonly repo: DeviceRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async register(
    dto: RegisterDeviceRequestDTO,
    actorId?: string,
  ): Promise<DeviceResponseDTO> {
    const now = new Date().toISOString();
    const userVO = UserIdVO.create(dto.userId);

    // Check limit
    const count = await this.repo.countForUser(userVO.value);
    if (count >= NOTIFICATION_DEVICE.MAX_DEVICES_PER_USER) {
      throw new DeviceLimitExceededApplicationError(
        userVO.value,
        NOTIFICATION_DEVICE.MAX_DEVICES_PER_USER,
      );
    }

    // Check token uniqueness
    const existing = await this.repo.findByToken(dto.token);
    if (existing) throw new DeviceTokenConflictError(dto.token);

    const id = randomUUID();
    let entity: DeviceEntity;
    try {
      entity = await this.buildAndCreate({ id, dto, now });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new DeviceRegistrationError(msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Device ${saved.id} registered for user=${dto.userId} by=${actorId ?? 'system'}`);
    return DeviceMapper.toResponse(saved);
  }

  private async buildAndCreate(args: {
    id: string;
    dto: RegisterDeviceRequestDTO;
    now: string;
  }): Promise<DeviceEntity> {
    const { id, dto, now } = args;

    const idVO = DeviceIdVO.create(id);
    const userIdVO = UserIdVO.create(dto.userId);
    const typeVO = DeviceTypeVO.create(dto.type);
    const statusVO = DeviceStatusVO.active();
    const tokenVO = DeviceTokenVO.create(dto.token);
    const platformVO = DevicePlatformVO.create(this.derivePlatform(dto.type));

    const vo = DeviceVO.create({
      id: idVO,
      userId: userIdVO,
      type: typeVO,
      status: statusVO,
      token: tokenVO,
      platform: platformVO,
      appVersion: dto.appVersion,
      osVersion: dto.osVersion,
      deviceName: dto.deviceName,
      lastActiveAt: now,
      registeredAt: now,
    });

    return DeviceEntity.create({ id: idVO, vo, now });
  }

  /** Derive platform from device type */
  private derivePlatform(type: string): string {
    const normalized = type.toLowerCase();
    if (['android', 'ios', 'web', 'windows', 'macos', 'linux'].includes(normalized)) {
      return normalized;
    }
    // Fallback: unknown type → web
    return 'web';
  }

  async updateToken(
    dto: UpdateDeviceTokenRequestDTO,
    actorId?: string,
  ): Promise<DeviceResponseDTO> {
    const entity = await this.load(dto.deviceId);
    const now = new Date().toISOString();

    try {
      const tokenVO = DeviceTokenVO.create(dto.newToken);
      entity.refreshToken(tokenVO, now);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new DeviceUpdateError(dto.deviceId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Device ${saved.id} token refreshed by ${actorId ?? 'system'}`);
    return DeviceMapper.toResponse(saved);
  }

  async unregister(
    dto: UnregisterDeviceRequestDTO,
    actorId?: string,
  ): Promise<void> {
    const entity = await this.load(dto.deviceId);
    const now = new Date().toISOString();
    entity.unregister(dto.reason, now);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Device ${saved.id} unregistered by ${actorId ?? 'system'}`);
  }

  async getById(id: string): Promise<DeviceResponseDTO> {
    const entity = await this.load(id);
    return DeviceMapper.toResponse(entity);
  }

  async listByUser(userId: string): Promise<readonly DeviceSummaryResponseDTO[]> {
    const items = await this.repo.findByUser(userId);
    return items.map((e) => DeviceMapper.toSummary(e));
  }

  async list(options: DeviceListOptionsDTO): Promise<DeviceListResponseDTO> {
    const result = await this.repo.findPaginated(options as DeviceListOptions);
    return DeviceMapper.toListResponse(result.items, result.total);
  }

  private async load(id: string): Promise<DeviceEntity> {
    const vo = DeviceIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new DeviceNotFoundApplicationError(id);
    return entity;
  }
}
