/**
 * DigestService — aggregated notification summary
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import {
  DIGEST_REPOSITORY,
  type DigestRepository,
} from '../../../domain/repositories/digest.repository.interface.js';
import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '../../../domain/repositories/notification.repository.interface.js';
import { DigestEntity } from '../../../domain/entities/digest.entity.js';

import { DigestIdVO } from '../../../domain/value-objects/primitives/digest-id.vo.js';
import { DigestFrequencyVO } from '../../../domain/value-objects/primitives/digest-frequency.vo.js';
import { DigestTypeVO } from '../../../domain/value-objects/primitives/digest-type.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';

import { DigestMapper } from '../../mappers/digest.mapper.js';
import { DigestNotFoundApplicationError } from '../../errors/schedule.errors.js';

import type { IDigestService } from '../interfaces/digest.service.interface.js';
import type {
  CreateDigestRequestDTO,
  UpdateDigestRequestDTO,
  GetDigestRequestDTO,
  ListDigestsRequestDTO,
  GenerateDigestRequestDTO,
  SendDigestRequestDTO,
  DigestPreviewRequestDTO,
} from '../../dtos/requests/digest/index.js';
import type {
  DigestResponseDTO,
  DigestListResponseDTO,
  DigestPreviewResponseDTO,
} from '../../dtos/responses/digest-response.dto.js';

@Injectable()
export class DigestService implements IDigestService {
  private readonly logger = new Logger(DigestService.name);

  constructor(
    @Inject(DIGEST_REPOSITORY)
    private readonly digestRepo: DigestRepository,
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepo: NotificationRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async create(dto: CreateDigestRequestDTO, actorId?: string): Promise<DigestResponseDTO> {
    const now = new Date().toISOString();
    const entity = DigestEntity.create({
      id: randomUUID(),
      now,
      props: {
        userId: dto.userId,
        frequency: DigestFrequencyVO.create(dto.frequency),
        type: DigestTypeVO.create(dto.type),
        periodStart: dto.periodStart,
        periodEnd: dto.periodEnd,
        itemCount: dto.itemIds?.length ?? 0,
        channel: dto.channel,
      },
    });
    const saved = await this.digestRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Digest created: ${saved.id} for user=${dto.userId}`);
    void actorId;
    return DigestMapper.toResponse(saved);
  }

  async update(dto: UpdateDigestRequestDTO, actorId?: string): Promise<DigestResponseDTO> {
    const entity = await this.load(dto.digestId);
    this.logger.debug(`Digest update requested: ${dto.digestId}`);
    void actorId;
    void dto;
    return DigestMapper.toResponse(entity);
  }

  async generate(dto: GenerateDigestRequestDTO, actorId?: string): Promise<DigestResponseDTO> {
    const now = new Date().toISOString();
    const periodEnd = dto.periodEnd ?? now;
    const frequency = DigestFrequencyVO.create(dto.frequency);
    const periodStart =
      dto.periodStart ??
      new Date(new Date(periodEnd).getTime() - frequency.intervalSeconds() * 1000).toISOString();

    const entity = DigestEntity.create({
      id: randomUUID(),
      now,
      props: {
        userId: dto.userId,
        frequency,
        type: dto.type ? DigestTypeVO.create(dto.type) : DigestTypeVO.summary(),
        periodStart,
        periodEnd,
      },
    });

    entity.startGenerating(now);
    const userIdVO = UserIdVO.create(dto.userId);
    const unread = await this.notificationRepo.findUnreadByUserId(userIdVO);
    const itemIds = unread
      .filter((n) => n.createdAt >= periodStart && n.createdAt <= periodEnd)
      .map((n) => n.id);
    entity.markReady(itemIds, now);

    const saved = await this.digestRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Digest generated: ${saved.id} items=${itemIds.length}`);
    void actorId;
    return DigestMapper.toResponse(saved);
  }

  async send(dto: SendDigestRequestDTO, actorId?: string): Promise<DigestResponseDTO> {
    const entity = await this.load(dto.digestId);
    entity.markSent(dto.channel);
    const saved = await this.digestRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Digest sent: ${saved.id} channel=${dto.channel}`);
    void actorId;
    return DigestMapper.toResponse(saved);
  }

  async cancel(digestId: string, actorId?: string): Promise<DigestResponseDTO> {
    const entity = await this.load(digestId);
    entity.cancel(undefined);
    const saved = await this.digestRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    void actorId;
    return DigestMapper.toResponse(saved);
  }

  async preview(dto: DigestPreviewRequestDTO): Promise<DigestPreviewResponseDTO> {
    const userIdVO = UserIdVO.create(dto.userId);
    const unread = await this.notificationRepo.findUnreadByUserId(userIdVO);
    const items = unread.slice(0, 50).map((n) => ({
      id: n.id,
      type: n.type.value,
      title: n.content.title.value,
      category: n.category.value,
      createdAt: n.createdAt,
    }));
    return DigestMapper.toPreview(dto.userId, items);
  }

  async getById(dto: GetDigestRequestDTO): Promise<DigestResponseDTO> {
    return DigestMapper.toResponse(await this.load(dto.digestId));
  }

  async list(dto: ListDigestsRequestDTO): Promise<DigestListResponseDTO> {
    const result = await this.digestRepo.findPaginated({
      page: dto.page,
      limit: dto.limit,
      sortBy: dto.sortBy,
      sortDir: dto.sortDir,
      filter: dto.filter,
    });
    return DigestMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  private async load(id: string): Promise<DigestEntity> {
    const vo = DigestIdVO.create(id);
    const entity = await this.digestRepo.findByIdVO(vo);
    if (!entity) throw new DigestNotFoundApplicationError(id);
    return entity;
  }
}
