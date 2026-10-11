/**
 * BroadcastService — mass-send orchestration
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { NOTIFICATION_BROADCAST } from '@vubon/shared-constants/platform/notification';

import {
  BROADCAST_REPOSITORY,
  type BroadcastRepository,
} from '../../../domain/repositories/broadcast.repository.interface.js';
import { BroadcastEntity } from '../../../domain/entities/broadcast.entity.js';

import { BroadcastIdVO } from '../../../domain/value-objects/primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '../../../domain/value-objects/primitives/broadcast-type.vo.js';
import { BroadcastTargetVO } from '../../../domain/value-objects/primitives/broadcast-target.vo.js';

import { BroadcastMapper } from '../../mappers/broadcast.mapper.js';
import {
  BroadcastNotFoundApplicationError,
  BroadcastRecipientLimitExceededError,
  BroadcastAlreadyRunningError,
} from '../../errors/schedule.errors.js';

import type { IBroadcastService } from '../interfaces/broadcast.service.interface.js';
import type {
  CreateBroadcastRequestDTO,
  UpdateBroadcastRequestDTO,
  GetBroadcastRequestDTO,
  ListBroadcastsRequestDTO,
  ScheduleBroadcastRequestDTO,
  StartBroadcastRequestDTO,
  CancelBroadcastRequestDTO,
  BroadcastStatsRequestDTO,
  TestBroadcastRequestDTO,
} from '../../dtos/requests/broadcast/index.js';
import type {
  BroadcastResponseDTO,
  BroadcastListResponseDTO,
  BroadcastStatsResponseDTO,
  BroadcastProgressResponseDTO,
} from '../../dtos/responses/broadcast-response.dto.js';

@Injectable()
export class BroadcastService implements IBroadcastService {
  private readonly logger = new Logger(BroadcastService.name);

  constructor(
    @Inject(BROADCAST_REPOSITORY)
    private readonly broadcastRepo: BroadcastRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async create(dto: CreateBroadcastRequestDTO, actorId?: string): Promise<BroadcastResponseDTO> {
    if (dto.channels.length === 0) {
      throw new BroadcastRecipientLimitExceededError(0, 10);
    }
    const now = new Date().toISOString();
    const entity = BroadcastEntity.create({
      id: randomUUID(),
      now,
      props: {
        type: BroadcastTypeVO.create(dto.type),
        target: BroadcastTargetVO.create(dto.target),
        templateId: dto.templateId,
        estimatedRecipients: dto.estimatedRecipients,
        createdBy: actorId ?? 'system',
      },
    });
    const saved = await this.broadcastRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Broadcast created: ${saved.id} type=${dto.type}`);
    return BroadcastMapper.toResponse(saved);
  }

  async update(dto: UpdateBroadcastRequestDTO, actorId?: string): Promise<BroadcastResponseDTO> {
    const entity = await this.load(dto.broadcastId);
    this.logger.debug(`Broadcast update requested: ${dto.broadcastId}`);
    void actorId;
    void dto;
    return BroadcastMapper.toResponse(entity);
  }

  async schedule(dto: ScheduleBroadcastRequestDTO, actorId?: string): Promise<BroadcastResponseDTO> {
    const entity = await this.load(dto.broadcastId);
    entity.schedule(dto.scheduledAt);
    const saved = await this.broadcastRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    void actorId;
    return BroadcastMapper.toResponse(saved);
  }

  async start(dto: StartBroadcastRequestDTO, actorId?: string): Promise<BroadcastResponseDTO> {
    if (dto.totalRecipients > NOTIFICATION_BROADCAST.MAX_RECIPIENTS) {
      throw new BroadcastRecipientLimitExceededError(
        dto.totalRecipients,
        NOTIFICATION_BROADCAST.MAX_RECIPIENTS,
      );
    }
    const entity = await this.load(dto.broadcastId);
    if (entity.isSending()) throw new BroadcastAlreadyRunningError(dto.broadcastId);
    entity.start(dto.totalRecipients, dto.approvedBy ?? actorId);
    const saved = await this.broadcastRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Broadcast ${saved.id} started — ${dto.totalRecipients} recipients`);
    return BroadcastMapper.toResponse(saved);
  }

  async cancel(dto: CancelBroadcastRequestDTO, actorId?: string): Promise<BroadcastResponseDTO> {
    const entity = await this.load(dto.broadcastId);
    entity.cancel(actorId, dto.reason);
    const saved = await this.broadcastRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return BroadcastMapper.toResponse(saved);
  }

  async test(dto: TestBroadcastRequestDTO, actorId?: string): Promise<BroadcastResponseDTO> {
    const entity = await this.load(dto.broadcastId);
    this.logger.debug(`Test broadcast requested for ${dto.broadcastId} → ${dto.recipientIds.length} recipients`);
    void actorId;
    void dto;
    return BroadcastMapper.toResponse(entity);
  }

  async getById(dto: GetBroadcastRequestDTO): Promise<BroadcastResponseDTO> {
    return BroadcastMapper.toResponse(await this.load(dto.broadcastId));
  }

  async getStats(dto: BroadcastStatsRequestDTO): Promise<BroadcastStatsResponseDTO> {
    const entity = await this.load(dto.broadcastId);
    return BroadcastMapper.toStats(entity);
  }

  async getProgress(broadcastId: string): Promise<BroadcastProgressResponseDTO> {
    const entity = await this.load(broadcastId);
    return BroadcastMapper.toProgress(entity);
  }

  async list(dto: ListBroadcastsRequestDTO): Promise<BroadcastListResponseDTO> {
    const result = await this.broadcastRepo.findPaginated({
      page: dto.page,
      limit: dto.limit,
      sortBy: dto.sortBy,
      sortDir: dto.sortDir,
      filter: dto.filter,
    });
    return BroadcastMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  private async load(id: string): Promise<BroadcastEntity> {
    const vo = BroadcastIdVO.create(id);
    const entity = await this.broadcastRepo.findByIdVO(vo);
    if (!entity) throw new BroadcastNotFoundApplicationError(id);
    return entity;
  }
}
