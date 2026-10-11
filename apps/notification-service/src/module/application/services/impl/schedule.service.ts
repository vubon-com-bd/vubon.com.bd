/**
 * ScheduleService — scheduled/recurring notification orchestration
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import {
  SCHEDULE_REPOSITORY,
  type ScheduleRepository,
} from '../../../domain/repositories/schedule.repository.interface.js';
import { ScheduleEntity } from '../../../domain/entities/schedule.entity.js';

import { ScheduleIdVO } from '../../../domain/value-objects/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '../../../domain/value-objects/primitives/schedule-type.vo.js';
import { ScheduleRecurrenceVO } from '../../../domain/value-objects/primitives/schedule-recurrence.vo.js';

import { ScheduleMapper } from '../../mappers/schedule.mapper.js';
import {
  ScheduleNotFoundApplicationError,
  ScheduleInPastError,
} from '../../errors/schedule.errors.js';

import type { IScheduleService } from '../interfaces/schedule.service.interface.js';
import type {
  CreateScheduleRequestDTO,
  UpdateScheduleRequestDTO,
  GetScheduleRequestDTO,
  ListSchedulesRequestDTO,
  TriggerScheduleRequestDTO,
  PauseScheduleRequestDTO,
  ResumeScheduleRequestDTO,
  CancelScheduleRequestDTO,
} from '../../dtos/requests/schedule/index.js';
import type {
  ScheduleResponseDTO,
  ScheduleListResponseDTO,
  ScheduleTriggerResponseDTO,
} from '../../dtos/responses/schedule-response.dto.js';

@Injectable()
export class ScheduleService implements IScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    @Inject(SCHEDULE_REPOSITORY)
    private readonly scheduleRepo: ScheduleRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async create(dto: CreateScheduleRequestDTO, actorId?: string): Promise<ScheduleResponseDTO> {
    if (new Date(dto.scheduledAt).getTime() <= Date.now()) {
      throw new ScheduleInPastError(dto.scheduledAt);
    }
    const now = new Date().toISOString();
    const entity = ScheduleEntity.create({
      id: randomUUID(),
      now,
      props: {
        type: ScheduleTypeVO.create(dto.type),
        recurrence: ScheduleRecurrenceVO.create(dto.recurrence),
        scheduledAt: dto.scheduledAt,
        timezone: dto.timezone,
        notificationTemplateId: dto.notificationTemplateId,
        userId: dto.userId,
        maxOccurrences: dto.maxOccurrences,
        createdBy: actorId ?? 'system',
      },
    });
    const saved = await this.scheduleRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Schedule created: ${saved.id} type=${dto.type}`);
    return ScheduleMapper.toResponse(saved);
  }

  async update(dto: UpdateScheduleRequestDTO, actorId?: string): Promise<ScheduleResponseDTO> {
    const entity = await this.load(dto.scheduleId);
    if (dto.scheduledAt) {
      if (new Date(dto.scheduledAt).getTime() <= Date.now()) {
        throw new ScheduleInPastError(dto.scheduledAt);
      }
    }
    this.logger.debug(`Schedule update requested: ${dto.scheduleId} — partial updates`);
    void actorId;
    void dto;
    return ScheduleMapper.toResponse(entity);
  }

  async activate(scheduleId: string, actorId?: string): Promise<ScheduleResponseDTO> {
    const entity = await this.load(scheduleId);
    entity.activate();
    const saved = await this.scheduleRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    void actorId;
    return ScheduleMapper.toResponse(saved);
  }

  async pause(dto: PauseScheduleRequestDTO, actorId?: string): Promise<ScheduleResponseDTO> {
    const entity = await this.load(dto.scheduleId);
    entity.pause(dto.reason);
    const saved = await this.scheduleRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    void actorId;
    return ScheduleMapper.toResponse(saved);
  }

  async resume(dto: ResumeScheduleRequestDTO, actorId?: string): Promise<ScheduleResponseDTO> {
    const entity = await this.load(dto.scheduleId);
    entity.resume();
    const saved = await this.scheduleRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    void actorId;
    return ScheduleMapper.toResponse(saved);
  }

  async cancel(dto: CancelScheduleRequestDTO, actorId?: string): Promise<ScheduleResponseDTO> {
    const entity = await this.load(dto.scheduleId);
    entity.cancel(actorId, dto.reason);
    const saved = await this.scheduleRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return ScheduleMapper.toResponse(saved);
  }

  async trigger(dto: TriggerScheduleRequestDTO, actorId?: string): Promise<ScheduleTriggerResponseDTO> {
    const entity = await this.load(dto.scheduleId);
    entity.trigger(dto.triggeredNotificationId);
    const saved = await this.scheduleRepo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Schedule ${saved.id} triggered — occurrence ${saved.occurrenceCount}`);
    void actorId;
    return ScheduleMapper.toTriggerResponse(saved, dto.triggeredNotificationId);
  }

  async getById(dto: GetScheduleRequestDTO): Promise<ScheduleResponseDTO> {
    return ScheduleMapper.toResponse(await this.load(dto.scheduleId));
  }

  async list(dto: ListSchedulesRequestDTO): Promise<ScheduleListResponseDTO> {
    const result = await this.scheduleRepo.findPaginated({
      page: dto.page,
      limit: dto.limit,
      sortBy: dto.sortBy,
      sortDir: dto.sortDir,
      filter: dto.filter,
    });
    return ScheduleMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  async getDue(at?: Date): Promise<readonly ScheduleResponseDTO[]> {
    const due = await this.scheduleRepo.findDue(at);
    return due.map((e) => ScheduleMapper.toResponse(e));
  }

  private async load(id: string): Promise<ScheduleEntity> {
    const vo = ScheduleIdVO.create(id);
    const entity = await this.scheduleRepo.findByIdVO(vo);
    if (!entity) throw new ScheduleNotFoundApplicationError(id);
    return entity;
  }
}
