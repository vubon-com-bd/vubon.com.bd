/**
 * DigestService
 * @module notification-service/application/services/impl
 *
 * Real business logic:
 *  - DigestSchedulerService (period computation)
 *  - DigestBuilderService (group notifications)
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  DIGEST_REPOSITORY,
  type DigestRepository,
  type DigestListOptions,
} from '@domain/repositories/digest.repository.interface.js';
import { DigestEntity } from '@domain/entities/digest.entity.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { DigestStatusVO } from '@domain/primitives/digest-status.vo.js';
import { DigestTypeVO } from '@domain/primitives/digest-type.vo.js';
import { DigestPeriodVO } from '@domain/primitives/digest-period.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { DigestVO } from '@domain/value-objects/composites/digest.vo.js';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { DigestMapper } from '@application/mappers/digest.mapper.js';
import {
  DigestNotFoundApplicationError,
  DigestCreationError,
  DigestSendError,
  DigestValidationError,
} from '@application/errors/digest.errors.js';

import type {
  IDigestService,
  DigestListOptionsDTO,
} from '@application/services/interfaces/digest.service.interface.js';
import type {
  CreateDigestRequestDTO,
  SendDigestRequestDTO,
} from '@application/dtos/requests/digest/index.js';
import type {
  DigestResponseDTO,
  DigestListResponseDTO,
} from '@application/dtos/responses/digest-response.dto.js';

@Injectable()
export class DigestService implements IDigestService {
  private readonly logger = new Logger(DigestService.name);

  constructor(
    @Inject(DIGEST_REPOSITORY)
    private readonly repo: DigestRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async create(
    dto: CreateDigestRequestDTO,
    actorId?: string,
  ): Promise<DigestResponseDTO> {
    const now = new Date().toISOString();

    if (dto.categories.length === 0) {
      throw new DigestValidationError('At least one category required', 'categories');
    }

    const id = randomUUID();
    let entity: DigestEntity;
    try {
      entity = await this.buildAndCreate({ id, dto, now });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new DigestCreationError(msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Digest ${saved.id} created for user=${dto.userId} by=${actorId ?? 'system'}`);
    return DigestMapper.toResponse(saved);
  }

  private async buildAndCreate(args: {
    id: string;
    dto: CreateDigestRequestDTO;
    now: string;
  }): Promise<DigestEntity> {
    const { id, dto, now } = args;

    // ─── Primitive VOs ───
    const idVO = DigestIdVO.create(id);
    const userVO = UserIdVO.create(dto.userId);
    const statusVO = DigestStatusVO.pending();
    const typeVO = DigestTypeVO.create(dto.type);

    // Digest period: compute from frequency + now
    // For daily: last 24h; for weekly: last 7d; etc.
    const periodMs = this.getFrequencyMs(dto.frequency);
    const periodStart = new Date(Date.now() - periodMs).toISOString();
    const periodEnd = now;
    const periodVO = DigestPeriodVO.create({
      frequency: dto.frequency as never,
      periodStart,
      periodEnd,
    });

    // ─── Composite VO ───
    const vo = DigestVO.create({
      id: idVO,
      userId: userVO,
      status: statusVO,
      type: typeVO,
      period: periodVO,
      categories: dto.categories,
      sendHour: dto.sendHour,
      timezone: dto.timezone,
      itemCount: 0,
      generatedAt: undefined,
      sentAt: undefined,
      lastDeliveredAt: undefined,
    });

    return DigestEntity.create({ id: idVO, vo, now });
  }

  private getFrequencyMs(frequency: string): number {
    const day = 24 * 60 * 60 * 1000;
    switch (frequency) {
      case 'hourly': return 60 * 60 * 1000;
      case 'daily': return day;
      case 'weekly': return 7 * day;
      case 'biweekly': return 14 * day;
      case 'monthly': return 30 * day;
      default: return day;
    }
  }

  async send(
    dto: SendDigestRequestDTO,
    actorId?: string,
  ): Promise<DigestResponseDTO> {
    const entity = await this.load(dto.digestId);
    const now = new Date().toISOString();

    try {
      if (entity.isEmpty()) {
        throw new DigestSendError(dto.digestId, 'Digest is empty');
      }
      entity.markSent(now);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new DigestSendError(dto.digestId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Digest ${saved.id} sent by ${actorId ?? 'system'}`);
    return DigestMapper.toResponse(saved);
  }

  async getById(id: string): Promise<DigestResponseDTO> {
    const entity = await this.load(id);
    return DigestMapper.toResponse(entity);
  }

  async getLatestForUser(userId: string): Promise<DigestResponseDTO | null> {
    const entity = await this.repo.findLatestForUser(userId);
    if (!entity) return null;
    return DigestMapper.toResponse(entity);
  }

  async list(options: DigestListOptionsDTO): Promise<DigestListResponseDTO> {
    const result = await this.repo.findPaginated(options as DigestListOptions);
    return DigestMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
    );
  }

  private async load(id: string): Promise<DigestEntity> {
    const vo = DigestIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new DigestNotFoundApplicationError(id);
    return entity;
  }
}
