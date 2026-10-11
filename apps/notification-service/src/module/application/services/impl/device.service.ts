/**
 * DeviceService — device registration + token lifecycle
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { NOTIFICATION_DEVICE } from '@vubon/shared-constants/platform/notification';

import {
  DEVICE_REPOSITORY,
  type DeviceRepository,
} from '../../../domain/repositories/device.repository.interface.js';
import { DeviceEntity } from '../../../domain/entities/device.entity.js';

import { DeviceIdVO } from '../../../domain/value-objects/primitives/device-id.vo.js';
import { DeviceTypeVO } from '../../../domain/value-objects/primitives/device-type.vo.js';
import { DeviceTokenVO } from '../../../domain/value-objects/primitives/device-token.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';

import { DeviceMapper } from '../../mappers/device.mapper.js';
import {
  DeviceNotFoundApplicationError,
  MaxDevicesReachedError,
} from '../../errors/preference.errors.js';

import type { IDeviceService } from '../interfaces/device.service.interface.js';
import type {
  RegisterDeviceRequestDTO,
  UpdateDeviceRequestDTO,
  GetDeviceRequestDTO,
  ListDevicesRequestDTO,
  RemoveDeviceRequestDTO,
  BlockDeviceRequestDTO,
  RefreshDeviceTokenRequestDTO,
} from '../../dtos/requests/device/index.js';
import type {
  DeviceResponseDTO,
  DeviceListResponseDTO,
} from '../../dtos/responses/device-response.dto.js';

@Injectable()
export class DeviceService implements IDeviceService {
  private readonly logger = new Logger(DeviceService.name);

  constructor(
    @Inject(DEVICE_REPOSITORY)
    private readonly deviceRepo: DeviceRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async register(dto: RegisterDeviceRequestDTO): Promise<DeviceResponseDTO> {
    const userIdVO = UserIdVO.create(dto.userId);
    const tokenVO = DeviceTokenVO.create(dto.token);

    const existing = await this.deviceRepo.findByToken(tokenVO);
    if (existing) {
      existing.refreshToken(tokenVO);
      existing.updateAppInfo(dto.appVersion, dto.osVersion);
      const saved = await this.deviceRepo.save(existing);
      await this.eventBridge.publishFromEntity(saved);
      this.logger.log(`Device token refreshed: ${saved.id}`);
      return DeviceMapper.toResponse(saved);
    }

    const count = await this.deviceRepo.countByUserId(userIdVO);
    if (count >= NOTIFICATION_DEVICE.MAX_DEVICES_PER_USER) {
      throw new MaxDevicesReachedError(dto.userId, NOTIFICATION_DEVICE.MAX_DEVICES_PER_USER);
    }

    const now = new Date().toISOString();
    const entity = DeviceEntity.register({
      id: randomUUID(),
      now,
      props: {
        userId: dto.userId,
        type: DeviceTypeVO.create(dto.type),
        token: tokenVO,
        platform: dto.platform,
        appVersion: dto.appVersion,
        osVersion: dto.osVersion,
        registeredAt: now,
      },
    });
    const saved = await this.deviceRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Device registered: ${saved.id} user=${dto.userId}`);
    return DeviceMapper.toResponse(saved);
  }

  async update(dto: UpdateDeviceRequestDTO): Promise<DeviceResponseDTO> {
    const entity = await this.load(dto.deviceId);
    if (dto.token) {
      entity.refreshToken(DeviceTokenVO.create(dto.token));
    }
    entity.updateAppInfo(dto.appVersion, dto.osVersion);
    const saved = await this.deviceRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DeviceMapper.toResponse(saved);
  }

  async refreshToken(dto: RefreshDeviceTokenRequestDTO): Promise<DeviceResponseDTO> {
    const entity = await this.load(dto.deviceId);
    entity.refreshToken(DeviceTokenVO.create(dto.newToken));
    const saved = await this.deviceRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DeviceMapper.toResponse(saved);
  }

  async remove(dto: RemoveDeviceRequestDTO): Promise<void> {
    const entity = await this.load(dto.deviceId);
    entity.unregister(dto.reason);
    const saved = await this.deviceRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Device unregistered: ${saved.id}`);
  }

  async block(dto: BlockDeviceRequestDTO): Promise<DeviceResponseDTO> {
    const entity = await this.load(dto.deviceId);
    entity.block(dto.reason);
    const saved = await this.deviceRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DeviceMapper.toResponse(saved);
  }

  async getById(dto: GetDeviceRequestDTO): Promise<DeviceResponseDTO> {
    return DeviceMapper.toResponse(await this.load(dto.deviceId));
  }

  async list(dto: ListDevicesRequestDTO): Promise<DeviceListResponseDTO> {
    if (dto.userId) {
      const devices = await this.deviceRepo.findByUserId(UserIdVO.create(dto.userId));
      const page = dto.page;
      const limit = dto.limit;
      const start = (page - 1) * limit;
      const items = devices.slice(start, start + limit);
      return DeviceMapper.toListResponse(items, devices.length, page, limit);
    }
    const result = await this.deviceRepo.findPaginated({
      page: dto.page,
      limit: dto.limit,
      sortBy: dto.sortBy,
      sortDir: dto.sortDir,
    });
    return DeviceMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  async listActiveByUser(userId: string): Promise<readonly DeviceResponseDTO[]> {
    const devices = await this.deviceRepo.findActiveByUserId(UserIdVO.create(userId));
    return devices.map((d) => DeviceMapper.toResponse(d));
  }

  private async load(id: string): Promise<DeviceEntity> {
    const vo = DeviceIdVO.create(id);
    const entity = await this.deviceRepo.findByIdVO(vo);
    if (!entity) throw new DeviceNotFoundApplicationError(id);
    return entity;
  }
}
