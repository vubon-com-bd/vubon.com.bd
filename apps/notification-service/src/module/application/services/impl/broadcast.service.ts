/**
 * BroadcastService
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  BROADCAST_REPOSITORY,
  type BroadcastRepository,
  type BroadcastListOptions,
} from '@domain/repositories/broadcast.repository.interface.js';
import { BroadcastEntity } from '@domain/entities/broadcast.entity.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '@domain/primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '@domain/primitives/broadcast-status.vo.js';
import { BroadcastAudienceVO } from '@domain/primitives/broadcast-audience.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { BroadcastVO } from '@domain/value-objects/composites/broadcast.vo.js';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { BroadcastMapper } from '@application/mappers/broadcast.mapper.js';
import {
  BroadcastNotFoundApplicationError,
  BroadcastCreationError,
  BroadcastStartError,
  BroadcastCancelError,
  BroadcastValidationError,
} from '@application/errors/broadcast.errors.js';

import type {
  IBroadcastService,
  BroadcastListOptionsDTO,
} from '@application/services/interfaces/broadcast.service.interface.js';
import type {
  CreateBroadcastRequestDTO,
  StartBroadcastRequestDTO,
  CancelBroadcastRequestDTO,
} from '@application/dtos/requests/broadcast/index.js';
import type {
  BroadcastResponseDTO,
  BroadcastListResponseDTO,
  BroadcastResultResponseDTO,
} from '@application/dtos/responses/broadcast-response.dto.js';

@Injectable()
export class BroadcastService implements IBroadcastService {
  private readonly logger = new Logger(BroadcastService.name);

  constructor(
    @Inject(BROADCAST_REPOSITORY)
    private readonly repo: BroadcastRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async create(
    dto: CreateBroadcastRequestDTO,
    actorId?: string,
  ): Promise<BroadcastResponseDTO> {
    const now = new Date().toISOString();

    if (!dto.templateId && !dto.content) {
      throw new BroadcastValidationError(
        'Either templateId or content required',
        'templateId',
      );
    }

    const id = randomUUID();
    let entity: BroadcastEntity;
    try {
      entity = await this.buildAndCreate({ id, dto, actorId, now });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new BroadcastCreationError(msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Broadcast ${saved.id} created by ${actorId ?? 'system'}`);
    return BroadcastMapper.toResponse(saved);
  }

  private async buildAndCreate(args: {
    id: string;
    dto: CreateBroadcastRequestDTO;
    actorId?: string;
    now: string;
  }): Promise<BroadcastEntity> {
    const { id, dto, actorId, now } = args;

    // ─── Primitive VOs ───
    const idVO = BroadcastIdVO.create(id);
    const typeVO = BroadcastTypeVO.create(dto.type);
    const statusVO = BroadcastStatusVO.draft();
    const audienceVO = BroadcastAudienceVO.create({
      target: dto.target as never,
      userIds: dto.recipientIds,
      segmentId: dto.segmentId,
    });
    const channelsVO = (dto.channels ?? []).map((c) =>
      NotificationChannelVO.create(c),
    );
    const templateIdVO = dto.templateId ? TemplateIdVO.create(dto.templateId) : undefined;
    const createdByVO = UserIdVO.create(actorId ?? '00000000-0000-4000-8000-000000000001');

    // ─── Composite VO ───
    const vo = BroadcastVO.create({
      id: idVO,
      name: dto.name,
      type: typeVO,
      status: statusVO,
      audience: audienceVO,
      channels: channelsVO,
      templateId: templateIdVO,
      content: undefined,
      createdBy: createdByVO,
      approvedBy: undefined,
      scheduledAt: dto.scheduledAt,
      startedAt: undefined,
      completedAt: undefined,
      recipientCount: 0,
      sentCount: 0,
      failedCount: 0,
    });

    return BroadcastEntity.create({ id: idVO, vo, now });
  }

  async start(
    dto: StartBroadcastRequestDTO,
    actorId?: string,
  ): Promise<BroadcastResponseDTO> {
    const entity = await this.load(dto.broadcastId);
    const now = new Date().toISOString();

    try {
      entity.start(now);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new BroadcastStartError(dto.broadcastId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Broadcast ${saved.id} started by ${actorId ?? 'system'}`);
    return BroadcastMapper.toResponse(saved);
  }

  async cancel(
    dto: CancelBroadcastRequestDTO,
    actorId?: string,
  ): Promise<BroadcastResponseDTO> {
    const entity = await this.load(dto.broadcastId);
    const now = new Date().toISOString();

    try {
      entity.cancel(dto.reason, dto.cancelledBy ?? actorId, now);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new BroadcastCancelError(dto.broadcastId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Broadcast ${saved.id} cancelled by ${actorId ?? 'system'}`);
    return BroadcastMapper.toResponse(saved);
  }

  async getById(id: string): Promise<BroadcastResponseDTO> {
    const entity = await this.load(id);
    return BroadcastMapper.toResponse(entity);
  }

  async getResult(id: string): Promise<BroadcastResultResponseDTO> {
    const entity = await this.load(id);
    return BroadcastMapper.toResultResponse(entity);
  }

  async list(options: BroadcastListOptionsDTO): Promise<BroadcastListResponseDTO> {
    const result = await this.repo.findPaginated(options as BroadcastListOptions);
    return BroadcastMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
    );
  }

  private async load(id: string): Promise<BroadcastEntity> {
    const vo = BroadcastIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new BroadcastNotFoundApplicationError(id);
    return entity;
  }
}
