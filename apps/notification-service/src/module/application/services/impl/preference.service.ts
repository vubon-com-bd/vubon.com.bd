/**
 * PreferenceService — user notification preferences
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import {
  PREFERENCE_REPOSITORY,
  type PreferenceRepository,
} from '../../../domain/repositories/preference.repository.interface.js';
import { PreferenceEntity } from '../../../domain/entities/preference.entity.js';

import { PreferenceIdVO } from '../../../domain/value-objects/primitives/preference-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';

import { PreferenceMapper } from '../../mappers/preference.mapper.js';
import { PreferenceNotFoundApplicationError } from '../../errors/preference.errors.js';

import type { IPreferenceService } from '../interfaces/preference.service.interface.js';
import type {
  GetPreferenceRequestDTO,
  UpdatePreferenceRequestDTO,
  ToggleChannelRequestDTO,
  ToggleCategoryRequestDTO,
  UpdateQuietHoursRequestDTO,
  OptOutRequestDTO,
  OptInRequestDTO,
} from '../../dtos/requests/preference/index.js';
import type {
  PreferenceResponseDTO,
  PreferencePublicResponseDTO,
} from '../../dtos/responses/preference-response.dto.js';

@Injectable()
export class PreferenceService implements IPreferenceService {
  private readonly logger = new Logger(PreferenceService.name);

  constructor(
    @Inject(PREFERENCE_REPOSITORY)
    private readonly preferenceRepo: PreferenceRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async getOrCreate(userId: string): Promise<PreferenceResponseDTO> {
    const userIdVO = UserIdVO.create(userId);
    let entity = await this.preferenceRepo.findByUserId(userIdVO);
    if (!entity) {
      const now = new Date().toISOString();
      entity = PreferenceEntity.createDefault({
        id: randomUUID(),
        userId,
        now,
      });
      const saved = await this.preferenceRepo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      this.logger.log(`Default preference created for user=${userId}`);
      return PreferenceMapper.toResponse(saved);
    }
    return PreferenceMapper.toResponse(entity);
  }

  async get(dto: GetPreferenceRequestDTO): Promise<PreferenceResponseDTO> {
    const userIdVO = UserIdVO.create(dto.userId);
    const entity = await this.preferenceRepo.findByUserId(userIdVO);
    if (!entity) throw new PreferenceNotFoundApplicationError(dto.userId);
    return PreferenceMapper.toResponse(entity);
  }

  async getPublic(dto: GetPreferenceRequestDTO): Promise<PreferencePublicResponseDTO> {
    const userIdVO = UserIdVO.create(dto.userId);
    const entity = await this.preferenceRepo.findByUserId(userIdVO);
    if (!entity) throw new PreferenceNotFoundApplicationError(dto.userId);
    return PreferenceMapper.toPublic(entity);
  }

  async update(dto: UpdatePreferenceRequestDTO): Promise<PreferenceResponseDTO> {
    const entity = await this.loadOrCreate(dto.userId);
    if (dto.channelPreferences) {
      for (const [channel, enabled] of Object.entries(dto.channelPreferences)) {
        entity.toggleChannel(channel, enabled);
      }
    }
    if (dto.categoryPreferences) {
      for (const [category, enabled] of Object.entries(dto.categoryPreferences)) {
        entity.toggleCategory(category, enabled);
      }
    }
    if (dto.locale) {
      entity.updateLocale(dto.locale);
    }
    const saved = await this.preferenceRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return PreferenceMapper.toResponse(saved);
  }

  async toggleChannel(dto: ToggleChannelRequestDTO): Promise<PreferenceResponseDTO> {
    const entity = await this.loadOrCreate(dto.userId);
    entity.toggleChannel(dto.channel, dto.enabled);
    const saved = await this.preferenceRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return PreferenceMapper.toResponse(saved);
  }

  async toggleCategory(dto: ToggleCategoryRequestDTO): Promise<PreferenceResponseDTO> {
    const entity = await this.loadOrCreate(dto.userId);
    entity.toggleCategory(dto.category, dto.enabled);
    const saved = await this.preferenceRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return PreferenceMapper.toResponse(saved);
  }

  async updateQuietHours(dto: UpdateQuietHoursRequestDTO): Promise<PreferenceResponseDTO> {
    const entity = await this.loadOrCreate(dto.userId);
    entity.updateQuietHours(dto.enabled, dto.startHour, dto.endHour);
    const saved = await this.preferenceRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return PreferenceMapper.toResponse(saved);
  }

  async optOut(dto: OptOutRequestDTO): Promise<PreferenceResponseDTO> {
    const entity = await this.loadOrCreate(dto.userId);
    entity.optOut(dto.scope, dto.reason);
    const saved = await this.preferenceRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return PreferenceMapper.toResponse(saved);
  }

  async optIn(dto: OptInRequestDTO): Promise<PreferenceResponseDTO> {
    const entity = await this.loadOrCreate(dto.userId);
    entity.optIn(dto.scope);
    const saved = await this.preferenceRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return PreferenceMapper.toResponse(saved);
  }

  private async loadOrCreate(userId: string): Promise<PreferenceEntity> {
    const userIdVO = UserIdVO.create(userId);
    let entity = await this.preferenceRepo.findByUserId(userIdVO);
    if (!entity) {
      const now = new Date().toISOString();
      entity = PreferenceEntity.createDefault({ id: randomUUID(), userId, now });
      await this.preferenceRepo.save(entity);
    }
    return entity;
  }

  private async load(id: string): Promise<PreferenceEntity> {
    const vo = PreferenceIdVO.create(id);
    const entity = await this.preferenceRepo.findByIdVO(vo);
    if (!entity) throw new PreferenceNotFoundApplicationError(id);
    return entity;
  }
}
